import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAddress } from '../actions';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import AddressField from './field/AddressField';
import formFields from './field/formFields';
import schema from './field/validationSchema';
//import { asyncValidate, shouldAsyncValidate } from 'redux-form-yup';
import * as Yup from 'yup';

class EditAddress extends Component {

    componentDidMount() {
        const { id: addressId } = this.props.match.params;
        this.props.fetchAddress(addressId);
    }

    renderFields() {
        return formFields.map(({label, name, type}) => {
            return <Field key={name} component={AddressField} type={type} label={label} name={name} />;
        });
    }

    render() {
        const { handleSubmit, load, pristine, reset, submitting } = this.props;
        return (
            <form onSubmit={handleSubmit(() => {console.log('hi'); })}>
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



async function validate(values, Yup) {
    // const schema = Yup
    // .object()
    // .shape({ 
    //     firstName: Yup.string().required(), 
    //     lastName: Yup.string().required(),
    //     email: Yup.string().email().required(),
    //     address: Yup.string().required(),
    //     city: Yup.string().required(),
    //     state: Yup.string().required().min(2).max(2),
    //     zipcode: Yup.number(),
    //     email: Yup.string().required(),
    //     phone: Yup.string().required()
    // });

    // const errors = {};
     
    // console.log(values);
    // return errors;
    const promy = await schema.validate(values);
    debugger;
    console.log('in validate');

    const handleIt = (response) => {
        if(response.errors) {
            throw { firstName: 'did it touch', lastName: 'That username is taken', address: 'duh' };
        } else {
            return {};
        }
    };
    // return new Promise((res, rej) => {
    //     //return handleIt
    // });
    //proxy.then((it)=> (console.dir(it)));
    //return promy;
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    return sleep(1000).then(() => {
        // simulate server latency
          return { firstName: 'did it touch', lastName: 'That username is taken', address: 'duh' };
    });
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
                console.dir(errors.inner);
                const reduxFormErrors = errors.inner.reduce((acc, current) => {
                    return Object.assign(acc, { [current.path]: current.message });
                }, {});
                reject(reduxFormErrors);
            })
    });
};


EditAddress = reduxForm({
    form: 'initializeFromState', // a unique identifier for this form
    enableReinitialize: true,
    destroyOnUnmount: true,
    asyncValidate,
    //asyncValidate: async values => { await validate(values, Yup) },
    //shouldAsyncValidate: () => { return true }
})(EditAddress)
  
// You have to connect() to any reducers that you wish to connect to yourself
EditAddress = connect(state => ({initialValues: state.reducers.address}),{ fetchAddress }
)(EditAddress)
  
export default EditAddress