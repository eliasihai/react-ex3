import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const { fromLogin, userData, allUsers } = location.state;

  // Function to handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login", {
      state: { users: allUsers },
    });
  };

  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2>פרופיל</h2>
      <div className="card p-3">
        <div>
          <strong>שם משתמש:</strong> {userData.user}
        </div>
        <div>
          <strong>דואר אלקטרוני:</strong> {userData.email}
        </div>
        <div>
          <strong>רחוב:</strong> {userData.street}
        </div>
        <div>
          <strong>עיר:</strong> {userData.city}
        </div>
        <div>
          <strong>תאריך לידה:</strong> {userData.birthDate}
        </div>
        <div>
          <strong></strong>{" "}
          <img
            src={userData.file}
            alt="User"
            className="img-fluid rounded-circle"
          />
        </div>
      </div>
      <div className="mt-3 d-flex justify-content-between">
        <button className="btn btn-primary mr-2" onClick={handleLogout}>
          התנתק
        </button>
        <Link
          to="https://www.crazygames.com/game/8-ball-billiards-classic"
          className="btn btn-primary mr-2"
        >
          משחק רשת
        </Link>
        <button
          className="btn btn-primary"
          onClick={() =>
            navigate("/EditDetails", {
              state: { userData: userData, allUsers: allUsers },
            })
          }
        >
          ערוך פרטים
        </button>
      </div>
    </div>
  );
};
const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    textAlign: "center",
  },
  userInfo: {
    marginBottom: "20px",
  },
  userImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    margin: "0 10px",
    padding: "10px 20px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
  },
};
export default Profile;
