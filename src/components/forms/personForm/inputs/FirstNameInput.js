import UseInputAndSelect from "../../useHook/UseInputAndSelect";
import classes from "./FirstnameLastname.module.css";

const isMoreThanTwoLetters = (value) => value.trim().length > 2;
const isGeorgian = (value) => {
  const regex = /[^\u10A0-\u10FF]/ig;
  const allIsNotGeorgian = value.trim().match(regex);
  if (allIsNotGeorgian) {
    return false;
  } else {
    return true;
  }
};
const isValueValid = (value) => {
  if (isMoreThanTwoLetters(value) && isGeorgian(value)) {
    return true;
  } else {
    return false;
  }
};

const FirstNameInput = () => {
  const {
    value: firstNameValue,
    valueHasError: firstNameHasError,
    valueIsTouched: firstnameIsTouched,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = UseInputAndSelect(isValueValid);

  const isGeo = isGeorgian(firstNameValue);
  const isMoreTwo = isMoreThanTwoLetters(firstNameValue);
  const checker = function (state) {
    let valueComment = "მინიმუმ 2 სიმბოლო, ქართული ასოები";
    if (!isGeo && isMoreTwo && firstnameIsTouched) {
      valueComment = "გამოიყენე ქართული ასოები";
    } else if (!isMoreTwo && isGeo &&   firstnameIsTouched) {
      valueComment = "მინიმუმ 2 სიმბოლო";
    }  
    return { valueComment };
  };
  const { valueComment : firstNameComment } = checker(firstNameValue);

  const firstNameClasses = firstNameHasError
    ? classes.invalidnames
    : classes.names;

  return (
    <div className={firstNameClasses}>
      <label htmlFor="name">სახელი</label>
      <input
        type="text"
        id="name"
        onChange={firstNameChangeHandler}
        onBlur={firstNameBlurHandler}
        value={firstNameValue}
      />
      <p>{firstNameComment}</p>
    </div>
  );
};
export default FirstNameInput;