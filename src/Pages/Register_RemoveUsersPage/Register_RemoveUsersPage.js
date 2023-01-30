import { Container, Row, Col } from "reactstrap";
import RegisterUserForm from "../../Components/Forms/RegisterUsersForm/RegisterUsersForm";
import styles from "../Register_RemoveUsersPage/Register_RemoveUsersPage.module.css";

const Register_RemoveUsersPage = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <h1 className={styles.register_users_header}>
                        Register Users
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col md="6">
                    <RegisterUserForm />
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};

export default Register_RemoveUsersPage;
