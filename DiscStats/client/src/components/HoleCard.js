import { Link } from "react-router-dom"
import { Card } from "reactstrap"

export const HoleCard = ({ hole, params, shotTotal }) => {

    return (
        <Link to={`/scorecards/${params.scorecardId}/${hole.id}/overview`} className="card-link">
            < Card className="bg-light">
                <h5 className="card-header"><strong>Hole {hole.number}</strong></h5>
                <div className="row w-100 py-3 card-body justify-content-between">
                    <p className="text-left pl-3"><strong>Par:</strong> {hole.par}</p>
                    <p className="text-left pr-3"><strong>Total shots:</strong> {shotTotal}</p>
                </div>
            </Card >
        </Link >
    )
}