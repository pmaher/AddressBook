import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AddressList from './AddressList';
import EditAddress from './EditAddress';
import NewAddress from './NewAddress';
import Header from './Header';

class App extends Component {

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        {/** Header will always be shown regardless of route */}
                        <Route component={Header} />
                        <Route exact path="/" component={AddressList} />
                        <Route path="/edit/:id" component={EditAddress} />
                        <Route path="/new" component={NewAddress} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default App;