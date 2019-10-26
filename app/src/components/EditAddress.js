import React, { Component } from 'react';

class EditAddress extends Component {

    render() {
        return (
            <div className="container">
                Edit Address {this.props.match.params.id}!
            </div>
        )
    }
}

export default EditAddress 