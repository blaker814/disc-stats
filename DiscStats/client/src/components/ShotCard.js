import { Link } from "react-router-dom"
import { Card } from "reactstrap"

export const ShotCard = ({ shot, shotNumber, params }) => {
    return (
        <Link to={`/scorecards/${params.scorecardId}/${params.holeId}/${shot.id}`} className="card-link">
            < Card className="bg-light">
                <h5 className="card-header"><strong>Shot {shotNumber}</strong></h5>
                <div className="row w-100 py-3 card-body">
                    <p className="text-left col-4"><strong>Range:</strong> {shot.shotRange.label}</p>
                    <p className="text-left col-4"><strong>Type:</strong> {shot.shotType.label}</p>
                    <p className="text-left col-4"><strong>Selection:</strong> {shot.shotSelection.label}</p>
                    <p className="text-left col-4"><strong>Disc:</strong> {shot.disc.name}</p>
                    <p className="text-left col-4"><strong>Obstructed:</strong> {shot.isObstructed ? "Yes" : "No"}</p>
                    <p className="text-left col-4"><strong>Quality:</strong> {shot.qualityOfShot.label}</p>
                </div>
            </Card >
        </Link >
    )
}