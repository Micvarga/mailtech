import { Button, Label, Col, FormGroup } from "reactstrap";
import { Formik, Field, Form } from "formik";

const ReportProductionForm = () => {
    const handleSubmit = (values, { resetForm }) => {
        console.log("form values:", values);
        console.log("in JSON format:", JSON.stringify(values));
        resetForm();
    };

    return (
        <Formik
            initialValues={{
                date: "",
                task: "",
                volume: "",
            }}
            onSubmit={handleSubmit}
        >
            <Form>
                <FormGroup row>
                    <Col md="4">
                        <Label htmlFor="date">Date</Label>
                        <Field
                            name="date"
                            placeholder="Date"
                            className="form-control"
                        />
                    </Col>
                    <Col md="4">
                        <Label htmlFor="task">Task</Label>
                        <Field
                            name="task"
                            placeholder=""
                            className="form-control"
                        />
                    </Col>
                    <Col md="4">
                        <Label htmlFor="volume">Volume</Label>
                        <Field
                            name="volume"
                            placeholder=""
                            className="form-control"
                        />
                    </Col>
                </FormGroup>
                <Button type="submit" color="primary">
                    Submit
                </Button>
            </Form>
        </Formik>
    );
};

export default ReportProductionForm;
