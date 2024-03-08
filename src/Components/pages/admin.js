import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Declare status
  const [data, setData] = useState([]);
  // Get all users from Loginin component
  const { allUsers } = location.state;

  // Handle that update user
  const handleUpdateUser = (user) => {
    navigate("/EditDetails", {
      state: { userData: user, allUsers: allUsers },
    });
  };

  // Handle that delete user
  const handleDeleteUser = (user) => {
    var indexToRemove = -1;
    for (var i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email === user.email) {
        indexToRemove = i;
        break;
      }
    }
    if (indexToRemove !== -1) allUsers.splice(indexToRemove, 1);
    localStorage.setItem("users", JSON.stringify(allUsers));
    setData(allUsers);
  };

  return (
    <div>
      <h2>פאנל מנהל</h2>
      <p>ברוך הבא מנהל המערכת</p>
      <table className="d-flex flex-column justify-content-between">
        <thead>
          <tr className="d-flex flex-row justify-content-between">
            <th>שם משתמש</th>
            <th>תאריך לידה</th>
            <th>כתובת</th>
            <th>דואר אלקטרוני</th>
            <th>אפשרויות</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr className="d-flex flex-row justify-content-between">
              <td className="align-middle">
                {user.user}{" "}
                <img
                  src={user.file}
                  alt="User"
                  className="img-fluid"
                  style={{ maxWidth: "50px" }}
                />
              </td>
              <td className="align-middle">{user.birthDate}</td>
              <td className="align-middle">
                {user.street} {user.city}
              </td>
              <td className="align-middle">{user.email}</td>
              <td className="align-middle">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="text-primary mr-2"
                  onClick={() => handleUpdateUser(user)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-danger"
                  onClick={() => handleDeleteUser(user)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
