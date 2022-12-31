function validateName(name) {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    if (nameRegex.test(name)) {
      return {
        isValid: true,
        message: 'Name is valid',
      };
    } else {
      return {
        isValid: false,
        message: 'Name is not valid',
      };
    }
  }
    export default validateName;