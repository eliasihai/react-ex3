// Imports
import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Modal, Button } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

const Login = ({ users }) => {
  const navigate = useNavigate();
  const { Formik } = formik;
  // States declarations
  const [validated, setValidated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [show, setShow] = useState(false);
  // Admin user
  const adminUser = { user: "admin", password: "ad12343211ad" };

  // Functions that check and navigate to profile if user is logged in
  const handleClose = () => setShow(false);
  const handleNavigate = () => {
    const jsonUser = JSON.parse(sessionStorage.getItem("user"));
    const user = users.find((usr) => {
      return usr.email === jsonUser.email && usr.password === jsonUser.password;
    });
    navigate("/Profile", {
      state: { userData: user },
    });
    handleClose(); // Close the modal after navigation
  };

  // Check if user exist in local storage
  function userExists(email, password) {
    return users.some(function (el) {
      return el.email === email && el.password === password;
    });
  }

  // parameters for log in
  const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  });
  return (
    <div className="container w-25">
      <Formik
        validationSchema={schema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, actions) => {
          // Check if session storage is empty
          if (sessionStorage.length === 0) {
            // check the inputs for admin login and navigate to admin panel
            if (
              values.email == adminUser.user &&
              values.password == adminUser.password
            ) {
              navigate("/Admin", {
                state: { allUsers: users },
              });
              // If is user log in check if the user exist
            } else if (userExists(values.email, values.password)) {
              const user = users.find((usr) => {
                return (
                  usr.email === values.email && usr.password === values.password
                );
              });
              sessionStorage.setItem("user", JSON.stringify(values));
              navigate("/Profile", {
                state: { fromLogin: true, userData: user, allUsers: users },
              });
            }
            // If user not exist will show a alert under password
            else if (!userExists(values.email, values.password)) {
              userExists(values.email, values.password)
                ? setIsLoggedIn(true)
                : setIsLoggedIn(false);
            }
          } else {
            // If session storage not empty setShow will make a pop up
            if (userExists(values.email, values.password)) setShow(true);
          }
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="emailInp">
              <Form.Label>דואר אלקטרוני</Form.Label>
              <Form.Control
                placeholder="דואר אלקטרוני"
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                autoComplete="off"
                // isValid={touched.email && !errors.email}
                // isInvalid={!!errors.email}
              />
              {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordInp">
              <Form.Label>ססמא</Form.Label>
              <Form.Control
                type="password"
                placeholder="ססמא"
                name="password"
                value={values.password}
                onChange={handleChange}
                autoComplete="off"
                // isValid={touched.password && !errors.password}
                // isInvalid={!!errors.password}
              />
              {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
            </Form.Group>
            {!isLoggedIn && (
              <div className="error" style={{ color: "red" }}>
                שם המשתמש או ססמא אינם נכונים
              </div>
            )}
            <div className="d-flex justify-content-center">
              <Button type="submit">התחבר</Button>
            </div>
          </Form>
        )}
      </Formik>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>הינך מחובר</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>בעת לחיצה על כפתור "סיום" תועבר לדף המשתמש</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleNavigate}>
            סיום
          </Button>
        </Modal.Footer>
      </Modal>
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
