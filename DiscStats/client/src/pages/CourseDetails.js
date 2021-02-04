import { Button } from "reactstrap";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import useWindowDimensions from "../utils/getWindowDimensions";
import { parse } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const CourseDetails = () => {
    const [course, setCourse] = useState({});
    const [holes, setHoles] = useState([]);
    const [scorecards, setScorecards] = useState([]);
    const [shots, setShots] = useState([])
    const [par, setPar] = useState();
    const [distance, setDistance] = useState();
    const [average, setAverage] = useState();
    const [best, setBest] = useState();
    const { getToken } = useContext(UserContext);
    const { width } = useWindowDimensions();
    const location = useLocation();
    const params = useParams();

    const currentUserId = JSON.parse(localStorage.getItem("user")).id;

    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/course/${params.courseId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((parsedCourse) => {
                    setCourse(parsedCourse);
                })
        );
    }, []);

    useEffect(() => {
        if (course.id) {
            getToken().then((token) =>
                fetch(`/api/hole/${params.courseId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((res) => res.json())
                    .then((parsedCourse) => {
                        setHoles(parsedCourse);
                    })
            );
        }
    }, [course]);

    useEffect(() => {
        if (course.id) {
            getToken().then((token) =>
                fetch(`/api/scorecard/course/${params.courseId}/${currentUserId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((res) => res.json())
                    .then((parsedScorecards) => {
                        setScorecards(parsedScorecards);
                    })
            );
        }
    }, [course]);

    useEffect(() => {
        if (holes.length) {
            const holePars = [];
            const holeLengths = [];
            holes.forEach(hole => {
                holePars.push(hole.par)
                holeLengths.push(hole.distance)
            });
            setPar(holePars.reduce((acc, cur) => acc + cur));
            setDistance(holeLengths.reduce((acc, cur) => acc + cur));
        }
    }, [holes]);

    useEffect(() => {
        if (scorecards.length) {
            scorecards.map(scorecard => {
                getToken().then((token) =>
                    fetch(`/api/shot/scorecard/${scorecard.id}`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then((res) => res.json())
                        .then((parsedShots) => {
                            setShots([...shots, parsedShots.length]);
                        })
                );
            })
        }
    }, [scorecards]);

    useEffect(() => {
        if (shots.length && (shots.length === scorecards.length) && par) {
            const totalShots = shots.reduce((acc, cur) => acc + cur);
            const roundAverage = totalShots / shots.length;
            const totalAverage = Math.round(roundAverage - par);
            setAverage(totalAverage < 0 ? totalAverage : totalAverage === 0 ? "E" : `+${totalAverage}`)
            setBest(Math.min(shots));
        }
    }, [shots, par])

    return (
        <>
            <div className="row">
                <Link to={location.pathname.includes("scorecards") ? "/scorecards/courses" : "/courses"}
                    className="mt-4 ml-5 d-none d-md-flex"
                >
                    <FontAwesomeIcon size="lg" className="ml-2 text-secondary cancel" icon={faArrowLeft} />
                </Link>
            </div>
            <div className="container mt-5">
                <h3>{course.name}</h3>
                <div>
                    <p className="text-left"><strong>Location:</strong> {course.location}</p>
                    <p className="text-left"><strong>Description:</strong> {course.description}</p>
                </div>
                <hr />
                <div className="row">
                    <p className="text-left col-4"><strong>Par:</strong> {par}</p>
                    <p className="text-left col-4"><strong>Distance:</strong> {distance}ft</p>
                    <p className="text-left col-4"><strong># of holes:</strong> {holes.length}</p>
                    <p className="text-left col-4"><strong>Times played:</strong> {scorecards.length}</p>
                    <p className="text-left col-4"><strong>Avg score:</strong> {scorecards.length ? average : "N/A"}</p>
                    <p className="text-left col-4"><strong>Best score:</strong> {scorecards.length ? best : "N/A"}</p>
                </div>
                <hr />
                {location.pathname.includes("scorecards") && (
                    <Button color="danger" block={width < 992}>Start Round</Button>
                )}
            </div>
        </>
    );
}