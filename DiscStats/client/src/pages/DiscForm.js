import React, { useState, useEffect, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { UserContext } from "../providers/UserProvider";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const DiscForm = () => {
    const { getToken } = useContext(UserContext);
    const [discTypes, setDiscTypes] = useState([]);
    const [disc, setDisc] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const { discId } = useParams();
    const history = useHistory();
    const userId = JSON.parse(localStorage.getItem("user")).id;

    //get Disc
    const getDiscbyId = () => {
        getToken().then((token) =>
            fetch(`/api/disc/${discId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (res.status === 404) {
                        history.push("/");
                    }
                    return res.json();
                })
                .then((data) => {
                    setDisc(data.disc);
                })
        );
    };

    useEffect(() => {
        if (discId) {
            getDiscbyId();
            setIsLoading(false);
        } else {
            setIsLoading(false);
            setDisc({
                name: "",
                weight: 0,
                plastic: "",
                discTypeId: 0
            });
        }
    }, [discId]);

    useEffect(() => {
        getToken().then((token) =>
            fetch("/api/discType", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setDiscTypes(data);
                })
        );
    }, []);

    const addDisc = (disc) => {
        getToken().then((token) => {
            return fetch("/api/disc", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(disc),
            }).then(() => history.push("/discs"));
        });
    };

    const updateDisc = (disc) => {
        getToken().then((token) => {
            return fetch(`/api/disc/${disc.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(disc),
            }).then(() => history.push("/discs"));
        });
    };

    const handleControlledInputChange = (event) => {
        const newDisc = { ...disc };
        newDisc[event.target.name] = event.target.value;
        setDisc(newDisc);
    };

    const handleSubmit = (e) => {
        if (parseInt(disc.discTypeId) === 0) {
            e.preventDefault();
            toast.error("Enter a disc type", { position: "top:center" });
        } else {
            setIsLoading(true);
            if (discId) {
                e.preventDefault();
                updateDisc({
                    id: disc.id,
                    name: disc.name,
                    weight: disc.weight,
                    IsActive: true,
                    userId: parseInt(userId),
                    discTypeId: disc.discTypeId
                });
            } else {
                e.preventDefault();
                addDisc({
                    name: disc.name,
                    weight: disc.weight,
                    IsActive: true,
                    userId: parseInt(userId),
                    discTypeId: disc.discTypeId
                });
            }
        }
    };

    if (disc?.id) {
        if (disc?.userId !== parseInt(userId)) {
            return (
                <>
                    <h1>This is not your disc to edit</h1>
                    <Button>
                        <Link to={"/myDisc"}>Go Back</Link>
                    </Button>
                </>
            );
        }
    }

    return (
        <div className="container border border-dark mt-5">
            <Form className="p-5" onSubmit={handleSubmit}>
                {discId ? <h2>Edit Disc</h2> : <h2>Create A New Disc</h2>}
                <FormGroup className="form-group" row>
                    <Label for="name" sm={2}>
                        Name
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            id="discName"
                            name="name"
                            autoFocus
                            className="form-control"
                            onChange={handleControlledInputChange}
                            required="required"
                            defaultValue={disc?.name}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}>
                        Type
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="select"
                            name="discTypeId"
                            onChange={handleControlledInputChange}
                            required="required"
                            value={disc?.discTypeId}
                        >
                            <option value="0" hidden>Select a type</option>
                            {
                                discTypes.map((dt) => (
                                    <option value={dt.id} key={dt.id}>
                                        {dt.label}
                                    </option>
                                ))
                            }
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="content" sm={2}>
                        Plastic
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            name="plastic"
                            onChange={handleControlledInputChange}
                            defaultValue={disc?.plastic}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="content" sm={2}>
                        Weight
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="number"
                            name="weight"
                            onChange={handleControlledInputChange}
                            defaultValue={disc?.weight}
                        />
                    </Col>
                </FormGroup>
                <Button type="submit" disabled={isLoading}>
                    Submit
                </Button>
                <Button outline className="ml-4" type="button" disabled={isLoading}>
                    Cancel
                </Button>
            </Form>
        </div>
    );
};