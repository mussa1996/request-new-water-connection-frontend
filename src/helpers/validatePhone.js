function validatePhoneNumber(phoneNumber) {
    const phoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phoneNumberRegex.test(phoneNumber)) {
      return {
        isValid: true,
        message: 'Phone number is valid',
      };
    } else {
      return {
        isValid: false,
        message: 'Phone number is not valid',
      };
    }
  }
    export default validatePhoneNumber;