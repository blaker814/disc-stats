import { Button } from "reactstrap";
import { useEffect, useState, useContext } from "react";
import { Input, Label, FormGroup, Modal, ModalBody, ModalHeader, ModalFooter, Form } from "reactstrap";
import { UserContext } from "../providers/UserProvider";
import useWindowDimensions from "../utils/getWindowDimensions";
import { Link, useHistory, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export const ShotForm = () => {
    const [shotRanges, setShotRanges] = useState([]);
    const [shotTypes, setShotTypes] = useState([]);
    const [shot, setShot] = useState({});
    const [shotSelections, setShotSelections] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [discs, setDiscs] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const { getToken } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [pendingDelete, setPendingDelete] = useState(false);
    const params = useParams();

    const { width } = useWindowDimensions();
    const history = useHistory();
    const userId = JSON.parse(localStorage.getItem("user")).id;

    const getShotById = () => {
        getToken().then((token) =>
            fetch(`/api/shot/${params.shotId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (res.status === 404) {
                        toast.error("That's not your shot");
                        history.push("/scorecards");
                    }
                    return res.json();
                })
                .then((data) => {
                    setIsChecked(data.isObstructed)
                    setShot(data);
                })
        );
    };

    useEffect(() => {
        if (params.shotId) {
            getShotById();
            setIsLoading(false);
        } else {
            setShot({
                qualityOfShotId: 0,
                discId: 0,
                shotRangeId: 0,
                shotTypeId: 0,
                shotSelectionId: 0,
                isObstructed: false
            });
            setIsLoading(false);
        }
    }, [params.shotId]);

    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/shotRange`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setShotRanges(data);
                })
                .then(() =>
                    fetch(`/api/shotType`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            setShotTypes(data);
                        }))
                .then(() =>
                    fetch(`/api/shotSelection`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            setShotSelections(data);
                        }))
                .then(() =>
                    fetch(`/api/qualityOfShot`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            setQualities(data);
                        }))
                .then(() =>
                    fetch(`/api/disc/${userId}`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            setDiscs(data);
                        }))
        );
    }, []);

    const addShot = (shot, holeComplete) => {
        getToken().then((token) => {
            return fetch("/api/shot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(shot),
            })
                .then(() => {
                    if (holeComplete) {
                        history.push(`/scorecards/${params.scorecardId}/${params.holeId}/overview`)
                    } else {
                        const shotNumber = shot.qualityOfShotId === "4" ? parseInt(params.shotNum) + 2 : parseInt(params.shotNum) + 1;
                        history.push(`/scorecards/${params.scorecardId}/${params.holeId}/shot/${shotNumber}`)
                        setShot({
                            qualityOfShotId: 0,
                            discId: 0,
                            shotRangeId: 0,
                            shotTypeId: 0,
                            shotSelectionId: 0,
                            isObstructed: false
                        });
                        setIsLoading(false);
                    }
                })
        });
    };

    const updateShot = (shot) => {
        getToken().then((token) => {
            return fetch(`/api/shot/${shot.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(shot),
            })
                .then(() => history.push(`/scorecards/${params.scorecardId}/${params.holeId}/overview`))
        });
    };

    const handleControlledInputChange = (event) => {
        const newShot = { ...shot };
        newShot[event.target.name] = event.target.value;
        setShot(newShot);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseInt(shot.shotTypeId) === 0 || parseInt(shot.shotRangeId) === 0 || parseInt(shot.shotSelectionId) === 0 || parseInt(shot.QualityOfShotId) === 0 || parseInt(shot.DiscId) === 0) {
            toast.error("Enter a choice for all fields", { position: "top:center" });
        } else {
            setIsLoading(true);
            if (params.shotId) {
                updateShot({
                    id: shot.id,
                    scorecardId: params.scorecardId,
                    userId: parseInt(userId),
                    holeId: params.holeId,
                    qualityOfShotId: shot.qualityOfShotId,
                    discId: shot.discId,
                    shotRangeId: shot.shotRangeId,
                    shotTypeId: shot.shotTypeId,
                    shotSelectionId: shot.shotSelectionId,
                    isObstructed: isChecked
                })
            } else {
                addShot({
                    scorecardId: params.scorecardId,
                    userId: parseInt(userId),
                    holeId: params.holeId,
                    qualityOfShotId: shot.qualityOfShotId,
                    discId: shot.discId,
                    shotRangeId: shot.shotRangeId,
                    shotTypeId: shot.shotTypeId,
                    shotSelectionId: shot.shotSelectionId,
                    isObstructed: isChecked
                }, false)
            }
        }
    };

    const handleCompleteHole = (e) => {
        e.preventDefault();
        if (parseInt(shot.shotTypeId) === 0 || parseInt(shot.shotRangeId) === 0 || parseInt(shot.shotSelectionId) === 0 || parseInt(shot.QualityOfShotId) === 0 || parseInt(shot.DiscId) === 0) {
            toast.error("Enter a choice for all fields", { position: "top:center" });
        } else {
            setIsLoading(true);
            addShot({
                scorecardId: params.scorecardId,
                userId: parseInt(userId),
                holeId: params.holeId,
                qualityOfShotId: shot.qualityOfShotId,
                discId: shot.discId,
                shotRangeId: shot.shotRangeId,
                shotTypeId: shot.shotTypeId,
                shotSelectionId: shot.shotSelectionId,
                isObstructed: isChecked
            }, true)
        }
    }

    const handleDelete = () => {
        getToken().then((token) =>
            fetch(`/api/shot/${shot.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(() => history.push(`/scorecards/${params.scorecardId}/${params.holeId}/overview`))
        );
        setPendingDelete(false);
    };

    if (shot?.id) {
        if (shot?.userId !== parseInt(userId)) {
            return (
                <>
                    <h1>This is not your shot to edit</h1>
                    <Button>
                        <Link to={"/scorecards"}>Go Back</Link>
                    </Button>
                </>
            );
        }
    }

    return (
        <div className={width < 768 ? "container my-5 pb-5" : "container border border-dark my-5 bg-light"} style={{ minWidth: "20em", maxWidth: "25em" }}>
            <Link to={params.shotId ? `/scorecards/${params.scorecardId}/${params.holeId}/overview` : `/scorecards/${params.scorecardId}/${params.holeId}`} className="row d-none d-md-flex" disabled={isLoading}>
                <FontAwesomeIcon size="lg" className="ml-auto mt-1 mr-2 text-secondary cancel" icon={faTimes} />
            </Link>
            <Form className="p-5 mt-n5" onSubmit={handleSubmit}>
                <h2 className={!params.shotId && "mt-3"}>Hole {JSON.parse(localStorage.getItem("hole"))}</h2>
                {params.shotId ? <h4>Edit Shot</h4> : <h4>Shot {params.shotNum}</h4>}
                <FormGroup row>
                    <Label>
                        Range
                    </Label>
                    <Input
                        type="select"
                        name="shotRangeId"
                        onChange={handleControlledInputChange}
                        required="required"
                        value={shot?.shotRangeId}
                    >
                        <option value="0" hidden>Shot range</option>
                        {
                            shotRanges.map((sr) => (
                                <option value={sr.id} key={sr.id}>
                                    {sr.label}
                                </option>
                            ))
                        }
                    </Input>
                </FormGroup>
                <FormGroup row>
                    <Label>
                        Type
                    </Label>
                    <Input
                        type="select"
                        name="shotTypeId"
                        onChange={handleControlledInputChange}
                        required="required"
                        value={shot?.shotTypeId}
                    >
                        <option value="0" hidden>Shot type</option>
                        {
                            shotTypes.map((st) => (
                                <option value={st.id} key={st.id}>
                                    {st.label}
                                </option>
                            ))
                        }
                    </Input>
                </FormGroup>
                <FormGroup row>
                    <Label>
                        Selection
                    </Label>
                    <Input
                        type="select"
                        name="shotSelectionId"
                        onChange={handleControlledInputChange}
                        required="required"
                        value={shot?.shotSelectionId}
                    >
                        <option value="0" hidden>Shot selection</option>
                        {
                            shotSelections.map((ss) => (
                                <option value={ss.id} key={ss.id}>
                                    {ss.label}
                                </option>
                            ))
                        }
                    </Input>
                </FormGroup>
                <FormGroup row>
                    <Label>
                        Disc
                    </Label>
                    <Input
                        type="select"
                        name="discId"
                        onChange={handleControlledInputChange}
                        required="required"
                        value={shot?.discId}
                    >
                        <option value="0" hidden>Select a disc</option>
                        {
                            discs.map((d) => (
                                <option value={d.id} key={d.id}>
                                    {d.name}
                                </option>
                            ))
                        }
                    </Input>
                </FormGroup>
                <FormGroup row>
                    <Label>
                        Quality of Shot
                    </Label>
                    <Input
                        type="select"
                        name="qualityOfShotId"
                        onChange={handleControlledInputChange}
                        required="required"
                        value={shot?.qualityOfShotId}
                    >
                        <option value="0" hidden>Quality of shot</option>
                        {
                            qualities.map((q) => (
                                <option value={q.id} key={q.id}>
                                    {q.label}
                                </option>
                            ))
                        }
                    </Input>
                </FormGroup>
                <FormGroup check className="text-left my-4">
                    <Label check htmlFor="isObstructed">
                        <Input type="checkbox" name="isObstructed" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />{' '}
                    Obstructed?
                    </Label>
                </FormGroup>
                <Button block
                    type="submit"
                    className="mt-3"
                    color={params.shotId ? "danger" : "primary"}
                    disabled={isLoading}
                    onClick={handleSubmit}
                >
                    {params.shotId ? "Save" : "Next Shot"}
                </Button><br />
                {!params.shotId &&
                    <>
                        <Button block
                            type="submit"
                            className="mt-3"
                            color="danger"
                            disabled={isLoading}
                            onClick={handleCompleteHole}
                        >
                            Complete Hole
                    </Button><br />
                    </>
                }
                {params.shotNum !== 1 &&
                    <Button block
                        onClick={(e) => setPendingDelete(true)}
                        className="mt-3"
                        color="dark"
                        disabled={isLoading}
                    >
                        Delete
                    </Button>
                }
            </Form>
            <Modal isOpen={pendingDelete}>
                <ModalHeader>Delete Shot?</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this shot? This action cannot be
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
}