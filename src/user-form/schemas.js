import * as yup from 'yup'

export const basicSchema=yup.object().shape({
    firstName: yup.string().min(2).max(50).required('First name is required').matches("^[a-zA-Z ]*$","name should be characters only"),
    lastName: yup.string().min(2).max(50).required('Last name is required').matches("^[a-zA-Z ]*$","name should be characters only"),
    email: yup.string().email('please enter valid email').required('Email is required'),
    phone: yup.number().positive("phone number must be positive").integer().required('Phone is required'),
    province: yup.string().required('Province is required'),
    District: yup.string().required(' District is required'),
    sector: yup.string().required('Sector is required'),
    cell: yup.string().required('Cell is required'),
    country: yup.string().required('Country is required'),
    dob:yup.date().required("Date of birth is required"),
    occupation:yup.string().required('Occupation is required'),
    gender:yup.string().required('Gender is required'),
    branchName:yup.string().required('Branch name is required'),
    waterUsage:yup.string().required('Water usage is required'),
    creationDate:yup.date().required('Creation date is required'),
    plotNumber:yup.string().required('Plot number is required'),
    idNumber:yup.string("Id number is use only number").min(16,'Id number must be equal 16').required('Id number is required'),
    passportNumber:yup.string().min(8,'passport number must be 8 character').max(8,'passport number must be 8 character').required('Passport number is required').
    matches("^[A-Za-z]{0,2}[0-9]{0,6}$","The first two number must be character then other remain is a number"),
    idType:yup.string().required('Id type is required'),
    idIssueDate:yup.date().required('Issue date is required'),
    idExpiryDate:yup.date().required('Expiry date is required'),
    idIssueAuthority:yup.string().required('Issue authority is required'),


}
)