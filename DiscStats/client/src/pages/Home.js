import React, { useContext, useEffect, useState } from "react";
import { ScorecardCard } from "../components/ScorecardCard";
import { UserContext } from "../providers/UserProvider";
import groupBy from "../utils/groupBy"

export const Home = () => {
    const { getToken } = useContext(UserContext);
    const [scorecards, setScorecards] = useState([]);
    const [shots, setShots] = useState([]);
    const [roundScores, setRoundScores] = useState([]);
    const [scoreBreakdown, setScoreBreakdown] = useState({});

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
            fetch(`/api/scorecard/${currentUser.id}`, {
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
                condor: 0,
                albatross: 0,
                eagle: 0,
                birdie: 0,
                par: 0,
                bogey: 0,
                double: 0,
                plus: 0
            };
            groupByRound.map(holeNum => {
                holeNum.map(round => {
                    if (round) {
                        let par = round[0].hole.par;
                        switch (round.length - par) {
                            case -4:
                                breakdown.condor = breakdown.condor + 1;
                                break;
                            case -3:
                                breakdown.albatross = breakdown.albatross + 1;
                                break;
                            case -2:
                                breakdown.eagle = breakdown.eagle + 1;
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

    return (
        <div className="m-5">
            <h2>Welcome {currentUser.name}</h2>
            <div className="row justify-content-center">
                <p className="stat">Rounds played: {scorecards.length}</p>
                <p className="stat">Avg Score: {roundScores.length && roundScores.reduce((acc, cur) => acc + cur) / scorecards.length}</p>
            </div>
            <hr />
            {scoreBreakdown && <div>
                <p>Eagles or better: {scoreBreakdown.eagle + scoreBreakdown.albatross + scoreBreakdown.condor}</p>
                <p>Birdies: {scoreBreakdown.birdie}</p>
                <p>Pars: {scoreBreakdown.par}</p>
                <p>Bogeys: {scoreBreakdown.bogey}</p>
                <p>Doubles: {scoreBreakdown.double}</p>
                <p>Triples or worse: {scoreBreakdown.plus}</p>
            </div>}
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