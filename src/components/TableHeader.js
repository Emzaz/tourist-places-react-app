import React from "react";
import { FaSort,
    FaSortUp,
    FaSortDown } from "react-icons/fa"

const TableHeader = ({ handleSorting , sortOrder}) => {
    return (
        <thead>
            <tr>
                <th>NAME</th>
                <th>ADDRESS</th>
                <th className="rating-column" onClick={handleSorting}>
                    RATING
                    {sortOrder === 'none' ? <FaSort />: null}
                    {sortOrder === 'asc' ? <FaSortUp />: null}
                    {sortOrder === 'desc' ? <FaSortDown />: null}
                </th>
                <th>TYPE</th>
                <th>PICTURE</th>
                <th>ACTION</th>
            </tr>
        </thead>
    )
}

export default TableHeader;
