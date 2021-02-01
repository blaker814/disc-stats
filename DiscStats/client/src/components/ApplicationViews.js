import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { Home } from "../pages/Home";
import { Course } from "../pages/Course";
import { Disc } from "../pages/Disc";
import { Scorecard } from "../pages/Scorecard";

const ApplicationViews = () => {
    const { isLoggedIn } = useContext(UserContext);

    return (
        <Switch>
            <Route path="/" exact>
                {isLoggedIn ? <Home /> : <Redirect to="/login" />}
            </Route>
            <Route path="/courses" exact>
                {isLoggedIn ? <Course /> : <Redirect to="/login" />}
            </Route>
            <Route path="/discs" exact>
                {isLoggedIn ? <Disc /> : <Redirect to="/login" />}
            </Route>
            <Route path="/scorecards" exact>
                {isLoggedIn ? <Scorecard /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
        </Switch>
    );
};

export default ApplicationViews;