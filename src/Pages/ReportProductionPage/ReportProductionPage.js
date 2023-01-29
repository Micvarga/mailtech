import { Col, Container, Row } from "reactstrap";
import ReportProductionForm from "../../Components/Forms/ReportProductionForm/ReportProductionForm";
import styles from "../ReportProductionPage/ReportProductionPage.module.css";

const ReportProductionPage = () => {
    return (
        <Container>
            <Row>
                <Col md="12">
                    <h1 className={styles.report_production_page_header}>
                        Report Production
                    </h1>
                </Col>
                <Col md="12">
                    <ReportProductionForm />
                </Col>
            </Row>
        </Container>
    );
};

export default ReportProductionPage;
