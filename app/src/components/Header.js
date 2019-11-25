import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterAddresses } from '../actions';
import { bindActionCreators } from 'redux';

export class Header extends Component {

    filterAddresses(event) {
        this.props.filterAddresses(event.target.value);
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a href="#!" className="brand-logo center">My Address Book</a>
                    {this.props.location.pathname === '/' &&
                    <div className="input-field right">
                        <input id="search" placeholder="first,last,email" type="search" 
                                onChange={e=> this.filterAddresses(e)}/>
                        <label className="label-icon" htmlFor="search">
                            <i className="material-icons">search</i>
                        </label>
                    </div>
                    }
                </div>
            </nav>
        );
    }
}
//this maps the addresses from the reducer to the component props
function mapStateToProps(state) {
    return state.reducers;
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        filterAddresses
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);