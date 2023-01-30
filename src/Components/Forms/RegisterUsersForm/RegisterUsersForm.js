import { Button, Label, Col, FormGroup } from "reactstrap";
import { Formik, Field, Form } from "formik";

const RegisterUserForm = () => {
    const handleSubmit = (values, { resetForm }) => {
        console.log("form values:", values);
        console.log("in JSON format:", JSON.stringify(values));
        resetForm();
    };

    return (
        <Formik
            initialValues={{
                employeeId: "",
                firstName: "",
                lastName: "",
                userName: "",
                password: "",
            }}
            onSubmit={handleSubmit}
        >
            <Form>
                <FormGroup row>
                    <Label htmlFor="employeeId">EmployeeId</Label>
                    <Col md="12">
                        <Field
                            name="employeeId"
                            placeholder="Enter EmployeId"
                            type="text"
                            className="form-control"
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="firstName">First Name</Label>
                    <Col md="12">
                        <Field
                            name="firstName"
                            placeholder="Enter First Name"
                            type="text"
                            className="form-control"
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Col md="12">
                        <Field
                            name="lastName"
                            placeholder="Enter Last Name"
                            type="text"
                            className="form-control"
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="userName">Username</Label>
                    <Col md="12">
                        <Field
                            name="userName"
                            placeholder="Enter Username"
                            type="text"
                            className="form-control"
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="password">Password</Label>
                    <Col md="12">
                        <Field
                            name="password"
                            placeholder=" Enter Password"
                            type="password"
                            className="form-control"
                        />
                    </Col>
                </FormGroup>
                <Button type="submit" color="primary">
                    Register User
                </Button>
            </Form>
        </Formik>
    );
};

export default RegisterUserForm;
