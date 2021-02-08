import { Button } from "reactstrap";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import useWindowDimensions from "../utils/getWindowDimensions";

export const HoleDetails = () => {
    const [hole, setHole] = useState();
    const [shots, setShots] = useState([]);
    const [disc, setDisc] = useState();
    const [lastDrive, setLastDrive] = useState();
    const [shotType, setShotType] = useState();
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

    return (
        <div className="container mt-4">
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
                        <p className="text-left"><strong>Result:</strong> {lastDrive.qualityOfShot.label}</p>
                    </div>
                </>
            }
            <Button color="danger" className="mt-4" block={width < 992} onClick={() => history.push(`/scorecards/${params.scorecardId}/${params.holeId}/shot`)}>Start Hole</Button><br />
            <Button color="primary" block={width < 992} onClick={() => history.push(`/scorecards/${params.scorecardId}/overview`)}>Finish Round</Button>
        </div>
    );
}