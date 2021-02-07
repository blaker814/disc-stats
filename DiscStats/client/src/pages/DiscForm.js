import React, { useState, useEffect, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, ModalBody, ModalFooter, Modal, ModalHeader } from "reactstrap";
import { UserContext } from "../providers/UserProvider";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useWindowDimensions from "../utils/getWindowDimensions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const DiscForm = () => {
    const { getToken } = useContext(UserContext);
    const [discTypes, setDiscTypes] = useState([]);
    const [disc, setDisc] = useState({});
    const [pendingDelete, setPendingDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { width } = useWindowDimensions();

    const { discId } = useParams();
    const history = useHistory();
    const userId = JSON.parse(localStorage.getItem("user")).id;

    //get Disc
    const getDiscById = () => {
        getToken().then((token) =>
            fetch(`/api/disc/edit/${discId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (res.status === 404) {
                        toast.error("That's not your disc");
                        history.push("/discs");
                    }
                    return res.json();
                })
                .then((data) => {
                    setDisc(data);
                })
        );
    };

    useEffect(() => {
        if (discId) {
            getDiscById();
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
        e.preventDefault();
        if (parseInt(disc.discTypeId) === 0) {
            toast.error("Enter a disc type", { position: "top:center" });
        } else {
            setIsLoading(true);
            if (discId) {
                updateDisc({
                    id: disc.id,
                    name: disc.name,
                    weight: disc.weight,
                    plastic: disc.plastic,
                    IsActive: true,
                    userId: parseInt(userId),
                    discTypeId: disc.discTypeId
                });
            } else {
                addDisc({
                    name: disc.name,
                    weight: disc.weight,
                    plastic: disc.plastic,
                    IsActive: true,
                    userId: parseInt(userId),
                    discTypeId: disc.discTypeId
                });
            }
        }
    };

    const handleDelete = () => {
        getToken().then((token) =>
            fetch(`/api/disc/${disc.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(() => history.push("/discs"))
        );
        setPendingDelete(false);
    };

    if (disc?.id) {
        if (disc?.userId !== parseInt(userId)) {
            return (
                <>
                    <h1>This is not your disc to edit</h1>
                    <Button>
                        <Link to={"/discs"}>Go Back</Link>
                    </Button>
                </>
            );
        }
    }

    return (
        <div className={width < 768 ? "container my-5" : "container border border-dark my-5 bg-light"} style={{ minWidth: "20em", maxWidth: "25em" }}>
            <Link to={"/discs"} className="row d-none d-md-flex" disabled={isLoading}>
                <FontAwesomeIcon size="lg" className="ml-auto mt-1 mr-2 text-secondary cancel" icon={faTimes} />
            </Link>
            <Form className="p-5 mt-n5" onSubmit={handleSubmit}>
                {discId ? <h2>Edit Disc</h2> : <h2>Add Disc</h2>}
                <FormGroup row>
                    <Label for="name">
                        Name
                    </Label>
                    <Input
                        type="text"
                        id="discName"
                        name="name"
                        autoFocus
                        placeholder="Name"
                        className="form-control"
                        onChange={handleControlledInputChange}
                        required="required"
                        defaultValue={disc?.name}
                    />
                </FormGroup>
                <FormGroup row>
                    <Label>
                        Type
                    </Label>
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
                </FormGroup>
                <FormGroup row>
                    <Label for="content">
                        Plastic
                    </Label>
                    <Input
                        type="text"
                        name="plastic"
                        placeholder="Plastic"
                        onChange={handleControlledInputChange}
                        defaultValue={disc?.plastic}
                    />
                </FormGroup>
                <FormGroup row>
                    <Label for="content">
                        Weight
                    </Label>
                    <Input
                        type="number"
                        name="weight"
                        onChange={handleControlledInputChange}
                        defaultValue={disc?.weight}
                    />
                </FormGroup>
                <Button block={width < 992} type="submit" className="mt-4 mr-3" color="danger" disabled={isLoading}>
                    {discId ? "Save" : "Submit"}
                </Button>
                {discId && (
                    <Button block={width < 992}
                        onClick={(e) => setPendingDelete(true)}
                        className="mt-4"
                        color="dark"
                        disabled={isLoading}
                    >
                        Delete
                    </Button>
                )}
            </Form>
            <Modal isOpen={pendingDelete}>
                <ModalHeader>Delete {disc.name}?</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this disc? This action cannot be
                    undone.
                </ModalBody>
                <ModalFooter>
                    <Button outline onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
                    <Button color="dark" onClick={handleDelete}>
                        Yes, Delete
                </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};