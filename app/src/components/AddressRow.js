import React from 'react';
import { Link } from 'react-router-dom';
import { deleteAddress } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const AddressRow = ({id, firstName,lastName,email,phone, deleteAddress}) => {

    return (
        <tr>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>
                <Link to={`/edit/${id}`}><i className="material-icons">edit</i></Link>
            </td>
            <td><a href="/#" onClick={() => { deleteAddress(id)} }><i className="material-icons">delete</i></a></td>
        </tr>
    );
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        deleteAddress
    }
    , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressRow);