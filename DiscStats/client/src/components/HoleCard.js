import { Link } from "react-router-dom"
import { Card } from "reactstrap"

export const HoleCard = ({ hole, params, strokes }) => {
    const score = strokes - hole.par;

    return (
        <Link to={strokes > 0 ? `/scorecards/${params.scorecardId}/${hole.id}/overview/edit` : `/scorecards/${params.scorecardId}/${hole.id}`} className="card-link">
            <Card className="bg-light hole-card mobile-card">
                <h5 className="card-header"><strong>Hole {hole.number}</strong></h5>
                <div className="col-12 py-3 card-body">
                    {strokes > 0 && <p className="text-left ml-3"><strong>Score:</strong> {score < 0 ? score : score === 0 ? "E" : `+${score}`}</p>}
                    <p className="text-left ml-3"><strong>Par:</strong> {hole.par}</p>
                    <p className="text-left ml-3"><strong>Total strokes:</strong> {strokes > 0 ? strokes : "N/A"}</p>
                </div>
            </Card >
        </Link >
    )
}