import "./App.css";
import { Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import authToken from "./utils/authToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import ViewTodos from "./components/ViewTodos";
import { Fragment } from "react";
import EditTodo from "./components/EditTodo";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home";
import { Provider } from "react-redux";
import store from "./store";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";

// Check for token to keep user logged in
if (sessionStorage.jwtToken) {
  // Set auth token header auth
  const token = sessionStorage.jwtToken;
  authToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
        {/* <div className="text-center mb-5 mt-5">MERN STACK TODOS</div>
      <hr />
      <Route path="/" exact component={ViewTodos} />
      <Route path="/edit/:id" exact component={EditTodo} /> */}
      </Provider>
    </Fragment>
  );
}

export default App;
