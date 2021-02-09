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
    const [allConditions, setAllConditions] = useState([]);
    const [conditionsId, setConditionsId] = useState(0);
    const [par, setPar] = useState();
    const [scores, setScores] = useState([]);
    const [distance, setDistance] = useState();
    const [average, setAverage] = useState();
    const [best, setBest] = useState();
    const [scoreBreakdown, setScoreBreakdown] = useState();
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
                .then(() => {
                    return fetch(`/api/conditions`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then((res) => res.json())
                        .then((parsedConditions) => {
                            setAllConditions(parsedConditions);
                        })
                })
        );
    }, []);

    useEffect(() => {
        if (course.id) {
            getToken().then((token) =>
                fetch(`/api/shot/course/${course.id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((res) => res.json())
                    .then((parsedShots) => {
                        setShots(parsedShots);
                    })
                    .then(() => {
                        return fetch(`/api/scorecard/course/${params.courseId}/${currentUserId}`, {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                            .then((res) => res.json())
                            .then((parsedScorecards) => {
                                setScorecards(parsedScorecards);
                            })
                    })
                    .then(() => {
                        return fetch(`/api/hole/course/${params.courseId}`, {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                            .then((res) => res.json())
                            .then((parsedHoles) => {
                                setHoles(parsedHoles);
                            })
                    })
            )
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
        if (shots.length && holes.length && !scores.length) {
            const shotsPerScorecard = groupBy(shots, "scorecardId")
            const roundScores = shotsPerScorecard.map(scorecardShots => {
                if (scorecardShots) {
                    return findScore(scorecardShots)
                }
                return null
            })
            const filteredScores = roundScores.filter(rs => rs !== null)
            setScores(filteredScores);
        }
    }, [shots, holes]);

    useEffect(() => {
        if (scores.length && scores.length === scorecards.length) {
            const totalAverage = Math.round(scores.reduce((acc, cur) => acc + cur) / scores.length);
            const bestScore = Math.min(...scores)
            setAverage(totalAverage < 0 ? totalAverage : totalAverage === 0 ? "E" : `+${totalAverage}`)
            setBest(bestScore < 0 ? bestScore : bestScore === 0 ? "E" : `+${bestScore}`);
        }
    }, [scores]);

    useEffect(() => {
        if (shots.length && best) {
            const groupByHoles = groupBy(shots, "holeId");
            const groupByRound = groupByHoles.map(hole => groupBy(hole, "scorecardId"));
            const breakdown = {
                minus: 0,
                birdie: 0,
                par: 0,
                bogey: 0,
                double: 0,
                plus: 0
            };
            groupByRound.map(holeNum => {
                holeNum.map(roundShots => {
                    if (roundShots) {
                        let par = roundShots[0].hole.par;
                        let penaltyStrokes = roundShots.filter(shot => shot.qualityOfShotId === 4).length;
                        switch (roundShots.length + penaltyStrokes - par) {
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
            })
            setScoreBreakdown(breakdown);
        }

    }, [shots, best])

    const findScore = (scorecardShots) => {
        let totalScore = 0;
        holes.forEach(hole => {
            let shotsForHole = scorecardShots.filter(ss => ss.holeId === hole.id)
            if (shotsForHole.length) {
                let penaltyStrokes = 0;
                shotsForHole.forEach(shot => {
                    if (shot.qualityOfShotId === 4) {
                        penaltyStrokes = penaltyStrokes + 1
                    }
                })
                let holeScore = shotsForHole.length + penaltyStrokes - hole.par;
                totalScore = totalScore + holeScore;
            }
        });
        return totalScore;
    }

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
            <div className="mt-4 mt-md-0">
                <div className="container">
                    <div className="row">
                        <Link to={location.pathname.includes("scorecards") ? "/scorecards/courses" : "/courses"}
                            className="mt-4  d-none d-md-flex"
                        >
                            <FontAwesomeIcon size="lg" className="ml-2 text-secondary cancel" icon={faArrowLeft} />
                        </Link>
                    </div>
                    <h3>{course.name}</h3>
                    <div>
                        <p className="text-left"><strong>Location:</strong> {course.location}</p>
                        <p className="text-left"><strong>Description:</strong> {course.description}</p>
                    </div>
                    <hr />
                    <div className="row mr-1 justify-content-between">
                        <p className="text-left ml-3"><strong>Par:</strong> {par}</p>
                        <p className="text-left ml-3"><strong>Distance:</strong> {distance}ft</p>
                        <p className="text-left ml-3"><strong># of holes:</strong> {holes.length}</p>
                        <p className="text-left ml-3"><strong>Times played:</strong> {scorecards.length}</p>
                        <p className="text-left ml-3"><strong>Avg score:</strong> {scorecards.length ? average : "N/A"}</p>
                        <p className="text-left ml-3"><strong>Best score:</strong> {scorecards.length ? best : "N/A"}</p>
                    </div>
                    <hr />
                </div>
                {scoreBreakdown && (
                    <div className="mx-0 my-3" style={{ position: "relative", width: "95vw", height: "18em" }}>
                        <ScoreBar scoreBreakdown={scoreBreakdown} />
                    </div>
                )}
                {location.pathname.includes("scorecards") && (
                    <div className="container">
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
                    </div>
                )}
            </div>
        </>
    );
}