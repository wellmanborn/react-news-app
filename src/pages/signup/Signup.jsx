import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import newsLogo from "../../assets/logo.png";
import Container from "react-bootstrap/Container";
import {Alert, Card} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../providers/Auth.jsx";
import {useState} from "react";
import {useForm} from "react-hook-form";
import SignupValidation from "../signup/SignupValidation";
import http from "../../libs/Http.jsx";

function Signup() {

    const location = useLocation();
    // const auth = useAuth();
    const navigate = useNavigate();
    const redirectPath = location.state?.path || "/login";
    const [error, setError] = useState(false);

    let {register, handleSubmit, formState: {errors}} = useForm({resolver: SignupValidation()});

    const onSubmit = async (data) => {
        http.post("register", {
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirm
        }).then(() => {
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
                            <h2>Sign Up</h2>
                            <p>Welcome! Create an account!</p>
                            {error && <Alert variant={"danger"}>{error}</Alert>}
                        </div>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text"
                                              isInvalid={errors.name}
                                              placeholder="Enter your full name"
                                              aria-label="Enter your full name"
                                              {...register("name")} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name && errors.name.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"
                                              isInvalid={errors.email}
                                              placeholder="Enter your email"
                                              aria-label="Enter your email"
                                              {...register("email")} />
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

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Repeat Password</Form.Label>
                                <Form.Control type="password"
                                              isInvalid={errors.password_confirm}
                                              placeholder="Enter your password again"
                                              aria-label="Enter your password again"
                                              {...register("password_confirm")}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password_confirm && errors.password_confirm.message}
                                </Form.Control.Feedback>
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