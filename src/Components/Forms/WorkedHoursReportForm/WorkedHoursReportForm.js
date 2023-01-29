import { Button, Label, Col, FormGroup } from "reactstrap";
import { Formik, Field, Form, FieldArray } from "formik";
import styles from "../WorkedHoursReportForm/WorkedHoursReportForm.module.css";

const WorkedHoursReportForm = () => {
    const handleSubmit = (values, { resetForm }) => {
        console.log("form values:", values);
        console.log("in JSON format:", JSON.stringify(values));
        resetForm();
    };

    const initialValues = {
        employeeId: "",
        productionCycle: "",
        workedHours: [
            {
                date: "",
                hoursWorked: "",
            },
        ],
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values }) => (
                <Form>
                    <FormGroup row>
                        <Col md="4"></Col>
                        <Col md="4" className={{ order: 2 }}>
                            <Label htmlFor="employeeId">Employee Id</Label>
                            <Field
                                name="employeeId"
                                placeholder=""
                                className="form-control"
                            />
                            <Label htmlFor="productionCycle">
                                Production Cycle
                            </Label>
                            <Field
                                name="productionCycle"
                                placeholder="Select A Cycle"
                                className="form-control"
                            />
                        </Col>
                        <Col md="4"></Col>
                    </FormGroup>
                    <FieldArray name="workedHours">
                        {({ insert, remove, push }) => (
                            <div>
                                {values.workedHours.length > 0 &&
                                    values.workedHours.map(
                                        (workedHours, index) => (
                                            <FormGroup
                                                row
                                                key={index}
                                                className={
                                                    styles.worked_hours_list
                                                }
                                            >
                                                <Col md="5">
                                                    <Label
                                                        htmlFor={`workedHours.${index}.date`}
                                                        className={styles.Label}
                                                    >
                                                        Date
                                                    </Label>
                                                    <Field
                                                        name={`workedHours.${index}.date`}
                                                        placeholder=""
                                                        type="text"
                                                    />
                                                </Col>
                                                <Col md="7">
                                                    <Label
                                                        htmlFor={`workedHours.${index}.hoursWorked`}
                                                        className={styles.Label}
                                                    >
                                                        Hours Worked
                                                    </Label>
                                                    <Field
                                                        name={`workedHours.${index}.hoursWorked`}
                                                        placeholder="0"
                                                        type="text"
                                                    />
                                                    <Button
                                                        color="danger"
                                                        onClick={() =>
                                                            remove(index)
                                                        }
                                                        className={
                                                            styles.remove_task_button
                                                        }
                                                    >
                                                        X
                                                    </Button>
                                                </Col>
                                            </FormGroup>
                                        )
                                    )}
                                <Button
                                    color="secondary"
                                    onClick={() =>
                                        push({ date: "", hoursWorked: "" })
                                    }
                                >
                                    Add Worked Hours
                                </Button>
                            </div>
                        )}
                    </FieldArray>
                    <Button
                        type="submit"
                        color="success"
                        className={styles.submit_button}
                    >
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default WorkedHoursReportForm;
