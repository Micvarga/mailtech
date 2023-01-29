import { Container, Row, Col } from "reactstrap";
import WorkedHoursReportForm from "../../Components/Forms/WorkedHoursReportForm/WorkedHoursReportForm";
import styles from "../WorkedHoursReportsPage/WorkedHoursReportsPage.module.css";

const WorkedHoursReportsPage = () => {
    return (
        <Container>
            <Row>
                <Col md="12">
                    <h1 className={styles.worked_hours_report_page_header}>
                        {" "}
                        Worked Hours Reports
                    </h1>
                </Col>
                <Col>
                    <WorkedHoursReportForm />
                </Col>
            </Row>
        </Container>
    );
};

export default WorkedHoursReportsPage;
