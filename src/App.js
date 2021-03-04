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

  render() { // FIX ROUTING ISSUE
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />

            <PrivateRoute
              path={ROUTES.SCANNER}
              authenticated={this.state.authenticated}
              component={ScannerPage}
            ></PrivateRoute>
            <PublicRoute
              path={ROUTES.SIGN_UP}
              authenticated={this.state.authenticated}
              component={Signup}
            ></PublicRoute>
            <PublicRoute
              path={ROUTES.LOGIN}
              authenticated={this.state.authenticated}
              component={Login}
            ></PublicRoute>
          </Switch>
        </Router>
      );
    }
  }
}

export default App;
