import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/footer";
import Home from "./components/home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { LoadUser } from "./actions/userActions";
import store from "./store";
import { useEffect, useState } from "react";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";

function App() {
  const [stripeApiKey, setStripApikey] = useState("");
  useEffect(() => {
    store.dispatch(LoadUser());

    async function getStripApiKey() {
      try {
        const { data } = await axios.get("/api/v1/stripeapi");
        console.log("stripe data", data.stripeApiKey);
        setStripApikey(data.stripeApiKey);
      } catch (error) {
        console.error("Error fetching Stripe API key:", error);
      }
    }

    getStripApiKey();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="container container-fluid">
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/search/:keyword" element={<Home />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/Cart" element={<Cart />} exact />
          <Route path="/register" element={<Register />} exact />
          <Route path="/order/confirm" element={<ConfirmOrder />} exact />
          <Route path="/login/shipping" element={<Shipping />} exact />
          <Route path="/password/forgot" element={<ForgotPassword />} exact />
          <Route
            path="/password/reset/:token"
            element={<NewPassword />}
            exact
          />
          <Route path="/success" element={<OrderSuccess />} exact />

          <Route path="/me" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />

          {stripeApiKey && (
            <Route
              path="/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              }
            />
          )}

          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
