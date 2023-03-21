import { Col } from "reactstrap";

const Error = ({ errorMsg }) => {
    return (
        <Col>
            <h4>{errorMsg}</h4>
        </Col>
    );
};

export default Error;
