import { Button, Label, Col, FormGroup } from "reactstrap";
import { Formik, Field, Form, FieldArray } from "formik";
import DatePickerField from "../../DatePickerField/DatePickerField";
import styles from "../WorkedHoursReportForm/WorkedHoursReportForm.module.css";

const WorkedHoursReportForm = () => {
    const handleSubmit = (values, { resetForm }) => {
        console.log("form values:", values);
        console.log("in JSON format:", JSON.stringify(values));
        resetForm();
    };

    const initialValues = {
        employeeId: "",
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
                        <Col md="4">
                            <Label htmlFor="employeeId">Employee Id</Label>
                            <Field
                                name="employeeId"
                                placeholder=""
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
                                                <Col md="1">
                                                    <Label
                                                        htmlFor={`workedHours.${index}.date`}
                                                    >
                                                        Date
                                                    </Label>
                                                </Col>
                                                <Col md="3">
                                                    <DatePickerField
                                                        name={`workedHours.${index}.date`}
                                                        label="Date"
                                                    />
                                                </Col>
                                                <Col md="8">
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
