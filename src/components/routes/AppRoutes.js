
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "../Cart/Cart";
import Checkout from "../Checkout/Checkout";
import LandingPage from '../LandingPage/LandingPage';
import Login from '../Login/Login';
import ProductDetail from "../ProductDetail/ProductDetail";
import ProdustList from "../ProductList/ProductList";


const AppRoutes = () => {

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={<Login />}
        />

        <Route
          exact
          path="/"
          element={<LandingPage />}
        />

        <Route
          exact
          path="/products"
          element={
            <ProdustList />
          }
        />

        <Route
          exact
          path="/product/:productid/details"
          element={
            <ProductDetail />
          }
        />

        <Route
          exact
          path="/cart"
          element={
            <Cart />
          }
        />
        <Route
          exact
          path="/checkout"
          element={
            <Checkout />
          }
        />
      </Routes>
    </Router>
  )
}

export default AppRoutes;