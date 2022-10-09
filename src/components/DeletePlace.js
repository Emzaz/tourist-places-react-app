import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const DeletePlace = () => {
    const { removePlace } = useContext(GlobalContext);
    const {id} = useParams();
    console.log(id);

    return (
        <div className="static-modal">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Are you Sure?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Link to="/">
                        <Button bsStyle="warning primary">
                            Cancel
                        </Button>
                        <Button onClick={() => removePlace(id)} bsStyle="danger primary">
                            Delete
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}

export default DeletePlace;
