import React from 'react';

const AddressRow = ({firstName,lastName,address,address2,city,state,zipcode,email,phone}) =>
    <tr>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{address}</td>
        <td>{address2}</td>
        <td>{city}</td>
        <td>{state}</td>
        <td>{zipcode}</td>
        <td>{email}</td>
        <td>{phone}</td>
    </tr>

export default AddressRow