import { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { HoleCard } from "../components/HoleCard";
import { UserContext } from "../providers/UserProvider";
import useWindowDimensions from "../utils/getWindowDimensions";

export const RoundOverview = () => {
    const [scorecard, setScorecard] = useState();
    const [holes, setHoles] = useState([]);
    const [shots, setShots] = useState([]);
    const params = useParams();
    const history = useHistory();
    const { width } = useWindowDimensions();
    const { getToken } = useContext(UserContext);

    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/scorecard/${params.scorecardId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((parsedScorecard) => {
                    setScorecard(parsedScorecard);
                })
        );
    }, []);

    useEffect(() => {
        if (scorecard) {
            getToken().then((token) =>
                fetch(`/api/hole/course/${scorecard.courseId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((res) => res.json())
                    .then((parsedHoles) => {
                        setHoles(parsedHoles);
                    }).then(() =>
                        fetch(`/api/shot/scorecard/${scorecard.id}`, {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                            .then((res) => res.json())
                            .then((parsedShots) => {
                                setShots(parsedShots);
                            })
                    )
            );
        }
    }, [scorecard]);

    return (
        <div className="container mt-4 mb-5">
            <h3>Round Overview</h3>
            <div>
                <p className="text-left"><strong>Course:</strong> {scorecard?.course.name}</p>
                <p className="text-left"><strong>Score:</strong> {shots.length}</p>
            </div>
            {shots.length &&
                holes.map(hole => {
                    let shotsForHole = shots.filter(shot => shot.holeId === hole.id);
                    return (
                        <div key={hole.id} className="m-4">
                            <HoleCard hole={hole} shotTotal={shotsForHole.length} params={params} />
                        </div>
                    )
                })
            }
            <Button color="danger" className="mt-4" block={width < 992} onClick={() => history.push(`/scorecards`)}>Submit Scorecard</Button><br />
            <Button color="dark" block={width < 992} onClick={() => history.push(`/scorecards/${params.scorecardId}/overview`)}>Delete Scorecard</Button>
        </div>
    )
}