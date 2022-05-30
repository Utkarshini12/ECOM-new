import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts, getProductsForCategory, search } from '../../api/product';
import Navbar from '../Navbar/Navbar';


import './ProductList.css';


const ProdustList = () => {


  const [productList, setProductList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentCategoryName, setCurrentCategoryName] = useState('');

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(-1);

  const [searchTerm, setSearchTerm] = useState('');

  const init = async () => {

    const query = new URLSearchParams(window.location.search);

    setCurrentCategory(query.get('categoryId'));
    setCurrentCategoryName(query.get('name'));
    const id = query.get('categoryId');

    try {

      const products = id ? await getProductsForCategory(id) : await getAllProducts();
      console.log(products.data)
      setProductList(products.data);

    } catch (error) {
      console.error(error);

    }


  }

  useEffect(() => {

    init();

  }, []);

  const searchProduct = async (e) => {

    // const searchTerm = e.target.value;
    // console.log({ searchTerm })
    setSearchTerm(e.target.value);
    const data = { name: e.target.value }

    const result = !searchTerm && currentCategory ? await getProductsForCategory(currentCategory) : await search(data);
    setProductList(result.data);

  }

  const updateMinPrice = async (e) => {

    console.log(e.target.value);
    setMinPrice(e.target.value);
    filterProduct(e.target.value, maxPrice, searchTerm)

  }

  const updateMaxPrice = async (e) => {

    console.log(e.target.value);
    setMaxPrice(e.target.value);
    filterProduct(minPrice, e.target.value, searchTerm);

  }

  const filterProduct = async (minPrice, maxPrice, searchTerm) => {

    const query = {
      name: searchTerm,
      minCost: minPrice,
      maxCost: maxPrice
    }

    try {

      const result = await search(query);
      setProductList(result.data);

    } catch (err) {

      console.log(err);
    }

  }

  const clearFilterHandler = async () => {

    setSearchTerm(null);
    setMinPrice(0);
    setMaxPrice(-1);
    const { data } = await getAllProducts();
    setProductList(data);
  }

  const renderFilterPriceComponent = () => {

    return (
      <div style={{ position: 'sticky', top: 210 }}>
        <div className="sidebar-search form-group">
          <input type="text" className="form-control" onChange={searchProduct} placeholder="Search by name..." />
        </div>

        {!currentCategory && (<><div className="sidebar-title">Filter by Price</div>

          <div className="price-filter">
            <div className="price-filter-select ">

              <div className="form-group">
                <select className="form-select" onChange={updateMinPrice} >
                  <option value="0">0</option>
                  <option value="1000">1000</option>
                  <option value="2000">2000</option>
                  <option value="5000">5000</option>
                  <option value="10000">10000</option>
                  <option value="20000">20000</option>
                  <option value="50000">50000</option>
                </select>
              </div>
              <div className="form-group">
                <select className="form-select" onChange={updateMaxPrice}>
                  <option value="1000">1000</option>
                  <option value="2000">2000</option>
                  <option value="5000">5000</option>
                  <option value="10000">10000</option>
                  <option value="20000">20000</option>
                  <option value="50000">50000</option>
                  <option value="100000">100000+</option>
                </select>
              </div>
            </div>
            <div className="price-filter-title d-flex justify-content-between">
              <div style={{ fontWeight: 500, marginLeft: 10 }}>Min Price</div>
              <div style={{ fontWeight: 500, marginRight: 20 }}>Max Price</div>
            </div>
            <div className="btn btn-primary clear-filter" onClick={clearFilterHandler}>
              Clear All Filters
            </div>
          </div></>)
        }

      </div>
    )
  }


  return (
    <>
      <Navbar />
      <div className="productList">
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="col-3">
              {renderFilterPriceComponent()}
            </div>
            <div className="col-8">
              <h2 className="product-list-title">{currentCategoryName ? `Products in '${currentCategoryName}' category` : 'All Products'}</h2>
              <div className="product-list-wrapper">
                <div className="product-list-box">
                  {
                    productList?.map((product) => (
                      <Link key={product.id} className="product-item" to={`/product/${product.id}/details`}>
                        <div className="product-img">
                          <img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg" alt="Item Pic" />
                        </div>
                        <div className="product-name text-center">
                          {product.name}
                        </div>
                        <div className="product-price">
                          <i className="fa fa-inr" /> {(+product.cost).toFixed(2)}
                        </div>
                        <div className="product-description">
                          {product.description}
                        </div>
                      </Link>

                    ))


                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProdustList