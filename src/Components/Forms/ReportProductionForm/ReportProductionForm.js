import { Button, Label, Col, FormGroup } from "reactstrap";
import { Formik, Field, Form, FieldArray } from "formik";
import styles from "../ReportProductionForm/ReportProductionForm.module.css";
import DatePickerField from "../../DatePickerField/DatePickerField";

const ReportProductionForm = () => {
    const handleSubmit = (values, { resetForm }) => {
        console.log("form values:", values);
        console.log("in JSON format:", JSON.stringify(values));
        resetForm();
    };

    const initialValues = {
        employeeId: "",
        date: "",
        productionTasks: [
            {
                task: "",
                volume: "",
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
                            <Label htmlFor="date">Date</Label>
                            <DatePickerField name="date" />
                        </Col>
                        <Col md="4"></Col>
                    </FormGroup>
                    <FieldArray name="productionTasks">
                        {({ insert, remove, push }) => (
                            <div>
                                {values.productionTasks.length > 0 &&
                                    values.productionTasks.map(
                                        (productionTask, index) => (
                                            <FormGroup
                                                row
                                                key={index}
                                                className={
                                                    styles.production_list
                                                }
                                            >
                                                <Col>
                                                    <Label
                                                        htmlFor={`productionTasks.${index}.task`}
                                                        className={styles.Label}
                                                    >
                                                        Task
                                                    </Label>
                                                    <Field
                                                        name={`productionTasks.${index}.task`}
                                                        placeholder="Select a task"
                                                        type="text"
                                                    />
                                                </Col>
                                                <Col>
                                                    <Label
                                                        htmlFor={`productionTasks.${index}.volume`}
                                                        className={styles.Label}
                                                    >
                                                        Volume
                                                    </Label>
                                                    <Field
                                                        name={`productionTasks.${index}.volume`}
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
                                        push({ task: "", volume: "" })
                                    }
                                >
                                    Add Task
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

export default ReportProductionForm;
