import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import { UserContext } from "../providers/UserProvider";

export const DiscCard = ({ disc }) => {
    const { getToken } = useContext(UserContext);
    const [discShots, setDiscShots] = useState([]);

    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/shot/disc/${disc.id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((parsedShots) => {
                    setDiscShots(parsedShots);
                })
        );
    }, [])

    return (
        <Link to={`/discs/edit/${disc.id}`} className="card-link">
            <Card className="disc-card bg-light mobile-card">
                <h5 className="card-header"><strong>{disc.name}</strong></h5>
                <div className="col-12 py-3 card-body">
                    <p className="text-justify mx-5"><strong>Weight:</strong> {disc.weight}g</p>
                    <p className="text-justify mx-5"><strong>Plastic:</strong> {disc.plastic}</p>
                    <p className="text-justify mx-5"><strong>Type:</strong> {disc.discType.label}</p>
                    <p className="text-justify mx-5"><strong>Shots recorded:</strong> {discShots.length}</p>
                </div>
            </Card >
        </Link>
    );
};