import * as yup from 'yup';
import { setLocale } from 'yup';

// setLocale({
//     string: {
//         required: 'enter it fool!',
//     },
//     number: {
//       min: 'Enter at least ${min} digits',
//       max: 'Cannot be longer than ${max} digits'
//     },
// });

export default yup.object().shape({
    firstName: yup.string().required(), 
    lastName: yup.string().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required().min(2).max(2),
    zipcode: yup.number(),
    email: yup.string().email().required(),
    phone: yup.string().required()
});