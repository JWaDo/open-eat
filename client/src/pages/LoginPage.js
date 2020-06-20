import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from '../components/Auth/LoginForm';

function LoginPage() {
    return (
        <React.Fragment>
            <Container className='h100vh'>
                <Row className='justify-content-center align-items-center h-100'>
                    <Col md={6} xl={4}>

                        {/* Login form */}
                        <LoginForm />
                        
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default LoginPage;
