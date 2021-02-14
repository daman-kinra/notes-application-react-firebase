import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Error from "./pages/Error";
import { AuthProvider } from "./context/context";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route component={Error} />
          </Switch>
        </>
      </Router>
    </AuthProvider>
  );
}

export default App;
