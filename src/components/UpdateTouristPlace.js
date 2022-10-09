import React, { useContext, useEffect, useState } from "react";
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalState";
import { Link, useHistory } from "react-router-dom";
import './AddTouristPlace.css';
import { placeSchema } from "../Validations/TouristFormValidation";

const UpdateTouristPlace = (route) => {
    let history = useHistory();
    const { places, updatePlace } = useContext(GlobalContext);
    const[picture, setPicture] = useState('');

    const [selectedPlace, setSelectedPlace] = useState({
        id: null,
        name: '',
        address: '',
        rating: '',
        type: '',
        picture: '',
    });
    
    const currentPlaceId = route.match.params.id;

    useEffect(() => {
        const placeId = currentPlaceId;
        const selectedPlace = places.find((currentPlaceTraversal) => currentPlaceTraversal.id === placeId);
        setSelectedPlace(selectedPlace);
    }, [currentPlaceId, places]);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        selectedPlace.picture = picture;
        const isValid = await placeSchema.isValid(selectedPlace);
        if (isValid) {
            updatePlace(selectedPlace);
            history.push("/");   
        }
    };

    const handleOnChange = (placeKey, newValue) => setSelectedPlace({ ...selectedPlace, [placeKey]: newValue});

    if(!selectedPlace || !selectedPlace.id) {
        return <div>Invalid Place Id</div>;
    }

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

            <Form horizontal 
            onSubmit={onFormSubmit}
            >
            
            <FormGroup controlId="formHorizontalName">
                <Col componentClass={ControlLabel} sm={2}>
                Name: <span className="required">*</span>
                </Col>
                <Col sm={10}>
                <FormControl 
                value={selectedPlace.name} 
                name='name' 
                type="text" 
                placeholder="Place Name" 
                onChange={e => handleOnChange('name', e.target.value)}
                required
                />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalAddress">
                <Col componentClass={ControlLabel} sm={2}>
                Address: <span className="required">*</span>
                </Col>
                <Col sm={10}>
                <FormControl 
                value={selectedPlace.address} 
                name='address' 
                type="text" 
                placeholder="Address of the place" 
                onChange={e => handleOnChange('address', e.target.value)} 
                required
                />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalRating">
                <Col componentClass={ControlLabel} sm={2}>
                Rating: <span className="required">*</span>
                </Col>
                <Col sm={10}>
                <FormControl 
                value={selectedPlace.rating} 
                name='rating' 
                type="number" 
                min={1} max={5} 
                placeholder="Rate the palace from 1 to 5" 
                onChange={e => handleOnChange('rating', e.target.value)} 
                required
                />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalType">
                <Col componentClass={ControlLabel} sm={2}>
                Type: <span className="required">*</span>
                </Col>
                <Col sm={10}>
                <FormControl 
                value={selectedPlace.type} 
                name='type' 
                componentClass="select" 
                onChange={e => handleOnChange('type', e.target.value)}
                required
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
                //value={picture} 
                name='picture' 
                type="file" 
                onChange={addPicture}
                required
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

export default UpdateTouristPlace;
