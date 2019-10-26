import React from 'react';
import { Link } from 'react-router-dom';

const AddressRow = ({id, firstName,lastName,email,phone}) =>
    <tr>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>
            <Link to={`/edit/${id}`}><i className="material-icons">edit</i></Link>
        </td>
        <td><a href="#"><i className="material-icons">delete</i></a></td>
    </tr>

export default AddressRow