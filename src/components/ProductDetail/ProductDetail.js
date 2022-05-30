import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getProduct } from '../../api/productDetail';
import { getCart, updateCart } from '../../api/cart';
import Navbar from '../Navbar/Navbar';

import './ProductDetail.css';

const ProductDetail = () => {

  const { productid: id } = useParams();
  //eslint-disable-next-line 
  const [selectedProduct, setSelectedProduct] = useState(id);
  const [isLoggedin, setIsLoggedin] = useState(false);

  const [productDetails, setProductDetails] = useState({});

  const init = async () => {

    const user = localStorage.getItem('userId');
    if (user) setIsLoggedin(true);

    const response = await getProduct(selectedProduct);
    console.log(response.data)
    setProductDetails(response.data);

  }


  useEffect(() => {
    init();
  },
    //eslint-disable-next-line
    []);

  const addToCart = async () => {

    try {

      const { data } = await getCart();
      console.log(data);
      await updateCart(data.productsSelected, productDetails.id, "ADD")
      const newProductDetails = { ...productDetails }
      newProductDetails.addedToCart = 1;
      setProductDetails(newProductDetails);

    } catch (error) {
      console.log(error);
    }
  }

  const renderAddToCartButton = () => {

    if (isLoggedin) {

      return (productDetails && productDetails.addedToCart === 1) ? (
        <Link
          className="product-details-action btn btn-primary text-decoration-none"
          to={"/cart"}
        >
          Go To Cart
        </Link>
      ) : (
        <div className="product-details-action btn btn-primary text-decoration-none" onClick={addToCart}>Add To Cart</div>
      )

    } else {
      return (
        <Link
          className="product-details-action btn btn-success text-decoration-none"
          to={"/login"}
        >
          Login to<span style={{ textDecoration: "underline" }}>  Add to Cart</span>
        </Link>

      )
    }

  }

  const renderComponent = () => {

    return (
      <>
        <Navbar />
        <div className="productDetails">
          <div className="container">
            <div className="row">
              <div className="product-details-wrapper ">
                <div className="product-img">
                  <div>
                    <img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg"
                      alt="Detailed"
                    />
                  </div>
                </div>
                <div className="product-details-box ">
                  <div className="product-name">{productDetails.name}</div>
                  <div className="product-price fw-bold"><i className="fa fa-inr" /> {productDetails.cost}</div>
                  <div className="product-description">
                    <div className="product-description-title ">Description</div>
                    <div className="product-description-data">{productDetails.description}</div>
                  </div>

                  {renderAddToCartButton()}
                  <div className="add-to-cart-error-msg "></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (

    renderComponent()
  )

}

export default ProductDetail;