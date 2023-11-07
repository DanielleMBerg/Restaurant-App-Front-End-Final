import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Button } from "reactstrap";
import AppContext from "./context";
import { Card } from "./card";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://mighty-book-0c254df7cc.strapiapp.com";

const Cart = () => {
  const { 
    cart,
    setCart,
    addItem,
    removeItem,
    show,
    setShow,
    setViewMode,
    viewMode,
    currentUser
  } = useContext(AppContext);
  const router = useRouter();

  const renderItems = ()=>{
    let { items } = cart;
    if(items.length > 0){
      const itemList = items.map((item) => {
        let image = `${API_URL}${item.attributes.image.data.attributes.url}`;
            return (
              <div
                className="items-one"
                style={{ marginBottom: 15 }}
                key={item.id}
              >
                <div>
                  <div>
                    <img className="cartImage" src={image}></img>
                  </div>
                  <span id="item-name">{item.attributes.name}<br></br>${item.attributes.price}</span>
                </div>
                <div>
                  <Button
                    style={{
                      height: 25,
                      padding: 0,
                      width: 15,
                      marginRight: 5,
                      marginLeft: 10,
                    }}
                    onClick={() => addItem(item)}
                    color="link"
                  >
                    +
                  </Button>
                  <Button
                    style={{
                      height: 25,
                      padding: 0,
                      width: 15,
                      marginRight: 10,
                    }}
                    onClick={() => removeItem(item)}
                    color="link"
                  >
                    -
                  </Button>
                  <span style={{ marginLeft: 5 }} id="item-quantity">
                    {item.attributes.quantity}x
                  </span>
                </div>
              </div>
            );
        })
        return itemList;
      } else {
        return (<div></div>)
      }
  }

  const checkout = () => {
    router.push('/checkout');
    setShow(false);
  }

  const checkoutItems = ()=> {
    let total = cart.total;
    let fixedTotal = Number(total).toFixed(2);
    return (
      currentUser ? (
      <>
        <button
          className="btn btn-primary btn-lg cart"
          type="submit"
          disabled={ fixedTotal ? fixedTotal < 1 : fixedTotal > 1 }
          onClick={checkout}
        >
          Checkout <span className="badge bg-light text-dark ms-1 rounded-pill">${fixedTotal}</span>
        </button>
      </>
      ):(
        <button
          className="btn btn-primary btn-lg cart"
          type="submit"
          onClick={() => router.push("/login")}
        >
          Login to checkout
        </button>
      )
    )
  }

  const cancel = () => {
    router.push('/');
    setShow(true);
    setViewMode("restaurant");
    setCart({items:[], total:0})
  }

  const cancelOrder = ()=>{
    return (
      <>
        <button className="btn btn-primary btn-lg cart" type="submit" onClick={cancel}>
          Cancel Order
        </button>
      </>
    )
  }

  return (
      <Card
        header="🛒 Cart"
        body= {
          <>
            {renderItems()}
            {show ? (
              checkoutItems()
            ):( 
              cancelOrder()
            )} 
          </>
        }
      >
      </Card>
  );
}

export default Cart;
