import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import newsLogo from "../../assets/logo.png";
import Container from "react-bootstrap/Container";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";

function Signup() {
    return (
        <>
            <Container className="main-signin d-flex justify-content-center align-items-center">
                <Card className="form-signin w-100 border-0">
                    <Card.Body>
                        <div className="text-center mb-4">
                            <img src={newsLogo} className="logo react mb-3" width="100px" alt="React logo"/>
                            <h2>Sign Up</h2>
                            <p>Welcome! Create an account!</p>
                        </div>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="email" placeholder="Enter your full name"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter your email"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter your password"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Repeat Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter your password again"/>
                            </Form.Group>

                            <Button variant="danger" type="submit" className="float-end mt-3 w-100">
                                Sign in
                            </Button>
                        </Form>
                        <p className="mt-10 mb-0 text-center">Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default Signup;