import * as yup from 'yup'

export const basicSchema=yup.object().shape({
    first_name: yup.string().min(2).max(50).required('First name is required').matches("^[a-zA-Z ]*$","name should be characters only"),
    last_name: yup.string().min(2).max(50).required('Last name is required').matches("^[a-zA-Z ]*$","name should be characters only"),
    email: yup.string().email('please enter valid email').required('Email is required'),
    phone: yup.number().positive("phone number must be positive").integer().required('Phone is required'),
    province: yup.string().required('Province is required'),
    district: yup.string().required(' District is required'),
    sector: yup.string().required('Sector is required'),
    cell: yup.string().required('Cell is required'),
    country: yup.string().required('Country is required'),
    dob:yup.date().required("Date of birth is required"),
    occupation:yup.string().required('Occupation is required'),
    gender:yup.string().required('Gender is required'),
    branch_name:yup.string().required('Branch name is required'),
    water_usage:yup.string().required('Water usage is required'),
    creation_date:yup.date().required('Creation date is required'),
    plot_number:yup.string().required('Plot number is required'),
    id_number:yup.string("Id number is use only number").min(16,'Id number must be equal 16'),
    passport_number:yup.string().min(8,'passport number must be 8 character').max(8,'passport number must be 8 character').
    matches("^[A-Za-z]{0,2}[0-9]{0,6}$","The first two number must be character then other remain is a number"),
    id_type:yup.string(),
    issued_date:yup.date(),
    expiry_date:yup.date(),
    id_image:yup.string(),


}
)