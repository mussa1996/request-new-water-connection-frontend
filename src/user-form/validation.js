import React, { useState } from "react";
import validator from 'validator'
  
const App = () => {
  
  const [errorMessage, setErrorMessage] = useState('')
  
  const validate = (textInput) => {
  
    if (validator.isPassportNumber(textInput,'IN')) {
      setErrorMessage('Is Valid Passport Number')
    } else {
      setErrorMessage('Is Invalid Passport Number')
    }
  }
  
  return (
    <div style={{
      marginLeft: '200px',
    }}>
      <pre>
        <h2>Validate Passport Number in ReactJS</h2>
        <span>Enter Passport Number: </span><input type="text"
          onChange={(e) => validate(e.target.value)}></input> <br />
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{errorMessage}</span>
      </pre>
    </div>
  );
}
  
export default App