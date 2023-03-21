import { Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
    return (
        <Col>
            <FontAwesomeIcon icon={faSpinner} className="fa-spin" size="2x" />
            <p>Loading...</p>
        </Col>
    );
};

export default Loading;
