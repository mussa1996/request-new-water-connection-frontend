import * as yup from 'yup'

export const basicSchema=yup.object().shape({
    first_name: yup.string().min(2).max(50).matches("^[a-zA-Z ]*$","name should be characters only"),
    last_name: yup.string().min(2).max(50).matches("^[a-zA-Z ]*$","name should be characters only"),
    email: yup.string().email('please enter valid email'),
    phone: yup.number().positive("phone number must be positive").integer(),
    province: yup.string(),
    district: yup.string(),
    sector: yup.string(),
    cell: yup.string(),
    country: yup.string(),
    dob:yup.date(),
    occupation:yup.string(),
    gender:yup.string(),
    branch_name:yup.string(),
    water_usage:yup.string(),
    creation_date:yup.date(),
    plot_number:yup.string(),
    id_type:yup.string(),
    id_number:yup.string("Id number is use only number").min(16,'Id number must be equal 16'),
    passport_number:yup.string().min(8,'passport number must be 8 character').max(8,'passport number must be 8 character').
    matches("^[A-Za-z]{0,2}[0-9]{0,6}$","The first two number must be character then other remain is a number"),
    id_type:yup.string(),
    issued_date:yup.date(),
    expiry_date:yup.date(),
    id_image:yup.string(),


}
)