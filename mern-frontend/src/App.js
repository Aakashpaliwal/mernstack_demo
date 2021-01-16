import "./App.scss";
import { Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import authToken from "./utils/authToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import ViewTodos from "./components/ViewTodos";
import { Fragment, useState, useEffect } from "react";
import EditTodo from "./components/EditTodo";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home";
import { Provider } from "react-redux";
import store from "./store";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Deal from "./components/Deal/Deal";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyles } from "./global";

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
  const [isDark, setDark] = useState(defaultTheme());
  const themeStatus = (themeValue) => {
    setDark(themeValue);
  };
  function defaultTheme() {
    const selectedTheme = JSON.parse(localStorage.getItem("dark"));
    return selectedTheme || false;
  }

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(isDark));
  }, [isDark]);
  return (
    <Fragment>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Provider store={store}>
          <GlobalStyles />
          <div className={isDark ? "dark-theme" : "light-theme"}>
            <Navbar
              themeHandler={themeStatus}
              defaultThemeValue={defaultTheme()}
            />
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Switch>
              <PrivateRoute
                exact
                path="/dashboard"
                // component={Dashboard}
                component={() => <Dashboard isDarkTheme={isDark} />}
              />
              <PrivateRoute
                exact
                path="/deals"
                // component={Dashboard}
                component={() => <Deal isDarkTheme={isDark} />}
              />
            </Switch>
          </div>
          {/* <div className="text-center mb-5 mt-5">MERN STACK TODOS</div>
      <hr />
      <Route path="/" exact component={ViewTodos} />
      <Route path="/edit/:id" exact component={EditTodo} /> */}
        </Provider>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
