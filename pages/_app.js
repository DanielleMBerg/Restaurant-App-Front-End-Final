import { useState } from "react";
import Head from "next/head";
import AppContext from "../components/context";
import Layout from "../components/layout"
import NavBar from '../components/navbar';
import { ApolloClient,HttpLink, InMemoryCache } from '@apollo/client';
import '../styles/styles.css';

const MyApp = (props) => {
  const [ cart, setCart ] = useState({items:[], total:0});
  const [ currentUser, setCurrentUser ] = useState("");
  const [restaurantQuery, setRestaurantQuery] = useState("");
  const [dishesQuery, setDishesQuery] = useState("");
  const [show, setShow] = useState(true);
  const [viewMode, setViewMode ] = useState("restaurant");

  const { Component, pageProps } = props;
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://mighty-book-0c254df7cc.strapiapp.com/";
  const link = new HttpLink({ uri: `${API_URL}/graphql`})
  const cache = new InMemoryCache()
  const client = new ApolloClient({link,cache});
  
  const addItem = (item) => {
    let { items } = cart;
    let foundItem;
    console.log(foundItem)
    if(items.length > 0){
      if (items.find((i) => i.id === item.id)){
        foundItem = true;
        console.log("hello")
      } else {
      foundItem = false;
      }
    }

    if (!foundItem) {
      console.log("not found")
      let dish = JSON.parse(JSON.stringify(item));
      console.log(dish)
      dish.attributes.quantity = 1;
      var newCart = {
        items: [...cart.items, dish],
        total: cart.total + dish.attributes.price,
      }
      setCart(newCart)
    } else {
      console.log("found")
      let newTotal = (cart.total + item.attributes.price);
      newCart= {
        items: items.map((item) =>{
            console.log(item)
            item.attributes.quantity++
            return Object.assign({}, item)
          }
        ),
        total: newTotal
      }
      console.log(newCart.items)
    setCart(newCart);
  }
};
  
  const removeItem = (dish) => {
    let { items } = cart;
    const foundItem = items.find((i) => i.id === dish.id);
    if (foundItem.attributes.quantity > 1) {
      var newCart = {
        items: items.map((item) =>{
        if(item.id === foundItem.id){
          item.attributes.quantity = item.attributes.quantity - 1
          return Object.assign({}, item)
        } else {
          return item;
        }
      }),
      total: cart.total - dish.attributes.price,
      }
    } else {
      console.log(`Try remove item ${JSON.stringify(foundItem)}`)
      const index = items.findIndex((i) => i.id === foundItem.id);
      items.splice(index, 1);
      var newCart= { items: items, total: cart.total - dish.attributes.price } 
    }
    setCart(newCart);
  }

  return (
    <AppContext.Provider 
      value={{
        cart,
        setCart,
        currentUser,
        setCurrentUser,
        restaurantQuery,
        setRestaurantQuery,
        dishesQuery,
        setDishesQuery,
        show,
        setShow,
        addItem,
        removeItem,
        viewMode,
        setViewMode,
      }}
    >
      <Head>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <script src="https://accounts.google.com/gsi/client" async></script>
        <meta name="google-signin-client_id" content="546276158927-k0rt1nn5vpe5lj74h4kofda95d2u1dhg.apps.googleusercontent.com"></meta>
        
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/rikmms/progress-bar-4-axios/0a3acf92/dist/nprogress.css" />
      </Head>
      <NavBar></NavBar>
      <br></br>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}

export default MyApp;
