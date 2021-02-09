import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input } from "reactstrap"
import useWindowDimensions from "../utils/getWindowDimensions"

export const DiscFilter = ({ searchTerms, setSearchTerms }) => {
    const { width } = useWindowDimensions();

    return (
        <Form className={width > 576 ? (width < 768 ? "input-group ml-auto mr-3 my-4 w-50" : "input-group mt-4 ml-auto mr-3 w-25") : "input-group my-4 mx-3"}
            onSubmit={e => e.preventDefault()}
        >
            <Input value={searchTerms}
                className="border-right-0"
                placeholder="Filter discs"
                onChange={e => setSearchTerms(e.target.value)}
            />
            <span className="input-group-append">
                <div className="input-group-text bg-transparent border-left-0"><FontAwesomeIcon icon={faSearch} /></div>
            </span>
        </Form>
    )
}