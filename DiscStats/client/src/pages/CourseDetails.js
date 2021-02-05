import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import useWindowDimensions from "../utils/getWindowDimensions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import groupBy from "../utils/groupBy";
import { ScoreBar } from "../components/ScoreBar";

export const CourseDetails = () => {
    const [course, setCourse] = useState({});
    const [holes, setHoles] = useState([]);
    const [scorecards, setScorecards] = useState([]);
    const [shots, setShots] = useState([]);
    const [shotTotals, setShotTotals] = useState([]);
    const [allConditions, setAllConditions] = useState([]);
    const [conditionsId, setConditionsId] = useState(0);
    const [scoreBreakdown, setScoreBreakdown] = useState();
    const [par, setPar] = useState();
    const [distance, setDistance] = useState();
    const [average, setAverage] = useState();
    const [best, setBest] = useState();
    const { getToken } = useContext(UserContext);
    const { width } = useWindowDimensions();
    const location = useLocation();
    const params = useParams();
    const history = useHistory();

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
        getToken().then((token) =>
            fetch(`/api/conditions`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((parsedConditions) => {
                    setAllConditions(parsedConditions);
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
                            setShots([...shots, parsedShots]);
                            setShotTotals([...shotTotals, parsedShots.length]);
                        })
                );
            })
        }
    }, [scorecards]);

    useEffect(() => {
        if (shots.length) {
            const breakdown = {
                minus: 0,
                birdie: 0,
                par: 0,
                bogey: 0,
                double: 0,
                plus: 0
            };


            const groupByHoles = groupBy(shots, "holeId");
            groupByHoles.map(holeNum => {
                if (holeNum.length) {
                    let par = holeNum[0].hole.par;
                    switch (holeNum.length - par) {
                        case -4:
                            breakdown.minus = breakdown.minus + 1;
                            break;
                        case -3:
                            breakdown.minus = breakdown.minus + 1;
                            break;
                        case -2:
                            breakdown.minus = breakdown.minus + 1;
                            break;
                        case -1:
                            breakdown.birdie = breakdown.birdie + 1;
                            break;
                        case 0:
                            breakdown.par = breakdown.par + 1;
                            break;
                        case 1:
                            breakdown.bogey = breakdown.bogey + 1;
                            break;
                        case 2:
                            breakdown.double = breakdown.double + 1;
                            break;
                        default:
                            breakdown.plus = breakdown.plus + 1;
                            break;
                    }
                }
            })
            console.log(breakdown)
            setScoreBreakdown(breakdown)
        }

    }, [shots])

    useEffect(() => {
        if (shotTotals.length && (shotTotals.length === scorecards.length) && par) {
            const totalShots = shotTotals.reduce((acc, cur) => acc + cur);
            const roundAverage = totalShots / shotTotals.length;
            const totalAverage = Math.round(roundAverage - par);
            setAverage(totalAverage < 0 ? totalAverage : totalAverage === 0 ? "E" : `+${totalAverage}`)
            setBest(Math.min(shotTotals));
        }
    }, [shotTotals, par]);

    const addScorecard = (scorecard) => {
        getToken().then((token) =>
            fetch("/api/scorecard", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(scorecard),
            })
                .then(res => res.json())
                .then(data => history.push(`/scorecards/${data.id}/${holes.find(hole => hole.number === 1).id}`))
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseInt(conditionsId) === 0) {
            toast.error("Enter conditions", { position: "top:center" });
        } else {
            addScorecard({
                courseId: params.courseId,
                conditionsId: conditionsId,
                userId: parseInt(currentUserId)
            })
        }
    }

    return (
        <>
            <div className="row">
                <Link to={location.pathname.includes("scorecards") ? "/scorecards/courses" : "/courses"}
                    className="mt-4 ml-5 d-none d-md-flex"
                >
                    <FontAwesomeIcon size="lg" className="ml-2 text-secondary cancel" icon={faArrowLeft} />
                </Link>
            </div>
            <div className="container mt-4 mt-md-0">
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
                {scoreBreakdown && (
                    <div className="ml-n5" style={{ position: "relative", width: "95vw", height: "18em" }}>
                        <ScoreBar scoreBreakdown={scoreBreakdown} />
                    </div>
                )}
                {location.pathname.includes("scorecards") && (
                    <>
                        <Form className={width > 576 ? (width < 992 ? "my-4 mx-auto w-75" : "mt-4 mx-auto w-25") : "my-4 mx-3"}
                            onSubmit={handleSubmit}
                        >
                            <FormGroup row>
                                <Label>
                                    Current Conditions
                                </Label>
                                <Input
                                    type="select"
                                    name="conditionsId"
                                    onChange={(e) => setConditionsId(e.target.value)}
                                    required="required"
                                    value={conditionsId}
                                >
                                    <option value="0" hidden>Select conditions</option>
                                    {
                                        allConditions.map((c) => (
                                            <option value={c.id} key={c.id}>
                                                {c.label}
                                            </option>
                                        ))
                                    }
                                </Input>
                            </FormGroup>
                            <Button color="danger" type="submit" block={width < 992}>Start Round</Button>
                        </Form>
                    </>
                )}
            </div>
        </>
    );
}