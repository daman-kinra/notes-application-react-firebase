import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../../Firbase/firebase";
import Navbar from "../../components/Navbar/Navbar";
import "./Signup.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const SignUp = ({ history, location }) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history],
  );

  return (
    <>
      <Navbar location={location} />
      <div className="login__main">
        <div className="form">
          <div className="heading">
            <h2>Sign up</h2>
          </div>
          <form onSubmit={handleSignUp} autoComplete="on">
            <TextField
              className="inputs"
              label="Email"
              variant="outlined"
              size="small"
              name="email"
              type="email"
            />
            <TextField
              className="inputs"
              label="Password"
              variant="outlined"
              size="small"
              name="password"
              type="password"
            />
            <Button
              variant="contained"
              className="submit__btn"
              color="primary"
              type="submit"
            >
              Sign up
            </Button>

            <p className="login">
              Already have an account?{" "}
              <span>
                <Link to="/login" className="link">
                  Log in
                </Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default withRouter(SignUp);
