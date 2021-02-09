import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useContext } from 'react';
import { Form, Input } from 'reactstrap';
import { UserContext } from "../providers/UserProvider";
import useWindowDimensions from "../utils/getWindowDimensions";

const CourseSearch = ({ onSearch }) => {
    const { getToken } = useContext(UserContext);
    const [searchTerms, setSearchTerms] = useState("");
    const { width } = useWindowDimensions();
    const currentUserId = JSON.parse(localStorage.getItem("user")).id;

    const handleSubmit = (e) => {
        e.preventDefault();
        getToken().then((token) =>
            fetch(`/api/course/${currentUserId}/search?q=${searchTerms}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}` // The token gets added to the Authorization header
                }
            })
                .then(res => res.json())
                .then(searchResults => onSearch(searchResults)));
        setSearchTerms("");
    }

    return (
        <Form className={width > 576 ? (width < 768 ? "input-group ml-auto mr-3 my-4 w-50" : "input-group mt-4 ml-auto mr-3 w-25") : "input-group my-4 mx-3"}
            onSubmit={handleSubmit}
        >
            <Input value={searchTerms}
                className="border-right-0"
                placeholder="Search for course"
                onChange={e => setSearchTerms(e.target.value)}
            />
            <span className="input-group-append">
                <div className="input-group-text bg-transparent border-left-0"><FontAwesomeIcon icon={faSearch} /></div>
            </span>
        </Form>
    );
};

export default CourseSearch;