import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";

const HomePage = () => {
    const { userInfo } = useSelector((state) => state.user);

    return (
        <Container>
            <Row>
                <Col>
                    <h1>{`Welcome ${userInfo.username}`}</h1>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
