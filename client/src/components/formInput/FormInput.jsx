import React, { useState } from "react";
import "./formInput.css";

const FormInput = (props) => {
  const [focussed, setFocussed] = useState(false);
  const { label, onChange, errorMessage, id, ...inputProps } = props;

  function handleFocus() {}

  return (
    <div className="formInput">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={() => {
          setFocussed(true);
        }}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocussed(true)
        }
        focussed={focussed.toString()}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
