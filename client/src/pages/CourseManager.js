import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { CourseCard } from "../components/CourseCard";
import { Link, useLocation } from "react-router-dom";
import CourseSearch from "../components/CourseSearch";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CourseManager = () => {
    const [courses, setCourses] = useState([]);
    const { getToken } = useContext(UserContext);
    const location = useLocation();

    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/course`, {
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
            <div className="container mb-5 pb-5">
                <div className="row">
                    {location.pathname.includes("scorecards") && (
                        <Link to={"/scorecards"} className="mt-4 ml-5 d-none d-md-flex">
                            <FontAwesomeIcon size="lg" className="ml-2 text-secondary cancel" icon={faArrowLeft} />
                        </Link>
                    )}
                    <CourseSearch onSearch={setCourses} />
                </div>
                <h2>{location.pathname.includes("scorecards") ? "Choose Course" : "Courses"}</h2>
                <div className="row justify-content-center">
                    {courses.length ?
                        courses.map(course => (
                            <div key={course.id} className="m-4">
                                <CourseCard course={course} />
                            </div>
                        ))
                        :
                        <div className="m-4">
                            <p>No results found</p>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};