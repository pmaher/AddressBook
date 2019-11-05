import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAddress } from '../actions';
import { Link } from 'react-router-dom';
import { reduxForm, Field, change } from 'redux-form';
import AddressField from './field/AddressField';
import formFields from './field/formFields';
import schema from './field/validationSchema';
import { withRouter } from 'react-router-dom';

class NewAddress extends Component {

    // componentDidMount() {
    //     const { id: addressId } = this.props.match.params;
    //     this.props.fetchAddress(addressId);
    // }

    updatePhoneNumber(value) {
        this.props.changeFieldValue('phone', value);
    }

    renderFields() {
        return formFields.map(({label, name, type}) => {
            return <Field key={name} component={AddressField} 
                        type={type} label={label} name={name} onPhoneChanged={this.updatePhoneNumber.bind(this)}/>;
        });
    }

    submitForm(address) {
        const { createAddress, history } = this.props;
        createAddress(address, history);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
                { this.renderFields() }
                <Link to="/" className="red btn-flat left white-text">
                    Cancel
                </Link>
                <button type="submit" className="teal btn-flat right white-text">
                    Save<i className="material-icons right">done</i></button>
            </form>
        )
    }
}

const asyncValidate = values => {

    return new Promise((resolve, reject) => {
        //Validate our form values against our schema
        schema.validate(values, {abortEarly: false})
            .then(() => {
                resolve();
            })
            .catch(errors => {
                //creates an object of the form { field1: 'field1 is required', field2: 'field2 is required'}
                const reduxFormErrors = errors.inner.reduce((acc, current) => {
                    return Object.assign(acc, { [current.path] : current.message });
                }, {});
                reject(reduxFormErrors);
            })
    });
};

NewAddress = reduxForm({
    form: 'addressForm', // a unique identifier for this form
    enableReinitialize: true,
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
    asyncValidate
})(NewAddress)

const mapDispatchToProps = (dispatch) => {
    return {
        createAddress: (address, history) => { dispatch(createAddress(address, history)); },
        //this is used to trigger a change for the phone number field
        changeFieldValue: function(field, value) {
            dispatch(change('addressForm', field, value))
        }
    }
 }

 const mapStateToProps = (state) => {
     return {initialValues: state.reducers.address};
 }
  
// You have to connect() to any reducers that you wish to connect to yourself
NewAddress = connect(mapStateToProps, mapDispatchToProps
)(NewAddress)
  
export default withRouter(NewAddress);