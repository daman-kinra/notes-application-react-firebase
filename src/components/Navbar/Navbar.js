import React, { useContext } from "react";
import "./Navbar.css";
import { AuthContext } from "../../context/context";
import app from "../../Firbase/firebase";
import Button from "@material-ui/core/Button";

function Navbar(props) {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="nav__main">
      <div className="logo__area">
        <h2>{currentUser ? currentUser.email : "Email"}</h2>
      </div>
      <div className="heading__area">
        <p>
          {props.location.pathname === "/"
            ? "Home"
            : props.location.pathname === "/login"
            ? "Login"
            : props.location.pathname === "/signup"
            ? "Sign-Up"
            : "Error"}
        </p>
      </div>
      <div className="links__area">
        {currentUser ? (
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={() => app.auth().signOut()}
          >
            Logout
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Navbar;
