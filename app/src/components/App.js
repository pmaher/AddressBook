import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAddresses } from '../actions';
import AddressRow from './AddressRow';

class App extends Component {

    componentDidMount() {
        //this.props.addresses = [];
        this.props.fetchAddresses();
    }

    renderAddresses() {
        return (<table>
            <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Secondary Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zip</th>
                <th>Email</th>
                <th>Phone</th>
            </tr>
            </thead>
            <tbody>
                {/*this.props.addresses.map((address, i) =>
                    <AddressRow key={i} {...address} />)*/}
            </tbody>
        </table>);
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div className="container">
                    {this.renderAddresses()}
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

//this maps the addresses from the reducer to the component props
function mapStateToProps(addresses) {
    return { addresses: addresses || [] };
}

export default connect(mapStateToProps, { fetchAddresses })(App);