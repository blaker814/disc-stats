import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { ShotCard } from "../components/ShotCard";
import { UserContext } from "../providers/UserProvider";
import useWindowDimensions from "../utils/getWindowDimensions";

export const HoleOverview = () => {
    const [hole, setHole] = useState([]);
    const [shots, setShots] = useState([]);
    const [isHidden, setIsHidden] = useState(true);
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
                fetch(`/api/shot/hole/${params.holeId}/${params.scorecardId}`, {
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

    return (
        <div className="container mt-4 mb-5">
            <h3>Hole {hole.number} Overview</h3>
            <div>
                <p className="text-left"><strong>Total shots:</strong> {shots.length}</p>
                <p className="text-left"><strong>Penalty strokes:</strong> {shots.filter(shot => shot.outOfBounds).length}</p>
            </div>
            {
                shots.map((shot, i) => (
                    <div key={shot.id} className="m-4">
                        <ShotCard shot={shot} hidden={isHidden} shotNumber={i + 1} params={params} />
                    </div>
                ))
            }
            <Button color="danger" className="mt-4" block={width < 992} onClick={() => history.push(`/scorecards/${params.scorecardId}/${parseInt(params.holeId) + 1}`)}>Next Hole</Button><br />
            <Button color="primary" block={width < 992} onClick={() => history.push(`/scorecards/${params.scorecardId}/overview`)}>Finish Round</Button>
        </div>
    )
}