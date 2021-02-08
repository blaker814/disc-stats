import { Link } from "react-router-dom"
import { Card } from "reactstrap"

export const HoleCard = ({ hole, params, strokes }) => {
    const score = strokes - hole.par;

    return (
        <Link to={`/scorecards/${params.scorecardId}/${hole.id}/overview`} className="card-link">
            < Card className="bg-light">
                <h5 className="card-header"><strong>Hole {hole.number}</strong></h5>
                <div className="row w-100 py-3 card-body justify-content-around">
                    {strokes > 0 && <p className="text-left"><strong>Score:</strong> {score < 0 ? score : score === 0 ? "E" : `+${score}`}</p>}
                    <p className="text-left"><strong>Par:</strong> {hole.par}</p>
                    <p className="text-left"><strong>Total strokes:</strong> {strokes > 0 ? strokes : "N/A"}</p>
                </div>
            </Card >
        </Link >
    )
}