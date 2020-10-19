import React from "react";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Home } from "./pages/home";
import { ForgotPassword } from "./pages/forgotPassword";
import { AuthRoute } from "./Components/util/Authroute";
import { PrivateRoute } from "./Components/util/PrivateRoute";

//React router
import { BrowserRouter as Router, Switch } from "react-router-dom";

//MUI pickers
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

//Stylesheets
import "./App.css";
import "./Components/layout/header.css";
import "./Components/layout/sidebar.css";
import "./Components/layout/content.css";
import "./Components/tasks/task.css";
import "./Components/tasks/addTask.css";
import "./Components/tasks/editTask.css";
import "./Components/layout/mobileNavigation.css";
import "./pages/authForm.css";

//Context
import {
  ProjectsProvider,
  SelectedProjectProvider,
  AuthProvider,
} from "./Context/index";

function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <AuthProvider>
        <SelectedProjectProvider>
          <ProjectsProvider>
            <Router>
              <Switch>
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/signup" component={Signup} />
                <AuthRoute
                  exact
                  path="/forgotpassword"
                  component={ForgotPassword}
                />
                <PrivateRoute exact path="/" component={Home} />
              </Switch>
            </Router>
          </ProjectsProvider>
        </SelectedProjectProvider>
      </AuthProvider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
