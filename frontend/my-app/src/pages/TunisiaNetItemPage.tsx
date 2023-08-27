import {
  Row,
  Col,
  Container,
  Image,
  ListGroup,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";
import { Rating } from "react-simple-star-rating";


import ImageZoom from "js-image-zoom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface ProductData {
  image: string;
  idx: number;
  name: string;
  description: string;
  title: string;
  _id: string;
  fiche_technique: string;
  moreDetails: string
}
const ProductDetailsPage = () => {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const { id } = useParams<{ id: string; }>();
  useEffect(() => {
    if (id) {
      const apiUrl = `http://127.0.0.1:3200/tunisianet/item/${id}`;

      axios
        .get(apiUrl)
        .then((res) => {
          setProductData(res.data); 
          console.log(res);
        })
        .catch((error) => {
          console.error('Error fetching product data:', error);
        });
    }
  
    const firstElement = document.getElementById('first');

    if (firstElement && productData?.image) {
      const options = {
        width: 100,
        zoomWidth: 500,
        fillContainer: true,
        scale: 5,
        offset: { vertical: 0, horizontal: 0 },
      };

      new ImageZoom(firstElement, options);
    }
  }, [id, productData?.image]);
  
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container>
        <Row className="mt-5">
          <Col style={{ zIndex: 1 }} md={4}>
            <div id="first">
              <Card.Img
                variant="top"
                src={productData?.image}
                style={{ height: '200px', zIndex: 1 }}
              />
            </div>
          </Col>
          <Col md={8}>
            <Row>
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h1>{productData?.title ?? ''}</h1>
                  </ListGroup.Item>
                  <h2>Description</h2>
                  <ListGroup.Item>
                    {productData?.description ?? ''}
                  </ListGroup.Item>
                  <h2>Fiche Technique</h2>
                  <ListGroup.Item>
                    {productData?.fiche_technique ?? ''}
                  </ListGroup.Item>
                  <h3>More Details  </h3>
                  <ListGroup.Item>
                    {productData?.moreDetails ?? ''}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetailsPage;

