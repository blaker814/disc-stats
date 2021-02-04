import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { CourseCard } from "../components/CourseCard";
import { Button } from "reactstrap";
import useWindowDimensions from "../utils/getWindowDimensions";
import { useHistory } from "react-router-dom";
import CourseSearch from "../components/CourseSearch";

export const CourseManager = () => {
    const [courses, setCourses] = useState([]);
    const { getToken } = useContext(UserContext);

    const currentUserId = JSON.parse(localStorage.getItem("user")).id;

    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/Course/${currentUserId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((parsedCourses) => {
                    setCourses(parsedCourses);
                })
        );
    }, []);

    return (
        <>
            <CourseSearch onSearch={setCourses} />
            <div className="container">
                <h2>Courses</h2>
                <div className="row justify-content-center">
                    {
                        courses.map(course => (
                            <div key={course.id} className="m-4">
                                <CourseCard course={course} userId={currentUserId} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};