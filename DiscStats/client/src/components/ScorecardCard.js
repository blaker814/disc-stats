import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import formatDate from "../utils/dateFormatter";
import { UserContext } from "../providers/UserProvider";

export const ScorecardCard = ({ scorecard, roundScores, setRoundScores }) => {
    const { getToken } = useContext(UserContext);
    const [scorecardShots, setScorecardShots] = useState([]);
    const [holes, setHoles] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/shot/scorecard/${scorecard.id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((parsedShots) => {
                    setScorecardShots(parsedShots);
                })
        );
    }, []);

    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/hole/course/${scorecard.courseId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setHoles(data);
                })
        );
    }, []);

    useEffect(() => {
        if (holes.length && scorecardShots.length) {
            findScore()
        }

    }, [holes, scorecardShots])

    useEffect(() => {
        if (roundScores) {
            setRoundScores([...roundScores, score])
        }
    }, [score])

    const findScore = () => {
        let totalPar = 0;
        holes.forEach(hole => totalPar = totalPar + hole.par);
        const totalScore = scorecardShots.length - totalPar;
        setScore(totalScore);
    }

    return (
        <Link to={`/scorecards/edit/${scorecard.id}`} className="card-link">
            <Card className="scorecard-card bg-light mobile-card">
                <h5 className="card-header"><strong>{scorecard.course.name}</strong></h5>
                <div className="col-12 py-3 card-body">
                    <p className="text-left ml-3"><strong>Date:</strong> {formatDate(scorecard.createDateTime)}</p>
                    <p className="text-left ml-3"><strong>Conditions:</strong> {scorecard.conditions.label}</p>
                    <p className="text-left ml-3"><strong>Score:</strong> {score < 0 ? score : score === 0 ? "E" : `+${score}`}</p>
                </div>
            </Card >
        </Link>
    );
};