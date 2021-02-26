import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { DiscCard } from "../components/DiscCard";
import { Button } from "reactstrap";
import useWindowDimensions from "../utils/getWindowDimensions";
import { useHistory } from "react-router-dom";
import { DiscFilter } from "../components/DiscFilter";

export const DiscManager = () => {
    const [discs, setDiscs] = useState([]);
    const [searchTerms, setSearchTerms] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { getToken } = useContext(UserContext);
    const { width } = useWindowDimensions();
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

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching friends
            const subset = discs.filter(disc => {
                return disc.name.toLowerCase().includes(searchTerms.toLowerCase())
            })
            setFiltered(subset);
            setIsLoading(false);
        } else {
            // If the search field is blank, display all user friends
            setFiltered(discs);
            setIsLoading(false);
        }
    }, [searchTerms, discs])

    return (
        <>
            <div className="container mb-5 pb-5">
                <div className="row">
                    <DiscFilter searchTerms={searchTerms} setSearchTerms={setSearchTerms} />
                </div>
                <h2>Discs</h2>
                <Button type="button"
                    block={width < 992}
                    disabled={isLoading}
                    onClick={() => history.push("/discs/add")}
                    color="danger">Add Disc</Button>
                <div className="row justify-content-center">
                    {
                        filtered.map(disc => {
                            return (
                                <div key={disc.id} className="m-4">
                                    <DiscCard disc={disc} isLoading={isLoading} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
};