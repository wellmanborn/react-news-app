import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import newsLogo from "../assets/logo.png";
import http from "../libs/Http";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../providers/Auth";

function Navigation() {

    const navigate = useNavigate();
    const auth = useAuth();

    const user = typeof auth.user == "object" ? auth.user : JSON.parse(auth.user)

    const handleLogout = async () => {
        await http.post("http://localhost:8000/logout")
        auth.logout();
        navigate("/login");
    }

    return (
        <>
            <div className="top-nav"/>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary border-bottom ">
                <Container>
                    <Navbar.Brand href="#home">
                        <img src={newsLogo} width="80px" className="logo react" alt="React logo"/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">Home</Nav.Link>
                            <Nav.Link href="#pricing">My News</Nav.Link>
                        </Nav>
                        <Nav>
                            {/*@todo change title to logged in user name*/}
                            <NavDropdown title={user?.name} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Preferences</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item onClick={handleLogout}>
                                    Log out
                                </NavDropdown.Item>
                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;