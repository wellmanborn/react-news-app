import {useLocation, useNavigate, Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import newsLogo from "../../assets/logo.png";
import Container from "react-bootstrap/Container";
import {Alert, Card} from "react-bootstrap";
import {useForm} from "react-hook-form";
import http from './../../libs/Http'
import LoginValidation from "./LoginValidation.js";
import {useAuth} from "../../providers/Auth.jsx";
import {useState} from "react";

function Login() {

    const location = useLocation();
    const auth = useAuth();
    const navigate = useNavigate();
    const redirectPath = location.state?.path || "/";
    const [error, setError] = useState(false);

    let {register, handleSubmit, formState: {errors}} = useForm({resolver: LoginValidation()});

    const onSubmit = async (data) => {
        http.post("login", {
            email: data.email,
            password: data.password
        }).then(response => {
            auth.login(response.data);
            navigate(redirectPath, {replace: true})
        }).catch(error => {
            if (error.response) {
                setError(error.response?.data?.message)
            }
        });
    }

    return (
        <>
            <Container className="main-signin d-flex justify-content-center align-items-center">
                <Card className="form-signin w-100 border-0">
                    <Card.Body>
                        <div className="text-center mb-4">
                            <img src={newsLogo} className="logo react mb-3" width="100px" alt="React logo"/>
                            <h2>Sign In </h2>
                            <p>Welcome back! Enter your email address and password below to sign in</p>
                            {error && <Alert variant={"danger"}>{error}</Alert>}
                        </div>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"
                                              isInvalid={errors.email}
                                              placeholder="Enter your email"
                                              aria-label="Enter your email"
                                              {...register("email")}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email && errors.email.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                              isInvalid={errors.password}
                                              placeholder="Enter your password"
                                              aria-label="Enter your password"
                                              {...register("password")}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password && errors.password.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="danger" type="submit" className="float-end mt-3 w-100">
                                Sign in
                            </Button>
                        </Form>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <p className="mt-10 mb-0 text-center">Don't have an account? <Link to="/signup">Sign up</Link>
                        </p>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default Login;