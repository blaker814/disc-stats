import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { Home } from "../pages/Home";
import { CourseManager } from "../pages/CourseManager";
import { DiscManager } from "../pages/DiscManager";
import { ScorecardManager } from "../pages/ScorecardManager";
import { DiscForm } from "../pages/DiscForm";
import { CourseDetails } from "../pages/CourseDetails";
import { HoleDetails } from "../pages/HoleDetails";
import { ShotForm } from "../pages/ShotForm";
import { HoleOverview } from "../pages/HoleOverview";
import { RoundOverview } from "../pages/RoundOverview";

const ApplicationViews = () => {
    const { isLoggedIn } = useContext(UserContext);

    return (
        <Switch>
            <Route path="/" exact>
                {isLoggedIn ? <Home /> : <Redirect to="/login" />}
            </Route>
            <Route path="/courses" exact>
                {isLoggedIn ? <CourseManager /> : <Redirect to="/login" />}
            </Route>
            <Route path="/courses/:courseId(\d+)" exact>
                {isLoggedIn ? <CourseDetails /> : <Redirect to="/login" />}
            </Route>
            <Route path="/discs" exact>
                {isLoggedIn ? <DiscManager /> : <Redirect to="/login" />}
            </Route>
            <Route path="/discs/add" exact>
                {isLoggedIn ? <DiscForm /> : <Redirect to="/login" />}
            </Route>
            <Route path="/discs/edit/:discId(\d+)" exact>
                {isLoggedIn ? <DiscForm /> : <Redirect to="/login" />}
            </Route>
            <Route path="/scorecards" exact>
                {isLoggedIn ? <ScorecardManager /> : <Redirect to="/login" />}
            </Route>
            <Route path="/scorecards/courses" exact>
                {isLoggedIn ? <CourseManager /> : <Redirect to="/login" />}
            </Route>
            <Route path="/scorecards/courses/:courseId(\d+)" exact>
                {isLoggedIn ? <CourseDetails /> : <Redirect to="/login" />}
            </Route>
            <Route path="/scorecards/:scorecardId(\d+)/:holeId(\d+)" exact>
                {isLoggedIn ? <HoleDetails /> : <Redirect to="/login" />}
            </Route>
            <Route path="/scorecards/:scorecardId(\d+)/:holeId(\d+)/shot/:shotNum(\d+)" exact>
                {isLoggedIn ? <ShotForm /> : <Redirect to="/login" />}
            </Route>
            <Route path="/scorecards/:scorecardId(\d+)/:holeId(\d+)/:shotId(\d+)" exact>
                {isLoggedIn ? <ShotForm /> : <Redirect to="/login" />}
            </Route>
            <Route path="/scorecards/:scorecardId(\d+)/:holeId(\d+)/overview" exact>
                {isLoggedIn ? <HoleOverview /> : <Redirect to="/login" />}
            </Route>
            <Route path="/scorecards/:scorecardId(\d+)/overview" exact>
                {isLoggedIn ? <RoundOverview /> : <Redirect to="/login" />}
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