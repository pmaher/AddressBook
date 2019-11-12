import React, { Component } from 'react';
import { fetchAddresses } from '../actions';
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

    sortBy(event, field){
        let order, compareFn;
        if(this.state.sortBy === field) {
            order = this.state.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            order = 'asc';
        }
        if(order === 'asc') {
            compareFn = (a,b) => (a[field].toLowerCase()<b[field].toLowerCase() ? -1 : 1 );
        } else {
            compareFn = (a,b) => (a[field].toLowerCase()>b[field].toLowerCase() ? -1 : 1);
        }
        this.setState({
            addresses: this.state.addresses.sort(compareFn),
            sortBy: field,
            sortOrder: order
        })
    }

    getSortClass(field) {
        return (this.state.sortBy === field ? `sort-by-${this.state.sortOrder}` : 'sort-by-none');
    }

    renderAddresses() {
        return (<table className="highlight">
            <thead>
            <tr>
                <th><a href="#" onClick={e => this.sortBy(e, 'firstName')} 
                        className={this.getSortClass('firstName')}>First Name<i className="small material-icons -up">arrow_drop_up</i><i className="small material-icons -down">arrow_drop_down</i></a></th>
                <th><a href="#" onClick={e => this.sortBy(e, 'lastName')} 
                        className={this.getSortClass('lastName')}>Last Name<i className="small material-icons -up">arrow_drop_up</i><i className="small material-icons -down">arrow_drop_down</i></a></th>
                <th><a href="#" onClick={e => this.sortBy(e, 'email')} 
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
function mapStateToProps(state) {
    return state.reducers;
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchAddresses
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressList);