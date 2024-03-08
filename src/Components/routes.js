// Routes.js
import React from "react";
import { Route, Routes , Outlet} from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";

const RoutesComponent = ({ localStorageData }) => {
  return (
    <Routes>
      <Route path="/" exact />
      <Route
        path="/login"
        component="Login"
        render={(props) => (
          <Login {...props} localStorageData={localStorageData} />
        )}
      />
      <Route
        path="/register"
        component="Register"
        render={(props) => (
          <Register {...props} localStorageData={localStorageData} />
        )}
      />
    </Routes>
  );
};

export default RoutesComponent;

// import Login from "./pages/login";
// import Register from "./pages/register";

// const routes = createBrowserRouter[
//   { path: "/", exact: true, data: null },
//   { path: "/login", component: <Login />, data: null },
//   { path: "/register", component: <Register />, data: null },
// ];

// export default routes;
