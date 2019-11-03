import * as yup from 'yup';
const zipFormat = new RegExp("^[0-9]{5}(?:-[0-9]{4})?$");
const phoneFormat = new RegExp("^[0-9]{10}");

export default yup.object().shape({
    firstName: yup.string().required('Please enter a first name.'), 
    lastName: yup.string().required('Please enter a last name.'),
    address: yup.string().required('Please enter an address.'),
    city: yup.string().required('Please enter a city.'),
    state: yup.string().required('Please select a state.'),
    zipcode: yup.string().matches(zipFormat, 'Please enter a valid zipcode.').required('Please enter a zipcode.'),
    email: yup.string().email('Please enter a valid email address.').required('Please enter an email address.'),
    phone: yup.string().matches(phoneFormat, 'Please enter a valid phone number.').required('Please enter a phone number.')
});