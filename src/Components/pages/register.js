import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import * as formik from "formik";
import * as yup from "yup";

// Import Israel cities
import IsraelCities from "../../Data/Cities";

const Register = () => {
  const { Formik } = formik;
  const [validated, setValidated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [optionSelected, setOptionSelected] = useState(false);

  console.log(localStorage);
  const handleInputChange = (event) => {
    setOptionSelected(false);
    filterCities(event.target.value);
    setSearchTerm(event.target.value);
  };

  const filterCities = (searchTerm) => {
    const filtered = IsraelCities.filter((city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  const handleOptionSelect = (option) => {
    setOptionSelected(true);
    setSearchTerm("");
    setFilteredCities(IsraelCities.filter((item) => item.name !== option.name));
  };

  const handleCityClick = (cityName) => {
    setSelectedCity(cityName);
    console.log(selectedCity);
    // setSearchTerm(cityName); // Set the input value to the selected city name
    // filterCities(cityName); // Filter cities based on the selected city name
  };
  // const handleFileRead = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       resolve(reader.result);
  //     };
  //     reader.onerror = reject;
  //     reader.readAsDataURL(file);
  //   });
  // };
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
  // const formik = useFormik({});
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
    email: yup
      .string()
      // .email("Invalid email address")
      .required("אנא הזמן כתובת מייל")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        'אנא וודא שהכתובת מכילה "@" ובסוף com.'
      ),
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
  });
  return (
    <div className="container w-50">
      <Formik
        validationSchema={schema}
        initialValues={{
          user: "userr",
          password: "Aa123123!",
          confirmPassword: "Aa123123!",
          email: "elias@gmail.com",
          file: null,
          birthDate: "",
          city: "",
          street: "תות",
        }}
        onSubmit={async (values, actions) => {
          console.log(values);
          console.log(actions);
          try {
            const imageDataUrl = await resizeAndStoreImage(values.file);
            values.file = imageDataUrl;
            var allObjects = [];

            // if (localStorage.length > 0) {
              // Iterate through all keys in local storage
              const dataFromLocalStorage =
                JSON.parse(localStorage.getItem("users")) || [];
              if (
                Array.isArray(dataFromLocalStorage) &&
                dataFromLocalStorage.length === 0
              )
                localStorage.clear();

                const updatedUsers = [...dataFromLocalStorage, values];
                // setUsers(updatedUsers);
                localStorage.setItem("users", JSON.stringify(updatedUsers));
              // for (var i = 0; i < localStorage.length; i++) {
              //   var key = localStorage.key(i);
              //   var value = localStorage.getItem(key);

              //   // Parse the value to an object and add it to the array
              //   var parsedValue = JSON.parse(value);
              //   allObjects.push(parsedValue);
              // }
              // localStorage.clear();
              // allObjects.push(values);
              // let setObj = JSON.stringify(allObjects);
              // localStorage.setItem("users", setObj);
            // } else {
            //   let setObj = JSON.stringify(values);
            //   localStorage.setItem("users", setObj);
            // }
            // console.log(setObj);
            console.log(JSON.stringify(localStorage.getItem("users")));
            // const storedImage = localStorage.getItem("myImage");
            // if (storedImage !== imageDataUrl) {
            //   localStorage.setItem("myImage", imageDataUrl);
            //   console.log("Image stored successfully.");
            // } else {
            //   console.log("The image is already stored.");
            // }
          } catch (error) {
            console.error("Failed to store image:", error);
          }
          // Convert image file to Base64 string
          // const reader = new FileReader();
          // reader.onload = (event) => {
          //   console.log(event);
          //   values.file = event.target.result;
          //   console.log(values.file);
          //   let setObj = JSON.stringify(values);
          //   localStorage.setItem("user", setObj);
          //   // localStorage.setItem("myImage", event.target.result);
          // };
          // console.log(values.file);
          // reader.readAsDataURL(values.file);
          // let setObj = JSON.stringify(values);
          // console.log(setObj);
          // localStorage.setItem("user1", setObj);
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
              {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
              {/* <Form.Control.Feedback type="invalid" tooltip>
                {errors.user}
              </Form.Control.Feedback> */}
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
            <Form.Group className="mb-3" controlId="emailInp">
              <Form.Label>כתובת מייל</Form.Label>
              <Form.Control
                type="email"
                placeholder="כתובת מייל"
                name="email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={!!errors.email}
                required
              />
              <formik.ErrorMessage name="email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFile">
              <Form.Label>תמונה</Form.Label>
              <Form.Control
                type="file"
                name="file"
                // value={values.file}
                onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                }}
                // isValid={touched.file && !errors.file}
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
                // required
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
                // value={selectedCity}
                // onChange={
                //   // handleInputChange(e);
                //   handleChange
                //   // setFieldValue("city", e.target.value);
                //   // setFieldValue("city", selectedCity);
                // }
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
                      // onClick={() => handleOptionSelect(city)}
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
                    // <li key={index} action onClick={() => handleCityClick(city.name)}>
                    //   {city.name}
                    // </li>
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
              {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
              {/* <Form.Control.Feedback type="invalid" tooltip>
                {errors.user}
              </Form.Control.Feedback> */}
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button type="submit">הרשם</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Register;
