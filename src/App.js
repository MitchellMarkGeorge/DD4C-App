import "./App.css";
import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ScannerPage from "./pages/ScannerPage";
import Landing from "./pages/Landing";
import { auth } from "./services/firebase";
import { ROUTES } from "./services/routes";
import Loading from "./components/Loading";
import Success from "./pages/Success";
import Error from "./pages/Error";

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: ROUTES.LOGIN, state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to={ROUTES.SCANNER} />
        )
      }
    />
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        this.setState({
          isAuthenticated: false,
          isLoading: false,
        });
      }
    });
  }

  render() {
    
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />

            <PrivateRoute
              path={ROUTES.SCANNER}
              authenticated={this.state.isAuthenticated}
              component={ScannerPage}
            ></PrivateRoute>
            <PrivateRoute
              path={ROUTES.SUCCESS}
              authenticated={this.state.isAuthenticated}
              component={Success}
            ></PrivateRoute>
            <PrivateRoute
              path={ROUTES.ERROR}
              authenticated={this.state.isAuthenticated}
              component={Error}
            ></PrivateRoute>
            <PublicRoute
              path={ROUTES.SIGN_UP}
              authenticated={this.state.isAuthenticated}
              component={Signup}
            ></PublicRoute>
            <PublicRoute
              path={ROUTES.LOGIN}
              authenticated={this.state.isAuthenticated}
              component={Login}
            ></PublicRoute>
          </Switch>
        </Router>
      );
    }
  }
}

export default App;
