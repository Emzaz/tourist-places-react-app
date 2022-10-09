import React from "react";

const TableHeader = ({ handleSorting }) => {
    return (
        <thead>
            <tr>
                <th>NAME</th>
                <th>ADDRESS</th>
                <th onClick={handleSorting}>RATING</th>
                <th>TYPE</th>
                <th>PICTURE</th>
                <th>ACTION</th>
            </tr>
        </thead>
    )
}

export default TableHeader;
