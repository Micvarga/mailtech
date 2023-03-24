import { Col } from "reactstrap";

const Error = ({ error }) => {
    return (
        <Col>
            <h4>{error}</h4>
        </Col>
    );
};

export default Error;
