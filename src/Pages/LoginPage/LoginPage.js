import LoginForm from "../../Components/Forms/LoginForm";
import { Container, Row, Col } from "reactstrap";
import styles from "../LoginPage/LoginPage.module.css";

const LoginPage = () => {
    return (
        <Container>
            <Row>
                <Col md="12">
                    <h1 className={styles.login_page_header}>
                        Welcome! Please Login to Continue.
                    </h1>
                </Col>
                <Col></Col>
                <Col md="4" className={{ order: 2 }}>
                    <LoginForm />
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
