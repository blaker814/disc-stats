import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import { UserContext } from "../providers/UserProvider";

export const CourseCard = ({ course, userId }) => {
    const { getToken } = useContext(UserContext);
    const [timesPlayed, setTimesPlayed] = useState([]);

    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/scorecard/course/${course.id}/${userId}`, {
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
        <Link to={`/courses/edit/${course.id}`} className="card-link">
            <Card className="course-card bg-light mobile-card">
                <h5 className="card-header"><strong>{course.name}</strong></h5>
                <div className="col-12 py-3 card-body">
                    <p className="text-justify mx-5"><strong>Location:</strong> {course.location}</p>
                    <p className="text-left mx-5"><strong>Decription:</strong> {course.description}</p>
                    <p className="text-justify mx-5"><strong>Times Played:</strong> {timesPlayed.length}</p>
                </div>
            </Card >
        </Link>
    );
};