import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../../Firbase/firebase";
import { AuthContext } from "../../context/context";
import Navbar from "../../components/Navbar/Navbar";
import "./Login.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const Login = ({ history, location }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history],
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Navbar location={location} />
      <div className="login__main">
        <div className="form">
          <div className="heading">
            <h2>Login</h2>
          </div>
          <form onSubmit={handleLogin} autoComplete="on">
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
              Log in
            </Button>

            <p className="signup">
              Not registered?{" "}
              <span>
                <Link to="/signup" className="link">
                  Sign up
                </Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default withRouter(Login);
