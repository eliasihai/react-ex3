import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/navbar";
import routes from "./Components/routes";
import Login from "./Components/pages/login";
import Register from "./Components/pages/register";
import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "users";

const retrieveUsers = () => {
  const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedUsers ? JSON.parse(storedUsers) : null;
};

const initialUsers = retrieveUsers() || [];

const App = () => {
  // const [users, setUsers] = useState([]);
  const [users, setUsers] = useState(initialUsers);

  const loadUsers = () => {
    if (!retrieveUsers())
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
    // const storedUsers = localStorage.getItem("users");
    // console.log(storedUsers);
    // if (storedUsers) setUsers(JSON.parse(storedUsers));
    console.log(users);
  };

  useEffect(() => {
    loadUsers();
  }, [users]);
  return (
    <Router>
      <NavBar />
      <div className="container mt-4" dir="rtl">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
// <Router>
// <div className="App">
{
  /* <NavBar />
      <Routes>
        <Route path="/"/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes> */
}
// </div>
// </Router>
