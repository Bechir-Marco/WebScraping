import { Card, Button, Row, Col } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import { LinkContainer } from 'react-router-bootstrap';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

interface ProductData {
  image: string;
  idx: number;
  name: string;
  description: string;
  title: string;
  _id: string;
}

const MytekProductForListComponent = () => {
  const [productData, setProductData] = useState<ProductData[] | null>(null);
  const [showFullDescription, setShowFullDescription] = useState<boolean[]>([]); // Change to an array
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const categoryName = searchParams.get('categoryName');
  const search = searchParams.get('search');

  useEffect(() => {
    // Fetch data and initialize visibility state for each product
    let apiUrl = 'http://127.0.0.1:3200/mytek/';
    const queryString: string[] = [];

    if (categoryName) {
      queryString.push(`categoryName=${categoryName}`);
    }

    if (search) {
      queryString.push(`search=${search}`);
    }

    if (page) {
      queryString.push(`page=${page}`);
    }

    const joinedQueryString = queryString.join('&');
    if (joinedQueryString.length > 0) {
      apiUrl += `?${joinedQueryString}`;
    }

    if (id) {
      apiUrl += `/${id}`;
    }

    axios
      .get(apiUrl)
      .then((res) => {
        setProductData(res.data.itemsList);

        // Initialize visibility state for each product
        setShowFullDescription(
          new Array(res.data.itemsList.length).fill(false)
        );
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [categoryName, search, page, id]);

  const handleToggleDescription = (index: number) => {
    setShowFullDescription((prevState) => {
      const newState = [...prevState];
      newState[index] = !prevState[index];
      return newState;
    });
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <Card style={{ marginTop: '30px', marginBottom: '50px' }}>
      {productData.map((item, index) => (
        <Row key={item.idx}>
          <Col>
            <Card.Img
              variant="top"
              src={item.image}
              style={{ width: '200px', height: '200px' }}
            />
          </Col>
          <Col lg={7}>
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>
                {showFullDescription[index]
                  ? item.description
                  : `${item.description.slice(0, 200)}...`}
                <Button
                  variant="link"
                  onClick={() => handleToggleDescription(index)}
                >
                  {showFullDescription[index] ? 'See Less' : 'See More'}
                </Button>
              </Card.Text>
              <LinkContainer to={`/mytek/item/${item._id}`}>
                <Button variant="danger">See product</Button>
              </LinkContainer>
            </Card.Body>
          </Col>
        </Row>
      ))}
    </Card>
  );
};

export default MytekProductForListComponent;

