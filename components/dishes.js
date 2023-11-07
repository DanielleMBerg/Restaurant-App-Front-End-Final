import { useRouter } from "next/router"
import { gql, useQuery } from '@apollo/client';
import { useContext } from 'react'
import AppContext from "./context"

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col } from "reactstrap";

const Dishes = ({restId}) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://mighty-book-0c254df7cc.strapiapp.com/";
  const router = useRouter();
  const { addItem, dishesQuery } = useContext(AppContext)
  const GET_RESTAURANT_DISHES = gql`
    query ($id: ID!) {
      restaurant(id: $id) {
        data {
          id
          attributes {
            name
            dishes {
              data {
                id
                attributes {
                  name
                  description
                  price
                  image {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: restId},
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR here</p>;
  if (!data) return <p>Not found</p>;


  // console.log(data.restaurant.data)


  if (restId > 0 && !dishesQuery){
  const dishes = data.restaurant.data.attributes.dishes.data;
    return (
      <>
        {dishes.map((res) => (
          <Col xs="6" sm="4" key={res.id}>
            <Card className="card dishes">
              <CardImg
                className = "card-img"
                top={true}
                src={`${API_URL}${res.attributes.image.data.attributes.url}`}
              />
              <CardBody>
                <CardTitle>{res.attributes.name}</CardTitle>
                <CardText>{res.attributes.description}</CardText>
              </CardBody>
              <div className="card-footer">
                <Button color="info"
                  outline
                  onClick = {()=> addItem(res)}
                >
                  + Add To Cart
                </Button> 
              </div>
            </Card>
          </Col>
        ))}
      </>
    )
  } else if (restId > 0 && dishesQuery) {
    const dishes = data.restaurant.data.attributes.dishes.data;
    let searchQuery = dishes.filter((res) => {
      return res.attributes.name.toLowerCase().includes(dishesQuery)
    }) || [];

    return (
      <>
        {searchQuery.map((res) => (
          <Col xs="6" sm="4" key={res.id}>
            <Card className="card dishes">
              <CardImg
                className = "card-img"
                top={true}
                src={`${API_URL}${res.attributes.image.data.attributes.url}`}
              />
              <CardBody>
                <CardTitle>{res.attributes.name}</CardTitle>
                <CardText>{res.attributes.description}</CardText>
              </CardBody>
              <div className="card-footer">
                <Button color="info"
                  outline
                  onClick = {()=> addItem(res)}
                >
                  + Add To Cart
                </Button> 
              </div>
            </Card>
          </Col>
        ))}
      </>
    )
  } else {
    return <br></br>;
  }
}

export default Dishes;