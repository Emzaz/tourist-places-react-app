import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { removePlace } from "../actions/actions";

const DeletePlace = () => {
    const dispatch = useDispatch();
    
    const  onRemovePlace  = (id) => {
        dispatch(removePlace(id))
    }

    const {id} = useParams();

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
                        <Button onClick={() => onRemovePlace(id)} bsStyle="danger primary">
                            Delete
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}

export default DeletePlace;
