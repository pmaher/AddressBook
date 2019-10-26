import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AddressList from './AddressList';
import EditAddress from './EditAddress';
import NewAddress from './NewAddress';


class App extends Component {

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Route exact path="/" component={AddressList} />
                        <Route path="/edit/:id" component={EditAddress} />
                        <Route path="/new" component={NewAddress} />
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

export default App;