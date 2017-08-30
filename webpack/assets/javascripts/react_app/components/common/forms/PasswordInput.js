import React from 'react';
import CommonForm from './CommonForm';
const PasswordInput = ({ label, className = '', placeholder = '', onChange }) => {
  return (
    <CommonForm label={label} className={`common-textInput ${className}`}>
      <input type="password" className="form-control" placeholder="********" />
    </CommonForm>
  );
};

export default PasswordInput;
