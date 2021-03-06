import React, { Component } from 'react';
import { fetchAddresses, sortAddresses } from '../actions';
import { connect } from 'react-redux';
import AddressRow from './AddressRow';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import './AddressList.css';

class AddressList extends Component {

    constructor(props) {
        super(props);
        this.state = {addresses: [], sortBy: 'firstName', sortOrder: 'asc'};
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

    sortBy(field){
        let { sortBy = 'firstName', sortOrder = 'asc'} = this.props;
        if(sortBy === field) {
            sortOrder = (sortOrder == 'asc' ? 'desc' : 'asc');
        }
        sortBy = field;
        this.props.sortAddresses(sortBy, sortOrder);
    }

    getSortClass(field) {
        return (this.props.sortBy === field ? `sort-by-${this.props.sortOrder}` : 'sort-by-none');
    }

    renderAddresses() {

        return (<table className="highlight">
            <thead>
            <tr>
                <th><a href="#" onClick={this.sortBy.bind(this, 'firstName')} 
                        className={this.getSortClass('firstName')}>First Name<i className="small material-icons -up">arrow_drop_up</i><i className="small material-icons -down">arrow_drop_down</i></a></th>
                <th><a href="#" onClick={this.sortBy.bind(this, 'lastName')} 
                        className={this.getSortClass('lastName')}>Last Name<i className="small material-icons -up">arrow_drop_up</i><i className="small material-icons -down">arrow_drop_down</i></a></th>
                <th><a href="#" onClick={this.sortBy.bind(this, 'email')} 
                        className={this.getSortClass('email')}>Email<i className="small material-icons -up">arrow_drop_up</i><i className="small material-icons -down">arrow_drop_down</i></a></th>
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
function mapStateToProps({reducers: {addresses=[], filterString='', sortBy='firstName', sortOrder='asc'}}) {
    let compareFn;
    if(sortOrder === 'asc') {
        compareFn = (a,b) => (a[sortBy].toLowerCase()<b[sortBy].toLowerCase() ? -1 : 1 );
    } else {
        compareFn = (a,b) => (a[sortBy].toLowerCase()>b[sortBy].toLowerCase() ? -1 : 1);
    }
    
    const filteredSortedAddresses = addresses.filter((address) => {
        const filter = filterString.toLowerCase();
        return (address.firstName.toLowerCase().indexOf(filter) > -1 
                || address.lastName.toLowerCase().indexOf(filter) > -1 
                || address.email.toLowerCase().indexOf(filter) > -1);
    }).sort(compareFn);
    return { addresses: filteredSortedAddresses, sortBy, sortOrder };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchAddresses, sortAddresses
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressList);