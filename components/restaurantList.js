import { gql, useQuery } from '@apollo/client';
import Dishes from "./dishes"
import { useContext, useState } from 'react';
import Link from "next/link";
import AppContext from "./context"
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  Container,
  Row,
  Col
} from "reactstrap";

function RestaurantList(props) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://mighty-book-0c254df7cc.strapiapp.com/";
  const [restaurantID, setRestaurantID] = useState(0)
  const { setViewMode } = useContext(AppContext);
  const GET_RESTAURANTS = gql`
  {
    restaurants {
      data {
        id
        attributes {
          name
          description
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
`;
  const { loading, error, data } = useQuery(GET_RESTAURANTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

const restaurants = data.restaurants.data;

  const searchQuery = restaurants.filter((query) =>
    query.attributes.name.toLowerCase().includes(props.search)
  );

  let restId = searchQuery[0] ? searchQuery[0].id : null;

  // define renderer for Dishes
  const renderDishes = () => {
    return (<Dishes restId={restaurantID}> </Dishes>)
  };

  if (searchQuery.length > 0) {
    const restList = searchQuery.map((res) => (
      <Col xs="6" sm="4" key={res.id}>
        <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
          <CardImg
            top={true}
            style={{ height: 200 }}
            src={
              `${API_URL}` + res.attributes.image.data[0].attributes.url
            }
          />
          <CardBody>
            <CardText>{res.attributes.description}</CardText>
          </CardBody>
          <div className="card-footer">
            <Button color="info" onClick={() => {setRestaurantID(res.id), setViewMode("dishes")}}>{res.attributes.name}</Button>
          </div>
        </Card>
      </Col>
    ))


    return (
      <Container>
        <Row xs='3'>
          {restList}
        </Row>
        <Row xs='3'>
          {renderDishes(restaurantID)}
        </Row>
      </Container>
    )
  } else {
    return <h1> No Restaurants Found</h1>
  }
}

export default RestaurantList;