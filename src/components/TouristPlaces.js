import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormControl, Table, Button } from "react-bootstrap";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import "./TouristPlaces.css";

const TouristPlaces = () => {
  const [searchedName, setSearchedName] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const places = useSelector((state) => state.places);

  const handleSorting = () => {
    let order = "";

    if (sortOrder === "asc") {
      order = "desc";
    } else if (sortOrder === "desc") {
      order = "none";
    } else if (sortOrder === "none") {
      order = "asc";
    }
    setSortOrder(order);
  };

  let data = places.filter((place) =>
    place.name.toLowerCase().includes(searchedName)
  );

  if (sortOrder === "asc") {
    data.sort((a, b) => a.rating - b.rating);
  } else if (sortOrder === "desc") {
    data.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="table-container">
      <div className="table-search">
        <FormControl
          type="search"
          value={searchedName}
          id="datatable-search-input"
          placeholder="Enter name to search"
          onChange={(e) => setSearchedName(e.target.value.toLowerCase())}
        />
      </div>

      <Table responsive striped>
        <TableHeader handleSorting={handleSorting} sortOrder={sortOrder} />
        <TableBody places={data} />
      </Table>

      <Link to="/add">
        <Button bsStyle="primary">Create New Tourist Place</Button>
      </Link>
    </div>
  );
};

export default TouristPlaces;
