import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { createCart, getCart } from "../../api/cart";

import './Checkout.css';

const Checkout = () => {

  const [orderDetails, setOrderDetails] = useState({});

  const [productDetails, setProductDetails] = useState([]);

  const [confirmPaymentSuccess, setConfirmPaymentSuccess] = useState(false);

  const init = async () => {

    try {

      const result = await getCart();
      setOrderDetails(result.data);
      setProductDetails(result.data.productsSelected);

    } catch (error) {

      console.log(error)
    }

  }


  useEffect(() => {

    init();

  }, [])


  const confirmPayment = async () => {

    // remove cart id from localstorage
    localStorage.removeItem('cartId');
    await createCart();
    // create a new cart
    setConfirmPaymentSuccess(true);

  }

  const renderComponent = () => {

    return (
      <>
        <Navbar />
        <div className="checkout">
          <div className="container">
            <div className="row">
              <div className="cart-title">Checkout</div>
              <div className="cart-wrapper">
                <div className="order-details">
                  <div className="order-details-title"> Order Summary</div>
                  {
                    productDetails?.map(product => (
                      <div className="order-details-product " key={product.id}>
                        <div className="order-details-product-img ">
                          <img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg"

                            alt="Product"
                          />
                        </div>
                        <div className="order-details-product-data ">
                          <div>{product.name}</div>
                          <div>₹ {product.cost}</div>
                        </div>
                      </div>
                    ))
                  }

                </div>
                <div className="price-details">
                  <div className="price-details-box">
                    <div className="price-details-title">Price Details</div>
                    <div className="price-details-data">
                      <div className="price-details-item">
                        <div>Price</div>
                        <div><i className="fa fa-inr" />{(+orderDetails.cost).toFixed(2)}</div>
                      </div>
                      <div className="price-details-item">
                        <div>Discount</div>
                        <div><i className="fa fa-inr" /> 0.00</div>
                      </div>
                      <div className="price-details-item">
                        <div>Delivery Charges</div>
                        <div>FREE</div>
                      </div>
                      <div className="price-details-item">
                        <div>Total</div>
                        <div><i className="fa fa-inr" /> {(+orderDetails.cost).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                  {
                    confirmPaymentSuccess ? (
                      <div>
                        <div className="confirm-payment-success-msg">Order Confirmed</div>
                        <Link
                          to="/"
                          className="btn btn-info continue-shopping-btn"
                        >
                          Continue Shopping
                        </Link>
                      </div>
                    ) : (
                      <div className="confirm-payment-btn btn btn-primary" onClick={confirmPayment}>Confirm Payment</div>
                    )
                  }
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

export default Checkout