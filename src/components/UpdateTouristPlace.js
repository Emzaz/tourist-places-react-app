import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  ControlLabel,
  Button,
} from "react-bootstrap";

import { placeSchema } from "../Validation Schemas/TouristFormValidation";
import { updatePlace } from "../actions/actions";
import "./AddTouristPlace.css";

const UpdateTouristPlace = (route) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const { id: currentPlaceId } = useParams();

  const [picture, setPicture] = useState("");
  const [fieldErrors, setFieldErrors] = useState();

  const places = useSelector((state) => state.places);
  const onUpdatePlace = (updatedPlace) => dispatch(updatePlace(updatedPlace));

  const [selectedPlace, setSelectedPlace] = useState({
    id: null,
    name: "",
    address: "",
    rating: "",
    type: "",
    picture: "",
  });

  useEffect(() => {
    const placeId = currentPlaceId;
    const selectedPlace = places.find(
      (currentPlaceTraversal) => currentPlaceTraversal.id === placeId
    );
    setSelectedPlace(selectedPlace);
  }, [currentPlaceId, places]);

  const handleReset = () => {
    const placeId = currentPlaceId;
    const selectedPlace = places.find(
      (currentPlaceTraversal) => currentPlaceTraversal.id === placeId
    );
    setSelectedPlace(selectedPlace);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    selectedPlace.picture = picture;
    const isValid = await placeSchema.isValid(selectedPlace);

    if (isValid) {
      onUpdatePlace(selectedPlace);
      history.push("/");
    } else {
      placeSchema
        .validate(selectedPlace, { abortEarly: false })
        .catch((err) => {
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

  const handleOnChange = (placeKey, newValue) =>
    setSelectedPlace({ ...selectedPlace, [placeKey]: newValue });

  if (!selectedPlace || !selectedPlace.id) {
    return (
      <div>
        <h1>Invalid Place Id</h1>
      </div>
    );
  }

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
        <h3>Update the Place</h3>
      </div>
      <Form horizontal onSubmit={onFormSubmit}>
        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} sm={2}>
            Name: <span className="required">*</span>
          </Col>
          <Col sm={10}>
            <FormControl
              value={selectedPlace.name}
              name="name"
              type="text"
              placeholder="Place Name"
              onChange={(e) => handleOnChange("name", e.target.value)}
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
              value={selectedPlace.address}
              name="address"
              type="text"
              placeholder="Address of the place"
              onChange={(e) => handleOnChange("address", e.target.value)}
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
              value={selectedPlace.rating}
              name="rating"
              type="number"
              min={1}
              max={5}
              placeholder="Rate the palace from 1 to 5"
              onChange={(e) => handleOnChange("rating", e.target.value)}
              // required
            />
            {fieldErrors?.rating === true ? (
              <small>Rating is Required</small>
            ) : null}
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalType">
          <Col componentClass={ControlLabel} sm={2}>
            Type: <span className="required">*</span>
          </Col>
          <Col sm={10}>
            <FormControl
              value={selectedPlace.type}
              name="type"
              componentClass="select"
              onChange={(e) => handleOnChange("type", e.target.value)}
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
              name="picture"
              type="file"
              onChange={addPicture}
              // required
            />
            {fieldErrors?.picture === true ? (
              <small>Picture is Required</small>
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

export default UpdateTouristPlace;
