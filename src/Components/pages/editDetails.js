import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as formik from "formik";
import * as yup from "yup";

import IsraelCities from "../../Data/Cities";

function EditDetails() {
  // formik declare
  const { Formik } = formik;
  // declarations for navigate
  const location = useLocation();
  const navigate = useNavigate();
  // Get user information from profile page
  const { fromLogin, userData, allUsers } = location.state;

  // Declare states and useRef
  const fileInputRef = useRef();
  const [validated, setValidated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [optionSelected, setOptionSelected] = useState(false);

  // When typing the city options will change
  const handleInputChange = (event) => {
    setOptionSelected(false);
    filterCities(event.target.value);
    setSearchTerm(event.target.value);
  };

  // Filter for city input
  const filterCities = (searchTerm) => {
    const filtered = IsraelCities.filter((city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  // Get the city option that selected
  const handleOptionSelect = (option) => {
    setOptionSelected(true);
    setSearchTerm("");
    setFilteredCities(IsraelCities.filter((item) => item.name !== option.name));
  };

  // Resize image size to push it to local storage
  function resizeAndStoreImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Calculate new dimensions (e.g., half the original size)
          const newWidth = img.width / 2;
          const newHeight = img.height / 2;

          // Set canvas dimensions
          canvas.width = newWidth;
          canvas.height = newHeight;

          // Draw image to canvas with new dimensions
          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          // Get resized image data as a data URL
          const resizedImageData = canvas.toDataURL("image/jpeg");

          // Store resized image data in local storage
          // localStorage.setItem('resizedImage', resizedImageData);

          // Resolve the promise with the resized image data
          resolve(resizedImageData);
        };
        img.src = event.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const schema = yup.object().shape({
    user: yup
      .string()
      .min(
        3,
        "ניתן למלא אותיות לועזיות בלבד, מספרים ותווים מיוחדים. יש לוודא שאורך הטקסט לא יעלה על 60 תווים."
      )
      .max(60, "אורך הטקסט מעל 60 תווים")
      .required(
        "ניתן למלא אותיות לועזיות בלבד, מספרים ותווים מיוחדים. יש לוודא שאורך הטקסט לא יעלה על 60 תווים."
      ),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{7,12})/,
        "חייב להכיל 7-12 תווים, אות אחת גדולה, אות קטנה אחת, מספר אחד ותו אות מיוחד אחד"
      )
      .required("אנא הזן ססמא"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], "ססמאות אינן זהות, נסה שנית")
      .required("אנא הזן את אימות הססמא"),
    file: yup
      .mixed()
      .required("אנא בחר תמונה")
      .test(
        "fileFormat",
        "סוג הקובץ אינו נתמך. סוגי הקבצים שנתמכים הם jpg/jpeg",
        (value) => value && ["image/jpeg", "image/jpg"].includes(value.type)
      ),
    birthDate: yup.date().required("אנא בחר תאריך לידה").max(new Date()),
    city: yup.string().required("אנא בחר עיר"),
    street: yup
      .string()
      .matches(/^[א-ת\s]*$/, "ניתן רק אותיות בעברית")
      .required("אנא בחר עיר"),
      houseNumber: yup.string()
      .matches(/^[0-9]*$/, "אנא הקש רק מספרים")
      .required("מספר בית הוא שדה חובה"),
  });
  return (
    <div className="container w-50">
      <Formik
        validationSchema={schema}
        initialValues={{
          user: userData.user,
          password: userData.password,
          confirmPassword: userData.confirmPassword,
          email: userData.email,
          file: userData.file,
          birthDate: userData.birthDate,
          city: userData.city,
          street: userData.street,
          houseNumber: userData.houseNumber,
        }}
        onSubmit={async (values, actions) => {
          // onSubmit function that update the user data
          try {
            const imageDataUrl = await resizeAndStoreImage(values.file);
            values.file = imageDataUrl;
            // Get data from local storage
            const dataFromLocalStorage =
              JSON.parse(localStorage.getItem("users")) || [];

            // Get the local storage onject that needs to update
            const indexToUpdate = dataFromLocalStorage.findIndex(
              (obj) => obj.email === userData.email
            );

            if (indexToUpdate !== -1) {
              dataFromLocalStorage[indexToUpdate] = values;

              // Store the updated data back into local storage
              localStorage.setItem(
                "users",
                JSON.stringify(dataFromLocalStorage)
              );
              navigate("/Profile", {
                state: {
                  fromLogin: true,
                  userData: values,
                  allUsers: dataFromLocalStorage,
                },
              });
            } else {
              console.log("Object not found");
            }
          } catch (error) {
            console.error("Failed to store image:", error);
          }
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
          setFieldValue,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="nameInp">
              <Form.Label>שם משתמש</Form.Label>
              <Form.Control
                placeholder="שם משתמש"
                type="text"
                name="user"
                value={values.user}
                onChange={handleChange}
                isValid={touched.user && !errors.user}
                isInvalid={!!errors.user}
                required
              />
              <formik.ErrorMessage name="user" />
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
                required
              />
              <formik.ErrorMessage name="password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPasswordInp">
              <Form.Label>אימות ססמא</Form.Label>
              <Form.Control
                type="password"
                placeholder="אימות ססמא"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                isValid={touched.confirmPassword && !errors.confirmPassword}
                isInvalid={!!errors.confirmPassword}
                required
              />
              <formik.ErrorMessage name="confirmPassword" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFile">
              <Form.Label>תמונה</Form.Label>
              <Form.Control
                type="file"
                name="file"
                ref={fileInputRef}
                // value={values.file}
                onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                }}
                isInvalid={!!errors.file}
                required
              />
              <formik.ErrorMessage name="file" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>תאריך לידה</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={values.birthDate}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.birthDate && !errors.birthDate}
                isInvalid={touched.birthDate && !!errors.birthDate}
              />
              <formik.ErrorMessage name="birthDate" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>עיר</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="הקלד כדי לחפש את שם העיר"
                value={values.city || searchTerm}
                onChange={(e) => {
                  handleInputChange(e);
                  handleChange(e);
                }}
                isValid={touched.city && !errors.city}
                isInvalid={!!errors.city}
                required
              />
              {!optionSelected && (
                <ul>
                  {filteredCities.map((city, index) => (
                    <li
                      key={index}
                      action
                      onClick={() => {
                        handleChange({
                          target: { name: "city", value: city.name },
                        });
                        setSearchTerm("");
                        setFilteredCities(IsraelCities);
                        handleOptionSelect(city);
                      }}
                    >
                      {city.name}
                    </li>
                  ))}
                </ul>
              )}
              <formik.ErrorMessage name="city" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="streetInp">
              <Form.Label>רחוב</Form.Label>
              <Form.Control
                placeholder="רחוב"
                type="text"
                name="street"
                value={values.street}
                onChange={handleChange}
                isValid={touched.street && !errors.street}
                isInvalid={!!errors.street}
                required
              />
              <formik.ErrorMessage name="street" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="houseNumberInp">
              <Form.Label>מספר בית</Form.Label>
              <Form.Control
                placeholder="מספר בית"
                type="number"
                name="houseNumber"
                value={values.houseNumber}
                onChange={handleChange}
                isValid={touched.houseNumber && !errors.houseNumber}
                isInvalid={!!errors.houseNumber}
                required
              />
              <formik.ErrorMessage name="houseNumber" />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button type="submit">ערוך משתמש</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditDetails;
