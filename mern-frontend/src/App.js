import "./App.css";
import { Route } from "react-router-dom";
import ViewTodos from "./components/ViewTodos";
import { Fragment } from "react";
import EditTodo from "./components/EditTodo";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        {/* <div className="text-center mb-5 mt-5">MERN STACK TODOS</div>
      <hr />
      <Route path="/" exact component={ViewTodos} />
      <Route path="/edit/:id" exact component={EditTodo} /> */}
      </Provider>
    </Fragment>
  );
}

export default App;
