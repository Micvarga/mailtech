import { Button, Label, Col, FormGroup } from "reactstrap";
import { Formik, Field, Form } from "formik";
import Error from "../../Error/Error";
import Loading from "../../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../../features/Users/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginForm = () => {
    const { loading, error, userInfo } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            navigate("/home");
        }
    }, [navigate, userInfo]);

    const handleSubmit = (values, { resetForm }) => {
        console.log("form values:", values);
        console.log("in JSON format:", JSON.stringify(values));
        dispatch(userLogin(values));
        resetForm();
    };

    return (
        <Formik
            initialValues={{
                username: "",
                password: "",
            }}
            onSubmit={handleSubmit}
        >
            <Form>
                {error && <Error>{error}</Error>}
                <FormGroup row>
                    <Label htmlFor="username">Username</Label>
                    <Col md="12">
                        <Field
                            name="username"
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
                <Button type="submit" color="primary" disabled={loading}>
                    {loading ? <Loading /> : "Login"}
                </Button>
            </Form>
        </Formik>
    );
};

export default LoginForm;
