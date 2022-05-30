
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import { getCart, updateCart } from "../../api/cart";
import './Cart.css';


const Cart = () => {

  const [orderDetails, setOrderDetails] = useState({});

  const [productDetails, setProductDetails] = useState([]);

  const init = async () => {

    try {
      const response = await getCart();
      setOrderDetails(response.data);
      setProductDetails(response.data.productsSelected);

    } catch (error) {

      console.log(error);
    }

  }

  const removeProductFromCart = async (productId) => {

    try {

      // const { data } = await getCart();
      // console.log(data);
      const response = await updateCart(productDetails, productId, "REMOVE");
      console.log(response.data);
      setOrderDetails(response.data);
      setProductDetails(response.data.productsSelected);

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {

    init();
  }, [])

  const renderComponent = () => {

    return (
      <>
        <Navbar />
        <div className="cart">
          <div className="container">
            <div className="row">
              <div className="cart-title">My Cart</div>
              <div className="cart-wrapper">
                <div className="order-details ">
                  <div className="order-details-title ">Order Details</div>
                  {
                    productDetails?.length > 0 ? productDetails.map((product) => (
                      <div className="order-details-product" key={product.id}>
                        <div className="order-details-product-img ">
                          <img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg"
                            alt="Product"
                          />
                        </div>
                        <div className="order-details-product-data ">
                          <div>{product.name}</div>
                          <div><i className="fa fa-inr" /> {(+product.cost).toFixed(2)}</div>
                        </div>
                        <div className="order-details-product-actions ">
                          <div className="order-details-product-remove btn btn-info" onClick={() => removeProductFromCart(product.id)}>Remove</div>
                        </div>
                      </div>
                    )) : (
                      <div className="no-items-cart"> Your cart is empty! </div>
                    )
                  }
                </div>
                {
                  productDetails?.length > 0 && (
                    <div className="price-details">
                      <div className="price-details-box">
                        <div className="price-details-title ">Price Details</div>
                        <div className="price-details-data">
                          <div className="price-details-item ">
                            <div>Price</div>
                            <div><i className="fa fa-inr" /> {orderDetails.cost}</div>
                          </div>
                          <div className="price-details-item ">
                            <div>Discount</div>
                            <div><i className="fa fa-inr" />  0</div>
                          </div>
                          <div className="price-details-item ">
                            <div>Delivery Charges</div>
                            <div>FREE</div>
                          </div>
                          <div className="price-details-item ">
                            <div>Total</div>
                            <div><i className="fa fa-inr" />  {orderDetails.cost}</div>
                          </div>
                        </div>
                      </div>
                      <Link className="continue-shopping-btn btn btn-info " to={"/"}>Continue Shopping</Link>
                      <Link className="checkout-btn btn btn-primary " to={"/checkout"}>Checkout</Link>
                    </div>
                  )
                }
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

export default Cart