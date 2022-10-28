import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const TableBody = ({places}) => {
    if (places.length > 0) {
        return (
            <tbody>
                {places.map((place) => (
                    <tr key={place.id}>
                        <td>{place.name}</td>
                        <td>{place.address}</td>
                        <td>{place.rating}</td>
                        <td>{place.type}</td>
                        <td>
                            <img src={place.picture} alt={place.name} />
                        </td>
                        <td>
                            <div className="action">
                                <Link to={`/update/${place.id}`}>
                                    <Button bsStyle="primary" className="btn-update">Update</Button>
                                </Link>
                                <Link to={"/delete/"+place.id}>
                                    <Button bsStyle="primary" className="btn-delete">Delete</Button>
                                </Link>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        )
    } else {
        return (
            <tbody>
                <td colSpan={6}>No available data</td>
            </tbody>
        )
    }
}

export default TableBody;
