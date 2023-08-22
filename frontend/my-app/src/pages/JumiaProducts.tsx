/* eslint-disable react-hooks/rules-of-hooks */
import { Row, Col, Container, ListGroup, Button } from 'react-bootstrap';
import PaginationComponent from '../components/PaginationComponent';
import JumiaProductForListComponent from '../components/JumiaProductForListComponent';
import SortOptionsComponent from '../components/SortOptionsComponent';
import CategoryFilterComponent from '../components/filterQueryResultOptions/CategoryFilterComponent';
import { useState } from 'react';

const ProductListPage = () => {
  const [sortOption, setSortOption] = useState('')
  
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item className="mb-3 mt-3">
              <SortOptionsComponent setSortOption={ setSortOption} />
            </ListGroup.Item>
            <ListGroup.Item>
              <CategoryFilterComponent />
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9} style={{ marginBottom: '80px' }} className="text-center">
          <JumiaProductForListComponent />
          <PaginationComponent/>
        </Col>
      </Row>
    </Container>

  );
};

export default ProductListPage;
