import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/navbar";
// import routes from "./Components/routes";
import Login from "./Components/pages/login";
import Register from "./Components/pages/register";
import EditDetails from "./Components/pages/editDetails";
import { useState, useEffect } from "react";
import RoutesComponent from "./Components/routes";
import Profile from "./Components/pages/profile";
import Admin from "./Components/pages/admin";
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
          <Route path="/" />
          <Route path="/login" element={<Login users={users} />} />
          <Route path="/register" element={<Register users={users} />} />
          <Route path="/editDetails" element={<EditDetails />} /> 
          <Route path="/profile" element={<Profile users={users}/>} /> 
          <Route path="/admin" element={<Admin users={users}/>} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
