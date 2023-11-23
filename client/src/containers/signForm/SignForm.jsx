import React, { useState } from "react";
// import './signForm.css';
import FormInput from "../../components/formInput/FormInput";

const SignForm = () => {
  const modes = ["Sign In", "Sign Up"];

  const [isSignUp, setIsSignUp] = useState(true);
  const [buttonValue, setButtonValue] = useState("Sign In");
  const [heading, setHeading] = useState("Sign Up");
  const [values, setValues] = useState({
    email: "",
    fName: "",
    lName: "",
    password: "",
    confirmPassword: "",
  });

  const inputsSignUp = [
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Should Be Valid Email!!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "must have at least 8 characters",
      label: "Password",
      required: true,
      pattern: "^.{8,}$",
    },
  ];

  const inputsSignIn = [
    {
      id: 1,
      name: "fName",
      type: "text",
      placeholder: "First Name",
      errorMessage: "",
      label: "First Name",
      pattern: "/^[a-z ,.'-]+$/i",
      required: true,
    },
    {
      id: 2,
      name: "lName",
      type: "text",
      placeholder: "Last Name",
      errorMessage: "",
      label: "Last Name",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Should Be Valid Email!!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "must have at least 8 characters",
      label: "Password",
      required: true,
      pattern: "^.{8,}$",
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords do not match",
      label: "Confirm Password",
      required: true,
      pattern: values.password,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function switchView() {
    if (isSignUp === true) {
      setButtonValue("Sign Up");
      setHeading("Sign In");
    } else {
      setButtonValue("Sign In");
      setHeading("Sign Up");
    }
    setIsSignUp(!isSignUp);
  }

  console.log(values);
  return (
    <div className="signForm">
      <form onSubmit={handleSubmit}>
        <h1>{heading}</h1>

        <div className="inputs">
          {heading === "Sign Up" ? (
            <div className="signUpInputs">
              {inputsSignIn.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ))}
            </div>
          ) : (
            <div className="signInInputs">
              {inputsSignUp.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ))}
            </div>
          )}
        </div>

        <div className="buttonGroup">
          <button className="switch" onClick={switchView}>
            {buttonValue}
          </button>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SignForm;
