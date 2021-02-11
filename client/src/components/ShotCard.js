import { Link } from "react-router-dom"
import { Card } from "reactstrap"

export const ShotCard = ({ shot, shotNumber, params, hole }) => {

    return (
        <Link to={`/scorecards/${params.scorecardId}/${params.holeId}/${shot.id}`} className="card-link" onClick={() => localStorage.setItem("hole", hole.number)}>
            < Card className="bg-light shot-card">
                <h5 className="card-header"><strong>Shot {shotNumber}</strong></h5>
                <div className="row col-12 py-3 card-body">
                    <p className="text-left ml-3"><strong>Range:</strong> {shot.shotRange.label}</p>
                    <p className="text-left ml-3"><strong>Type:</strong> {shot.shotType.label}</p>
                    <p className="text-left ml-3"><strong>Selection:</strong> {shot.shotSelection.label}</p>
                    <p className="text-left ml-3"><strong>Disc:</strong> {shot.disc.name}</p>
                    <p className="text-left ml-3"><strong>Obstructed:</strong> {shot.isObstructed ? "Yes" : "No"}</p>
                    <p className="text-left ml-3"><strong>Quality:</strong> {shot.qualityOfShot.label}</p>
                </div>
            </Card >
        </Link >
    )
}