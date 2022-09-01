import { useEffect } from "react";
import UseInputAndSelect from "../../useHook/UseInputAndSelect";
import classes from "./EmailInput.module.css";

const emailEndsCorrectly = (value) => {
  const slicedValue = value.trim().slice(-12);
  const redberry = "@redberry.ge";
  if (redberry === slicedValue) {
    return true;
  } else {
    return false;
  }
};

const EmailInput = (props) => {
  const {
    value: emailValue,
    valueHasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = UseInputAndSelect(emailEndsCorrectly);

  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "email",
      value: {
        inputValue: emailValue,
        isvalid: !emailHasError,
        blur: emailBlurHandler,
      },
    });
  }, [emailHasError, emailValue, onTakeData,emailBlurHandler]);

  const emailClasses = emailHasError ? classes.invalidEmail : classes.email;

  return (
    <div className={emailClasses}>
      <label htmlFor="email">მეილი</label>
      <input
        type="email"
        id="email"
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        value={emailValue}
      />
      <p>უნდა მთავრდებოდეს @redberry.ge-ით"</p>
    </div>
  );
};

export default EmailInput;
