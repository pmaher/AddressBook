import React, { Component } from 'react';
import { fetchAddresses } from '../actions';
import { connect } from 'react-redux';
import AddressRow from './AddressRow';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

class AddressList extends Component {

    constructor(props) {
        super(props);
        this.state = {addresses: []};
    }
    
    componentDidMount() {
        this.props.fetchAddresses();
    }

    static getDerivedStateFromProps(props, state) {
        
        if (props.addresses) {
          return { addresses: props.addresses };
        }
        return null;
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
                {this.state.addresses &&
                this.state.addresses.map((address, i) =>
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
function mapStateToProps(state) {
    return state.reducers;
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchAddresses
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressList);