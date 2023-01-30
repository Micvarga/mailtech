import { Button, Label, Col, FormGroup } from "reactstrap";
import { Formik, Field, Form } from "formik";

const LoginForm = () => {
    const handleSubmit = (values, { resetForm }) => {
        console.log("form values:", values);
        console.log("in JSON format:", JSON.stringify(values));
        resetForm();
    };

    return (
        <Formik
            initialValues={{
                userName: "",
                password: "",
            }}
            onSubmit={handleSubmit}
        >
            <Form>
                <FormGroup row>
                    <Label htmlFor="userName">Username</Label>
                    <Col md="12">
                        <Field
                            name="userName"
                            placeholder="Username"
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
                            placeholder="Password"
                            type="password"
                            className="form-control"
                        />
                    </Col>
                </FormGroup>
                <Button type="submit" color="primary">
                    Login
                </Button>
            </Form>
        </Formik>
    );
};

export default LoginForm;
