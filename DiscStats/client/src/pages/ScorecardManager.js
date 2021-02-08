import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { ScorecardCard } from "../components/ScorecardCard";
import { Button } from "reactstrap";
import useWindowDimensions from "../utils/getWindowDimensions";
import { useHistory } from "react-router-dom";

export const ScorecardManager = () => {
    const [scorecards, setScorecards] = useState([]);
    const { getToken } = useContext(UserContext);
    const { width } = useWindowDimensions();
    const history = useHistory();

    const currentUserId = JSON.parse(localStorage.getItem("user")).id;

    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/scorecard/user/${currentUserId}`, {
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

    return (
        <div className="container mt-5">
            <h2>Scorecards</h2>
            <Button type="button"
                block={width < 992}
                onClick={() => history.push("/scorecards/courses")}
                color="danger">New Scorecard</Button>
            <div className="row justify-content-center">
                {
                    scorecards.map(scorecard => {
                        return (
                            <div key={scorecard.id} className="m-4">
                                <ScorecardCard scorecard={scorecard} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};