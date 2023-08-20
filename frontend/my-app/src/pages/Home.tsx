import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
function GridExample() {
    const cardData = [
        {
            title: 'Jumia',
            text: 'Explore All Jumia Products.',
            imageSrc: '/images/jumia.png',
            link:'/jumia',
        },
        {
            title: 'Mytek',
            text: 'Explore All Mytek Products.',
            imageSrc: '/images/mytek.png',
            link:'/mytek',
        },
        {
            title: 'TunisiaNet',
            text: 'Explore All TunisiaNet Products.',
            imageSrc: '/images/tunsianet.png',
            link:'/tunisianet',
        },
        {
            title: 'Al Kitab',
            text: 'Explore All ALKITAB Books.',
            imageSrc: '/images/LOGO-ALKITAB.png',
            link:'/alkitab',

        }
    ];

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Row xs={1} md={2} className="g-4 justify-content-center">
                {cardData.map((card, idx) => (
                    <Col key={idx}>
                        <LinkContainer to={card.link} style={{ cursor: 'pointer', maxWidth: '90%', marginLeft: '50px', marginTop: '50px' }}>
                            <Card style={{ marginTop: '30px' }}>
                                <Card.Img variant="top" src={process.env.PUBLIC_URL + card.imageSrc} style={{
                                    width: idx === 2 ? '50%' : '40%',
                                    height: '150px',
                                    objectFit: 'cover',
                                    borderRadius: '5px',
                                    marginTop: '40px',
                                    marginLeft: '50px'
                                }} />
                                <Card.Body>
                                    <Card.Title>{card.title}</Card.Title>
                                    <Card.Text>{card.text}</Card.Text>
                                </Card.Body>
                            </Card>
                        </LinkContainer>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default GridExample;
