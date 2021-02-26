import { Button } from "reactstrap";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import useWindowDimensions from "../utils/getWindowDimensions";
import groupBy from "../utils/groupBy";
import { ScoreBar } from "../components/ScoreBar";

export const HoleDetails = () => {
    const [hole, setHole] = useState();
    const [shots, setShots] = useState([]);
    const [disc, setDisc] = useState();
    const [lastDrive, setLastDrive] = useState();
    const [shotType, setShotType] = useState();
    const [scoreBreakdown, setScoreBreakdown] = useState();
    const { getToken } = useContext(UserContext);
    const { width } = useWindowDimensions();
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/hole/${params.holeId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((parsedHole) => {
                    setHole(parsedHole);
                })
        );
    }, []);

    useEffect(() => {
        if (hole) {
            getToken().then((token) =>
                fetch(`/api/shot/hole/${params.holeId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((res) => res.json())
                    .then((parsedShots) => {
                        setShots(parsedShots);
                    })
            );
        }
    }, [hole]);

    useEffect(() => {
        if (shots.length) {
            const drives = shots.filter(shot => shot.shotRangeId === 1);
            const discs = drives.map(drive => drive.disc);
            const shotTypes = drives.map(drive => drive.shotType)
            const mostUsedDisc = highestOccurence(discs);
            const mostUsedShotType = highestOccurence(shotTypes);
            const groupByRound = groupBy(shots, "scorecardId");
            const breakdown = {
                minus: 0,
                birdie: 0,
                par: 0,
                bogey: 0,
                double: 0,
                plus: 0
            };
            groupByRound.forEach(roundShots => {
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
            setScoreBreakdown(breakdown);
            setDisc(mostUsedDisc)
            setShotType(mostUsedShotType);
            setLastDrive(drives[0]);
        }
    }, [shots]);

    const highestOccurence = (arr) => {
        return arr.sort((a, b) =>
            arr.filter(x => x === a).length
            - arr.filter(x => x === b).length
        ).pop();
    }

    const handleStart = () => {
        localStorage.setItem('hole', hole.number);
        history.push(`/scorecards/${params.scorecardId}/${params.holeId}/shot/1`)
    }

    if (!hole?.id) {
        return (
            <div className="container my-5">
                <h1>Not Found</h1>
                <Button block={width < 768} color="secondary" className="mt-5">
                    <Link style={{ color: "white" }} to={"/scorecards"}>Go Back</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="mt-4 pb-5">
            <div className="container">
                {hole &&
                    <>
                        <h3>Hole {hole.number}</h3>
                        <div>
                            <p className="text-left"><strong>Par:</strong> {hole.par}</p>
                            <p className="text-left"><strong>Distance:</strong> {hole.distance}</p>
                        </div>
                    </>
                }
                {disc && shotType && lastDrive &&
                    <>
                        <div>
                            <p className="text-left"><strong>Most thrown disc:</strong> {disc.name}</p>
                            <p className="text-left"><strong>Most thrown shot:</strong> {shotType.label}</p>
                        </div>
                        <hr />
                        <div className="row">
                            <p className="text-left mx-3"><strong>Last throw:</strong> {lastDrive.disc.name} {lastDrive.shotType.label} {lastDrive.shotSelection.label}</p>
                            <p className="text-left mx-3"><strong>Result:</strong> {lastDrive.qualityOfShot.label}</p>
                        </div>
                        <hr />
                    </>
                }
            </div>
            {scoreBreakdown && (
                <div className="mx-0" style={{ position: "relative", width: "95vw", height: "18em" }}>
                    <ScoreBar scoreBreakdown={scoreBreakdown} />
                </div>
            )}
            <div className="container mb-4">
                <Button color="danger" className="mt-3" block={width < 992} onClick={handleStart}>Start Hole</Button><br />
                <Button color="primary" className="mt-3" block={width < 992} onClick={() => history.push(`/scorecards/${params.scorecardId}/overview`)}>Finish Round</Button>
            </div>
        </div>
    );
}