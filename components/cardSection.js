import React, { useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";

function CardSection({data, stripeError, submitOrder}) {
  const [paymentField, setPaymentField] = useState(false);
  const { address, city, state } = data;
  const disabled = !(address.trim() && city.trim() && state.trim() && paymentField);

  const handleChange = (event) => {
      if (event.value.postalCode.length >= 5) {
        setPaymentField(true);
      } else {
        setPaymentField(false);
      }
  };

  return (
    <div>
      <div>
        <label htmlFor="card-element">Credit or debit card</label>
        <div>
          <fieldset style={{ border: "none" }}>
            <div className="form-row">
              <div id="card-element" style={{ width: "100%" }}>
                <CardElement
                  onChange={handleChange}
                  options={{
                    style: { width: "100%", base: { fontSize: "18px" } },
                  }}
                />
              </div>
              <br />
              <div className={disabled ? "order-button-wrapper disabled" : "order-button-wrapper"} >
                <button 
                  onClick={submitOrder}
                  disabled={ disabled }
                >Confirm order</button>
              </div>
              {stripeError ? (
                <div>{stripeError.toString()}</div>
              ) : null}
              <div id="card-errors" role="alert" />
            </div>
          </fieldset>
        </div>
      </div>
      <style jsx>
        {`
          .order-button-wrapper {
            display: flex;
            width: 100%;
            align-items: flex-end;
            justify-content: flex-end;
          }
          button {
            white-space: nowrap;
            border: 0;
            outline: 0;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            padding: 0 14px;
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            color: #fff;
            border-radius: 4px;
            font-size: 15px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.025em;
            background-color: #6772e5;
            text-decoration: none;
            -webkit-transition: all 150ms ease;
            transition: all 150ms ease;
            margin-top: 10px;
          }
          button:hover {
            color: #fff;
            cursor: pointer;
            background-color: #7795f8;
            transform: translateY(-1px);
            box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
              0 3px 6px rgba(0, 0, 0, 0.08);
          }
          .disabled {
            pointer-events: none;
            opacity: 0.3;
          }


    
        `}
      </style>
    </div>
  );
}
export default CardSection;
