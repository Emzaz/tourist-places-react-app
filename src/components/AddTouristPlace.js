import React, { useContext, useState } from "react";
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalState";
import { Link, useHistory } from "react-router-dom";
import './AddTouristPlace.css';
import { v4 as uuidv4 } from 'uuid';
import { placeSchema } from "../Validations/TouristFormValidation";
// import update from 'immutability-helper'

const AddTouristPlace = () => {
    let history = useHistory();
    const { addPlace } = useContext(GlobalContext);

    const[name, setName] = useState('');
    const[address, setAddress] = useState('');
    const[rating, setRating] = useState('');
    const[type, setType] = useState('Beach');
    const[picture, setPicture] = useState('');

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
        console.log(isValid);
        if (isValid) {
            addPlace(newPlace);
            history.push("/");
        } else {
            placeSchema.validate(newPlace, { abortEarly: false }).catch((err) => {
                const errors = err.inner.reduce((acc, error) => {
                    return {
                        ...acc,
                        [error.path] : true,
                    }
                }, {})

                console.log(errors.name);
                // setErrors((prevErrors) => update(prevErrors, {
                //     $set: errors,
                // })
                // )
            })
        }

        // console.log(errors)
    };

    const addPicture = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let base64String = reader.result;
            setPicture(base64String);
        }
    }

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
                name='name' 
                type="text" 
                placeholder="Place Name" 
                onChange={e => setName(e.target.value)}
                // required
                />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalAddress">
                <Col componentClass={ControlLabel} sm={2}>
                Address: <span className="required">*</span> 
                </Col>
                <Col sm={10}>
                <FormControl 
                value={address} 
                name='address' 
                type="text" 
                placeholder="Address of the place" 
                onChange={e => setAddress(e.target.value)} 
                // required
                />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalRating">
                <Col componentClass={ControlLabel} sm={2}>
                Rating: <span className="required">*</span>
                </Col>
                <Col sm={10}>
                <FormControl 
                value={rating} 
                name='rating' 
                type="number" 
                // min={1} max={5} 
                placeholder="Rate the palace from 1 to 5" 
                onChange={e => setRating(e.target.value)} 
                // required
                />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalType">
                <Col componentClass={ControlLabel} sm={2}>
                Type: <span className="required">*</span>
                </Col>
                <Col sm={10}>
                <FormControl 
                value={type} 
                name='type' 
                componentClass="select" 
                onChange={e => setType(e.target.value)}
                // required
                > 
                    <option>Beach</option>
                    <option>Hills</option>
                    <option>Fountain</option>
                    <option>Lndmark</option>
                </FormControl>
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPicture">
                <Col componentClass={ControlLabel} sm={2}>
                Picture: <span className="required">*</span>
                </Col>
                <Col sm={10}>
                <FormControl className="form-control"
                // value={picture} 
                name='picture' 
                type="file" 
                onChange={addPicture}
                // required
                />
                </Col>
            </FormGroup>

            <FormGroup className="button">
                <Col smOffset={10} sm={2}>
                <Button bsStyle="success" className="btn-submit" type="submit">Submit</Button>
                <Button bsStyle="warning" className="btn-reset" type="reset">Reset</Button>
                </Col>
            </FormGroup>
            </Form>

            <div className="link">
                <Link to="/">
                    Back to Tourist Place List
                </Link>
            </div>
        </div>
    )
}

export default AddTouristPlace;
