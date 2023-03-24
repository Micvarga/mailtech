import {
    Button,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Row,
    Col,
    Container,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopesBulk } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../../app/Services/authServices";
import { useEffect } from "react";
import { logout, setCredentials } from "../../features/Users/userSlice";

const Header = () => {
    const { userInfo, userToken } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // automatically authenticate user if token is found.
    const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
        // perform a refetch every 15 min
        pollingInterval: 900000,
    });

    console.log(data); //user object

    useEffect(() => {
        if (data) dispatch(setCredentials(data));
    }, [data, dispatch]);

    return (
        <Container className={styles.nav_section} fluid>
            <span>
                {isFetching
                    ? `Fetching your profile...`
                    : userInfo !== null
                    ? `Logged in as ${userInfo.username}`
                    : "You're not logged in"}
            </span>
            <Row className={styles.logo_section}>
                <Col md="2" className="py-3">
                    <FontAwesomeIcon icon={faEnvelopesBulk} size="3x" />
                </Col>
                <Col className="py-3">
                    <h1 className="text-start">MailTech</h1>
                </Col>
            </Row>
            <Row>
                <Col className="px-0">
                    <Navbar className={styles.navbar}>
                        <Nav>
                            <NavItem>
                                <NavLink className="nav-link" to="production">
                                    <Button color="primary">
                                        Report Production
                                    </Button>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="efficiency">
                                    <Button color="primary">
                                        My Efficiency Reports
                                    </Button>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="metrics">
                                    <Button color="primary">
                                        Team Metric Reports
                                    </Button>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="hours">
                                    <Button color="primary">
                                        Worked Hours Reports
                                    </Button>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="volume">
                                    <Button color="primary">
                                        Volume Reports
                                    </Button>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="users">
                                    <Button color="primary">
                                        Register/Remove Users
                                    </Button>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                {userInfo ? (
                                    <button
                                        className="button"
                                        onClick={() => dispatch(logout())}
                                    >
                                        Log Out
                                    </button>
                                ) : (
                                    <NavLink className="nav-link" to="/">
                                        <Button color="primary">Login</Button>
                                    </NavLink>
                                )}
                            </NavItem>
                        </Nav>
                    </Navbar>
                </Col>
            </Row>
        </Container>
    );
};

export default Header;
