import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card } from "reactstrap";
import { UserContext } from "../providers/UserProvider";

export const CourseCard = ({ course }) => {
    const { getToken } = useContext(UserContext);
    const [timesPlayed, setTimesPlayed] = useState([]);
    const location = useLocation();

    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/scorecard/course/${course.id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setTimesPlayed(data);
                })
        );
    }, []);

    return (
        <Link to={`${location.pathname}/${course.id}`} className="card-link">
            <Card className="course-card bg-light mobile-card">
                <h5 className="card-header"><strong>{course.name}</strong></h5>
                <div className="col-12 py-3 card-body">
                    <p className="text-left no-wrap"><strong>Location:</strong> {course.location}</p>
                    <div className="mb-3 description" style={{ position: "relative" }}>
                        <p className="text-left line-clamp"><strong>Decription:</strong> {course.description}</p>
                    </div>
                    <p className="text-left "><strong>Times Played:</strong> {timesPlayed.length}</p>
                </div>
            </Card >
        </Link>
    );
};