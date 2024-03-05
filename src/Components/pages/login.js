import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import * as formik from "formik";
import * as yup from "yup";

// import '../../rtl.module.css'; // Import your RTL-specific CSS
const Login = () => {
  const { Formik } = formik;
  const [validated, setValidated] = useState(false);

  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   } else {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     setValidated(true);
  //     console.log("asasas");
  //   }
  // };
  const schema = yup.object().shape({
    user: yup.string().required(),
    password: yup.string().required(),
  });
  return (
    <div className="container w-25">
      <Formik
        validationSchema={schema}
        initialValues={{
          user: "",
          password: "",
        }}
        onSubmit={(values, actions) => {
          console.log(values);
          console.log(actions);
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="userInp">
              <Form.Label>שם משתמש</Form.Label>
              <Form.Control
                placeholder="שם משתמש"
                type="text"
                name="user"
                value={values.user}
                onChange={handleChange}
                isValid={touched.user && !errors.user}
                isInvalid={!!errors.user}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordInp">
              <Form.Label>ססמא</Form.Label>
              <Form.Control
                type="password"
                placeholder="ססמא"
                name="password"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button type="submit">התחבר</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;

{
  /*     <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="userInp">
        <Form.Label>שם משתמש</Form.Label>
        <Form.Control type="text" placeholder="שם משתמש" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="passwordInp">
        <Form.Label>ססמא</Form.Label>
        <Form.Control type="password" placeholder="ססמא" required />
      </Form.Group>

      <Button type="submit">התחבר</Button>
    </Form> */
}
