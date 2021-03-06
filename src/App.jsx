import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import Login from "./components/Login/Login";
import General from "./components/General/General";
import Registration from "./components/Registration/Registration";

import "antd/dist/antd.css";
import "./App.scss";

const App = () => {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));

  return (
    <div className="main_container">
      <Redirect from="" to="/general" />
      <Switch>
        <Route path="/register">
          <Registration setIsLogin={setIsLogin} />
        </Route>
        <Route path="/login">
          <Login setIsLogin={setIsLogin} />
        </Route>
        <Route path="/general">
          <General isLogin={isLogin} setIsLogin={setIsLogin} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
