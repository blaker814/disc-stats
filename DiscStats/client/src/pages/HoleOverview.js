import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { ShotCard } from "../components/ShotCard";
import { UserContext } from "../providers/UserProvider";
import useWindowDimensions from "../utils/getWindowDimensions";

export const HoleOverview = () => {
    const [hole, setHole] = useState([]);
    const [shots, setShots] = useState([]);
    const { getToken } = useContext(UserContext);
    const { width } = useWindowDimensions();
    const history = useHistory();
    const params = useParams();
    const location = useLocation();

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

    const handleAdd = () => {
        localStorage.setItem("hole", hole.number)
        history.push(`/scorecards/${params.scorecardId}/${parseInt(params.holeId)}/shot/${getTotalShots()}`)
    }

    const getTotalShots = () => {
        const thrownShots = shots.length;
        const penaltyStrokes = shots.filter(shot => shot.qualityOfShotId === 4).length
        return thrownShots + penaltyStrokes + 1;
    }

    return (
        <div className="container mt-4 mb-5">
            {location.pathname.includes("/overview/edit") &&
                <Link to={`/scorecards/${params.scorecardId}/overview`} className="row d-none d-md-flex">
                    <FontAwesomeIcon size="lg" className="mr-auto mt-1 ml-2 text-secondary cancel" icon={faArrowLeft} />
                </Link>
            }
            <h3 className="mt-3">Hole {hole.number} Overview</h3>
            <div>
                <p className="text-left"><strong>Total shots:</strong> {shots.length}</p>
                <p className="text-left"><strong>Penalty strokes:</strong> {shots.filter(shot => shot.qualityOfShotId === 4).length}</p>
            </div>
            <div className="row justify-content-center">
                {
                    shots.map((shot, i) => (
                        <div key={shot.id} className="m-4 w-100">
                            <ShotCard shot={shot} shotNumber={i + 1} hole={hole} params={params} />
                        </div>
                    ))
                }
            </div>
            <Button color="secondary" className="my-4" block={width < 768} onClick={handleAdd}>Add Shot</Button>
            <hr />
            {hole.number != 18 && <><Button color="danger" className="mt-3" block={width < 768} onClick={() => history.push(`/scorecards/${params.scorecardId}/${parseInt(params.holeId) + 1}`)}>Next Hole</Button><br /></>}
            <Button color="primary" block={width < 768} className="mt-3" onClick={() => history.push(`/scorecards/${params.scorecardId}/overview`)}>Finish Round</Button>
        </div>
    )
}