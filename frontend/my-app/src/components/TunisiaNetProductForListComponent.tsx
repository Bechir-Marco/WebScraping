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
  _id:string
}

const TunisiaNetProductForListComponent = () => {
    const [productData, setProductData] = useState<ProductData[] | null>(null);
    const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
  const { id } = useParams<{ id: string; }>();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const categoryName = searchParams.get('categoryName');
  const search = searchParams.get('search');
  
  useEffect(() => {
    let apiUrl = 'http://127.0.0.1:3200/tunisianet/';
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

    console.log(apiUrl);

    if (id) {
      apiUrl += `/${id}`;
    }

    axios
      .get(apiUrl)
      .then((res) => {
        setProductData(res.data.itemsList);
        console.log(res);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [categoryName, search, page, id]);

    if (!productData) {
      return <div>Loading...</div>;
    }
    const handleToggleDescription = () => {
      setShowFullDescription((prevShowFullDescription) => !prevShowFullDescription);
    };
    

    return (
      <Card style={{ marginTop: '30px', marginBottom: '50px' }}>
        {productData.map((item) => (
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
                  {showFullDescription ? item.description : `${item.description.slice(0, 200)}...`}
                  {!showFullDescription ? (
                    <Button variant="link" onClick={handleToggleDescription}>
                      See More
                    </Button>
                  ) : (
                    <Button variant="link" onClick={handleToggleDescription}>
                      See Less
                    </Button>
                  )}
                </Card.Text>
                <LinkContainer to={`/tunisianet/item/${item._id}`}>
                  <Button variant="danger">See product</Button>
                </LinkContainer>
              </Card.Body>
            </Col>
          </Row>
        ))}
      </Card>
    );
  };



export default TunisiaNetProductForListComponent;
