import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAddress } from '../actions';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import AddressField from './field/AddressField';
import formFields from './field/formFields';

class EditAddress extends Component {

    componentDidMount() {
        const { id: addressId } = this.props.match.params;
        this.props.fetchAddress(addressId);
    }

    renderFields() {
        return formFields.map(({label, name, type}) => {
            return <Field key={name} component={AddressField} type="{type}" label={label} name={name} />;
        });
    }

    render() {
        const { handleSubmit, load, pristine, reset, submitting } = this.props;
        return (
            <form onSubmit={this.props.handleSubmit}>
                { this.renderFields() }
                <Link to="/" className="red btn-flat left white-text">
                    Cancel
                </Link>
                <button type="submit" className="teal btn-flat right white-text">Save<i className="material-icons right">done</i></button>
            </form>
        )
    }
}

function validate(values) {
    const errors = {};
    return errors;
}

EditAddress = reduxForm({
    form: 'initializeFromState', // a unique identifier for this form
    enableReinitialize: true,
    destroyOnUnmount: true
})(EditAddress)
  
// You have to connect() to any reducers that you wish to connect to yourself
EditAddress = connect(state => ({initialValues: state.reducers.address}),{ fetchAddress }
)(EditAddress)
  
export default EditAddress