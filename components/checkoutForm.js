
import React, { useState, useContext } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import fetch from "isomorphic-fetch";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CardSection from "./cardSection";
import AppContext from "./context";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Card } from "../components/card";
import { Bars } from 'react-loading-icons'


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { cart, setCart, show, setShow, setCurrentUser, setViewMode } = useContext(AppContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    address: "",
    city: "",
    state: "",
    stripe_id: "",
  });

  const onChange = (e) => {
    const updateItem = (data[e.target.name] = e.target.value);
    setData({ ...data, updateItem });
  }

  async function submitOrder(e) {
    e.preventDefault();
    const cardElement = elements.getElement(CardElement);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://mighty-book-0c254df7cc.strapiapp.com/";
    setLoading(true)
    const token = await stripe.createToken(cardElement);
    console.log(token)
    const userToken = Cookies.get("token");
    setShow(true);
    const response = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: userToken && { Authorization: `Bearer ${userToken}` },
      body: (JSON.stringify({
        data: {
          amount: Number(Math.round(cart.total)),
          dishes: cart.items,
          address: data.address,
          city: data.city,
          state: data.state,
          token: token.token.id
        }
    }))
  });   

    if (!response.ok) {
      setError(response.statusText);
    }
    setLoading(false)
    setCart({items:[], total:0});
    setData({
      address: "",
      city: "",
      state: "",
      stripe_id: "",
    });
  }

  const returnHome = () => {
    router.push("/") 
    setViewMode("restaurant")
  }

  const logout = () => {
    returnHome();
    setCurrentUser("");
    setViewMode("restaurant")
  }

  return (
    <>
      {loading ? (
        <div className="centered">
          <Bars />
        </div>
      ):(
        <br></br>
      )}
      {show ? (
        <Card
        header="Success! Your order has been placed!"
        body= {
          <>
            <button
              type="submit"
              className="btn btn-success"
              onClick={returnHome}
            >Continue Shopping</button>
            <br></br>
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={logout}
            >Log Out</button>
          </>
        }
        ></Card>
      ):(
        <div className="paper">
          <h5>Your information:</h5>
          <hr />
          <FormGroup style={{ display: "flex" }}>
            <div style={{ flex: "0.90", marginRight: 10 }}>
              <Label>Address</Label>
              <Input name="address" onChange={onChange} />
            </div>
          </FormGroup>
          <FormGroup style={{ display: "flex" }}>
            <div style={{ flex: "0.65", marginRight: "6%" }}>
              <Label>City</Label>
              <Input name="city" onChange={onChange} />
            </div>
            <div style={{ flex: "0.25", marginRight: 0 }}>
              <Label>State</Label>
              <Input name="state" onChange={onChange} />
            </div>
          </FormGroup>
          <CardSection data={data} stripeError={error} submitOrder={submitOrder} />
        </div>
      )}
    </>
  );
}

export default CheckoutForm;
