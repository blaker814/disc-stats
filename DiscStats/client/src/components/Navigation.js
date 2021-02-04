import React, { useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavLink,
    NavItem,
    NavbarText,
} from "reactstrap";
import { UserContext } from "../providers/UserProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTable, faFlag, faDotCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const tabs = [{
    route: "/",
    icon: faHome,
    label: "Home"
}, {
    route: "/scorecards",
    icon: faTable,
    label: "Scorecards"
}, {
    route: "/courses",
    icon: faFlag,
    label: "Courses"
}, {
    route: "/discs",
    icon: faDotCircle,
    label: "Discs"
}]

export const Navigation = () => {
    const { getCurrentUser, logout } = useContext(UserContext);
    const user = getCurrentUser();
    const history = useHistory();

    const logoutAndReturn = () => {
        return logout().then(() => {
            toast.dark("You are now logged out");
            history.push("/login");
        });
    };

    const location = useLocation();

    return (
        < div >
            {/* Top Bar*/}
            <Navbar className="navbar-dark fixed-top bg-primary d-flex justify-content-center justify-content-lg-start" expand="md">
                {(user && location.pathname.startsWith("/discs/")) && (
                    <Nav className="mr-auto d-flex d-md-none" navbar>
                        <NavItem>
                            <NavLink onClick={() => history.push("/discs")}>
                                Cancel
                            </NavLink>
                        </NavItem>
                    </Nav>
                )}
                {(user && location.pathname === "/scorecards/courses") && (
                    <Nav className="mr-auto d-flex d-md-none" navbar>
                        <NavItem>
                            <NavLink onClick={() => history.push("/scorecards")}>
                                Cancel
                            </NavLink>
                        </NavItem>
                    </Nav>
                )}
                {(user && location.pathname.includes("/courses/")) && (
                    <Nav className="mr-auto d-flex d-md-none" navbar>
                        <NavItem>
                            <NavLink onClick={() => {
                                location.pathname.startsWith("/scorecards") ?
                                    history.push("/scorecards/courses")
                                    : history.push("/courses")
                            }}>
                                Back
                            </NavLink>
                        </NavItem>
                    </Nav>
                )}
                <NavbarBrand tag={Link} to="/">
                    <img
                        id="header-logo"
                        src="/disc-logo.png"
                        width="30"
                        height="30"
                        className="mr-1"
                        alt="Disc Stats Logo"
                    />
                    Disc Stats
                </NavbarBrand>
                <Nav className="d-lg-flex d-none w-100" navbar>
                    {user ? (
                        <>
                            <NavItem>
                                <NavLink to="/scorecards" tag={Link}>
                                    Scorecards
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/courses" tag={Link}>
                                    Courses
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/discs" tag={Link}>
                                    Discs
                                </NavLink>
                            </NavItem>
                            <NavItem className="ml-auto">
                                <NavLink onClick={logoutAndReturn}>Logout</NavLink>
                            </NavItem>
                        </>
                    ) : (
                            <>
                                <NavItem>
                                    <NavLink to="/login" tag={Link}>
                                        Login
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/register" tag={Link}>
                                        Register
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                </Nav>
                {(user && location.pathname === "/") && (
                    <Nav className="ml-auto mr-3 d-lg-none d-flex" navbar>
                        <NavItem>
                            <NavLink onClick={logoutAndReturn}>
                                <div className="row d-flex flex-column justify-content-center align-items-center">
                                    <FontAwesomeIcon size="lg" icon={faSignOutAlt} />
                                    <div className="bottom-tab-label">Logout</div>
                                </div>
                            </NavLink>
                        </NavItem>
                    </Nav>
                )}
            </Navbar>

            {/* Bottom Tab Navigator*/}
            {user && (
                <Navbar className="fixed-bottom navbar-light bg-light d-block d-lg-none">
                    <Nav className="d-flex flex-row justify-content-around w-100" navbar>
                        {
                            tabs.map((tab, index) => (
                                <NavItem key={`tab-${index}`}>
                                    <NavLink to={tab.route} tag={Link}>
                                        <div className="row d-flex flex-column justify-content-center align-items-center">
                                            <FontAwesomeIcon size="lg" icon={tab.icon} />
                                            <div className="bottom-tab-label">{tab.label}</div>
                                        </div>
                                    </NavLink>
                                </NavItem>
                            ))
                        }
                    </Nav>
                </Navbar>
            )}
        </div >
    );
};