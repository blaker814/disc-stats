import React, { useContext, useEffect, useState } from "react";
import { ScoreBar } from "../components/ScoreBar";
import { ScorecardCard } from "../components/ScorecardCard";
import { UserContext } from "../providers/UserProvider";
import groupBy from "../utils/groupBy"

export const Home = () => {
    const { getToken } = useContext(UserContext);
    const [scorecards, setScorecards] = useState([]);
    const [shots, setShots] = useState([]);
    const [roundScores, setRoundScores] = useState([]);
    const [scoreBreakdown, setScoreBreakdown] = useState();
    const [average, setAverage] = useState();

    const currentUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/shot/user/${currentUser.id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setShots(data);
                })
        );
    }, []);

    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/scorecard/user/${currentUser.id}`, {
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
    }, []);

    useEffect(() => {
        if (shots.length) {
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
            groupByRound.forEach(holeNum => {
                holeNum.forEach(roundShots => {
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
    }, [shots]);

    useEffect(() => {
        if (roundScores.length) {
            const averageScore = Math.round(roundScores.reduce((acc, cur) => acc + cur) / scorecards.length);
            setAverage(averageScore);
        }
    }, [roundScores])

    return (
        <div className="m-5">
            <h3>Welcome {currentUser.name}</h3>
            <div className="row justify-content-center">
                <p className="stat">Rounds played: {scorecards.length}</p>
                <p className="stat">Avg Score: {average < 0 ? average : average === 0 ? "E" : `+${average}`}</p>
            </div>
            {scoreBreakdown && (
                <div className="ml-n5" style={{ position: "relative", width: "95vw", height: "18em" }}>
                    <ScoreBar scoreBreakdown={scoreBreakdown} />
                </div>
            )}
            <hr />
            <h4>Recent Rounds</h4>
            <div className="row justify-content-center">
                {scorecards.slice(0, 3).map(sc => {
                    return (
                        <div key={sc.id} className="m-4">
                            <ScorecardCard scorecard={sc} roundScores={roundScores} setRoundScores={setRoundScores} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
};