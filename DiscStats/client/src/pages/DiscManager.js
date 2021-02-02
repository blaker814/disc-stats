import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { DiscCard } from "../components/DiscCard";
import { Button } from "reactstrap";
import useWindowDimensions from "../utils/getWindowDimensions";
import { useHistory } from "react-router-dom";

export const DiscManager = () => {
    const [discs, setDiscs] = useState([]);
    const { getToken } = useContext(UserContext);
    const { height, width } = useWindowDimensions();
    const history = useHistory();

    const currentUserId = JSON.parse(localStorage.getItem("user")).id;

    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/disc/${currentUserId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((parsedDiscs) => {
                    setDiscs(parsedDiscs);
                })
        );
    }, []);

    return (
        <div className="container mt-5">
            <h2>Discs</h2>
            <Button type="button"
                block={width >= 992 ? false : true}
                onClick={() => history.push("/discs/add")}
                color="danger">Add Disc</Button>
            <div className="row justify-content-center">
                {
                    discs.map(disc => {
                        return (
                            <div key={disc.id} className="m-4">
                                <DiscCard disc={disc} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};