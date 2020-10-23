import React from "react";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Home } from "./pages/home";
import { ForgotPassword } from "./pages/forgotPassword";
import { AuthRoute } from "./Components/util/Authroute";
import { PrivateRoute } from "./Components/util/PrivateRoute";

//MUI stuff

import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

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
import "./Components/Tutorial/tutorial.css";

//Context
import {
  ProjectsProvider,
  SelectedProjectProvider,
  AuthProvider,
} from "./Context/index";

const defaultMaterialTheme = createMuiTheme({
  overrides: {
    MuiPickersDay: {
      daySelected: {
        color: "white",
        backgroundColor: "#db4c3f",
        "&:hover": {
          backgroundColor: "#db4c3f",
        },
      },
      current: {
        color: "#db4c3f",
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={defaultMaterialTheme}>
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
    </ThemeProvider>
  );
}

export default App;
