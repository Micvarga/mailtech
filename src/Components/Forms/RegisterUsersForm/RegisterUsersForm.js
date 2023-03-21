import { Button, Label, Col, FormGroup } from "reactstrap";
import { Formik, Field, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../features/Users/userSlice";
import Error from "../../Error/Error";
import Loading from "../../Loading/Loading";

const RegisterUserForm = () => {
    // can be used to provide updates on status of registration submission.
    const { loading, errorMsg, success } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const handleSubmit = (values, { resetForm }) => {
        console.log("form values:", values);
        console.log("in JSON format:", JSON.stringify(values));
        dispatch(registerUser(values));
        resetForm();
    };

    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                username: "",
                password: "",
            }}
            onSubmit={handleSubmit}
        >
            <Form>
                {/* will present error message pulled from state via useSelector */}
                {errorMsg && <Error errorMsg={errorMsg} />}
                {success && (
                    <div>
                        <h4>User Successfully Registered!</h4>
                    </div>
                )}
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
                    <Label htmlFor="username">Username</Label>
                    <Col md="12">
                        <Field
                            name="username"
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
                <Button type="submit" color="primary" disabled={loading}>
                    {/* will disable register puttong while external call is in loading state, once cleared will render string */}
                    {loading ? <Loading /> : "Register User"}
                </Button>
            </Form>
        </Formik>
    );
};

export default RegisterUserForm;
