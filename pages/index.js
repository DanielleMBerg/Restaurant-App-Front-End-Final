import React, { useContext } from "react";
import Cart from "../components/cart"
import {ApolloProvider,ApolloClient,HttpLink, InMemoryCache} from '@apollo/client';
import RestaurantList from '../components/restaurantList';
import AppContext from "../components/context";

function Home() {
	const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://mighty-book-0c254df7cc.strapiapp.com/";
	const { restaurantQuery, currentUser } = useContext(AppContext);
	const link = new HttpLink({ uri: `${API_URL}/graphql`})
	const cache = new InMemoryCache({
		typePolicies: {
		  RestaurantEntity: {
			fields: {
			  attributes: {
				merge(existing, incoming, { mergeObjects }) {
				  return mergeObjects(existing, incoming);
				},
			  },
			},
		  },
		},
	  });
	const client = new ApolloClient({link,cache});
 
	return (
		<ApolloProvider client={client}>
				<div className="grid">
					<RestaurantList className="restuarant-col" search={restaurantQuery} />
					<Cart className="cart-col"></Cart>
				</div>  
		</ApolloProvider>
	);
}

export default Home; 