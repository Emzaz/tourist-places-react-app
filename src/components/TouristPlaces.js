import React, { useContext, useState } from "react";
import { FormControl, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './TouristPlaces.css'
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { GlobalContext } from "../context/GlobalState";

const TouristPlaces = () => {
    const { places } = useContext(GlobalContext);
    console.log(places);
    const [searchedName, setSearchedName] = useState('');
    const [sortOrder, setSortOrder] = useState('none');
 
    const handleSorting = () => {
        let order = '';
    
        if(sortOrder === 'asc') {
            order = 'desc';
        } else if(sortOrder === 'desc') {
            order = 'none';
        } else if(sortOrder === 'none') {
            order = 'asc';
        }
        setSortOrder(order);
    }
    
    let data = places.filter((place) => place.name.toLowerCase().includes(searchedName));

    if(sortOrder === 'asc') {
        data.sort((a, b) => a.rating - b.rating)
    } else if(sortOrder === 'desc') {
        data.sort((a, b) => b.rating - a.rating)
    }

    return (
        
        <div className="table-container">
            <div className="table-search">
                <FormControl 
                type="search" 
                value={searchedName}
                id="datatable-search-input" 
                placeholder="Enter name to search" 
                onChange={(e) => setSearchedName(e.target.value.toLowerCase())}/>
            </div>

            <Table responsive striped>
                <TableHeader handleSorting={handleSorting} />
                <TableBody places={data}/>
            </Table>

            <Link to="/add">
                <Button bsStyle="primary">Create New Tourist Place</Button>
            </Link>
        </div>
    )
}

export default TouristPlaces;
