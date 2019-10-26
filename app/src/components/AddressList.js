import React, { Component } from 'react';
import { fetchAddresses } from '../actions';
import { connect } from 'react-redux';
import AddressRow from './AddressRow';
import { Link } from 'react-router-dom';

class AddressList extends Component {
    
    componentDidMount() {
        this.props.fetchAddresses();
    }

    renderAddresses() {
        return (<table className="highlight">
            <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
                {this.props.addresses.map((address, i) =>
                    <AddressRow key={i} {...address} />)}
            </tbody>
        </table>);
    }

    render() {
        return (
            <div>
                {this.renderAddresses()}
                <div className="fixed-action-btn">
                    <Link to="/new" className="btn-floating btn-large red">
                        <i className="material-icons">add</i>
                    </Link>
                </div>
            </div>
        )
    }
}

//this maps the addresses from the reducer to the component props
function mapStateToProps(addresses) {
    return { addresses: addresses || [] };
}

export default connect(mapStateToProps, { fetchAddresses })(AddressList);