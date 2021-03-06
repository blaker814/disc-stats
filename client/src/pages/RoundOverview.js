import { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { HoleCard } from "../components/HoleCard";
import { UserContext } from "../providers/UserProvider";
import useWindowDimensions from "../utils/getWindowDimensions";
import groupBy from "../utils/groupBy";

export const RoundOverview = () => {
    const [scorecard, setScorecard] = useState();
    const [holes, setHoles] = useState([]);
    const [shots, setShots] = useState([]);
    const [roundScore, setRoundScore] = useState(null);
    const [pendingDelete, setPendingDelete] = useState(false);
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

    useEffect(() => {
        if (shots.length) {
            const shotsPerHole = groupBy(shots, "holeId");
            let totalScoreForRound = 0;
            shotsPerHole.forEach(holeShots => {
                if (holeShots.length) {
                    const penaltyStrokes = holeShots.filter(shot => shot.qualityOfShotId === 4).length;
                    const strokesForHole = holeShots.length + penaltyStrokes;
                    totalScoreForRound = totalScoreForRound + strokesForHole - holeShots[0].hole.par;
                }
            })
            setRoundScore(totalScoreForRound);
        }

    }, [shots])

    const handleDelete = () => {
        getToken().then((token) =>
            fetch(`/api/scorecard/${params.scorecardId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(() => history.push("/scorecards"))
        );
        setPendingDelete(false);
    };

    return (
        <div className="container mt-4 mb-5 pb-5">
            <h3>Round Overview</h3>
            <div>
                <p className="text-left"><strong>Course:</strong> {scorecard?.course.name}</p>
                <p className="text-left"><strong>Total Score:</strong> {roundScore === null ? "N/A" : roundScore < 0 ? roundScore : roundScore === 0 ? "E" : `+${roundScore}`}</p>
            </div>
            <div className="row justify-content-center">
                {shots.length > 0 &&
                    holes.map(hole => {
                        let shotsForHole = shots.filter(shot => shot.holeId === hole.id);
                        let penaltyStrokesForHole = shotsForHole.filter(shot => shot.qualityOfShotId === 4).length;
                        let holeStrokes = shotsForHole.length + penaltyStrokesForHole;
                        return (
                            <div key={hole.id} className="m-4">
                                <HoleCard hole={hole} strokes={holeStrokes} params={params} />
                            </div>
                        )
                    })
                }
            </div>
            <Button color="danger" className="mt-3" block={width < 992} onClick={() => history.push(`/scorecards`)}>Save Round</Button><br />
            <Button color="dark" className="mt-3" block={width < 992} onClick={() => setPendingDelete(true)}>Delete Scorecard</Button>
            <Modal isOpen={pendingDelete}>
                <ModalHeader>Delete Scorecard?</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this scorecard? This action cannot be
                    undone.
                </ModalBody>
                <ModalFooter>
                    <Button outline onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
                    <Button color="dark" onClick={handleDelete}>
                        Yes, Delete
                </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}