/* eslint-disable react-hooks/rules-of-hooks */
import { Row, Col, Container, ListGroup, Button } from 'react-bootstrap';
import PaginationComponent from '../components/PaginationComponent';
import TunisiaNetProductForListComponent from '../components/TunisiaNetProductForListComponent';
import SortOptionsComponent from '../components/SortOptionsComponent';
import CategoryFilterComponent from '../components/filterQueryResultOptions/CategoryFilterComponent';

const ProductListPage = () => {
   
    return (
        <Container fluid>
            <Row>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="mb-3 mt-3">
                            {/* <SortOptionsComponent /> */}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <CategoryFilterComponent />
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={9} style={{ marginBottom: '80px' }} className="text-center">
                    <TunisiaNetProductForListComponent  />
                    <PaginationComponent />
                </Col>
            </Row>
        </Container>

    );
};

export default ProductListPage;
