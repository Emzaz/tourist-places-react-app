import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  ControlLabel,
  Button,
} from "react-bootstrap";

import { v4 as uuidv4 } from "uuid";
import { placeSchema } from "../Validation Schemas/TouristFormValidation";
import { addPlace } from "../actions/actions";
import "./AddTouristPlace.css";

const AddTouristPlace = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState("");
  const [type, setType] = useState("");
  const [picture, setPicture] = useState("");
  const [fieldErrors, setFieldErrors] = useState();

  const onAddPlace = (place) => {
    dispatch(addPlace(place));
  };

  const handleReset = () => {
    setName("");
    setAddress("");
    setRating("");
    setType("");
    setPicture("");
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const newPlace = {
      id: uuidv4(),
      name: name,
      address: address,
      rating: rating,
      type: type,
      picture,
    };

    const isValid = await placeSchema.isValid(newPlace);

    if (isValid) {
      onAddPlace(newPlace);
      history.push("/");
    } else {
      placeSchema.validate(newPlace, { abortEarly: false }).catch((err) => {
        const errors = err.inner.reduce((acc, error) => {
          return {
            ...acc,
            [error.path]: true,
          };
        }, {});
        setFieldErrors(errors);
      });
    }
  };

  const addPicture = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64String = reader.result;
      setPicture(base64String);
    };
  };

  return (
    <div className="container">
      <div className="heading">
        <h3>Add a new Tourist Place</h3>
      </div>
      <Form horizontal onSubmit={onFormSubmit}>
        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} sm={2}>
            Name: <span className="required">*</span>
          </Col>
          <Col sm={10}>
            <FormControl
              value={name}
              name="name"
              type="text"
              placeholder="Place Name"
              onChange={(e) => setName(e.target.value)}
              // required
            />
            {fieldErrors?.name === true ? (
              <small>Name is Required</small>
            ) : null}
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalAddress">
          <Col componentClass={ControlLabel} sm={2}>
            Address: <span className="required">*</span>
          </Col>
          <Col sm={10}>
            <FormControl
              value={address}
              name="address"
              type="text"
              placeholder="Address of the place"
              onChange={(e) => setAddress(e.target.value)}
              // required
            />
            {fieldErrors?.address === true ? (
              <small>Address is Required</small>
            ) : null}
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalRating">
          <Col componentClass={ControlLabel} sm={2}>
            Rating: <span className="required">*</span>
          </Col>
          <Col sm={10}>
            <FormControl
              value={rating}
              name="rating"
              type="number"
              // min={1} max={5}
              placeholder="Rate the palace from 1 to 5"
              onChange={(e) => setRating(e.target.value)}
              // required
            />
            {fieldErrors?.rating === true ? (
              <small>Rating is Required and must be between 1 to 5</small>
            ) : null}
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalType">
          <Col componentClass={ControlLabel} sm={2}>
            Type: <span className="required">*</span>
          </Col>
          <Col sm={10}>
            <FormControl
              value={type}
              name="type"
              componentClass="select"
              onChange={(e) => setType(e.target.value)}
              // required
            >
              <option disabled selected value="">
                -- Select a Type --
              </option>
              <option value="Beach">Beach</option>
              <option value="Hills">Hills</option>
              <option value="Fountain">Fountain</option>
              <option value="Lndmark">Lndmark</option>
            </FormControl>
            {fieldErrors?.type === true ? (
              <small>Type is Required</small>
            ) : null}
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalPicture">
          <Col componentClass={ControlLabel} sm={2}>
            Picture: <span className="required">*</span>
          </Col>
          <Col sm={10}>
            <FormControl
              className="form-control"
              // value={picture}
              name="picture"
              type="file"
              onChange={addPicture}
              // required
            />
            {fieldErrors?.picture === true ? (
              <small>Picture Required</small>
            ) : null}
          </Col>
        </FormGroup>
        <FormGroup className="button">
          <Col smOffset={10} sm={2}>
            <Button bsStyle="success" className="btn-submit" type="submit">
              Submit
            </Button>
            <Button
              bsStyle="warning"
              className="btn-reset"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Col>
        </FormGroup>
      </Form>
      <div className="link">
        <Link to="/">Back to Tourist Place List</Link>
      </div>
    </div>
  );
};

export default AddTouristPlace;
