import React, {useState} from 'react';
import './Home.css';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from './ISBA_Logo.png';
import Modalpopup from './Modalpopup';


export const Home = () => {
    return (
    <div className="home-container">
        <div className="center-content">
            <div className="logo-and-heading">
                <img src={Logo} alt="Logo" width="150" height="150" /> {/* Include the logo here */}
                <h1 style={{ fontSize: '3em', fontWeight: 'bold', marginLeft: '10px' }}>ISBA Outreach</h1>
            </div>
            <p></p>
        </div>
        <Card className="custom-card">
            <Card.Body className="card-body">
                <Card.Title></Card.Title>
                <Card.Text>
                    Explore Connections
                </Card.Text>
                <div className="search-button-container">
                    <Link to='/Modalpopup'>
                        <Button variant="primary">Search</Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="2">
                </Col>
                <Col md="auto"></Col>
                <Col xs lg="2">

                </Col>
            </Row>
        </Container>
       
        
    </div>
    )
}


export default Home;
