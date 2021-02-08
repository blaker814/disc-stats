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
    const [isComplete, setIsComplete] = useState(false);

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
        if (score && roundScores) {
            setRoundScores([...roundScores, score])
        }
    }, [score])

    const findScore = () => {
        let totalScore = 0;
        let playedAllHoles = holes.every(hole => {
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
            return shotsForHole.length > 0;
        });
        setIsComplete(playedAllHoles);
        setScore(totalScore);
    }

    return (
        <Link to={`/scorecards/${scorecard.id}/overview`} className="card-link">
            <Card className="scorecard-card bg-light mobile-card">
                <h5 className="card-header"><strong>{scorecard.course.name}</strong></h5>
                <div className="col-12 py-3 card-body">
                    <p className="text-left ml-3"><strong>Date:</strong> {formatDate(scorecard.createDateTime)}</p>
                    <p className="text-left ml-3"><strong>Conditions:</strong> {scorecard.conditions.label}</p>
                    <p className="text-left ml-3"><strong>Score:</strong> {score < 0 ? score : score === 0 ? "E" : `+${score}`} {!isComplete && "(Partial)"}</p>
                </div>
            </Card >
        </Link>
    );
};