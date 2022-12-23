import React from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

import { removePlace } from "../actions/actions";

const DeletePlace = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const onRemovePlace = (id) => {
    dispatch(removePlace(id));
  };

  return (
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Are you Sure?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Link to="/">
            <Button bsStyle="warning primary">Cancel</Button>
            <Button onClick={() => onRemovePlace(id)} bsStyle="danger primary">
              Delete
            </Button>
          </Link>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default DeletePlace;
