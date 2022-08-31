import { useEffect, useReducer, useState } from "react";

//Default functions for checking input validity

const isExactNumbers = (value) => value.toString().trim().length === 13;
const startsCorrectly = (value) => {
  const numStart = value.trim().toString().slice(0, 5);
  const validStart = "+9955";
  if (numStart === validStart) {
    return true;
  } else {
    return false;
  }
};

// Reducer for number input
const initialInputState = {
  value: "",
  isTouched: false,
  numStartsCorrectly: false,
  numIsExactNumbers: false,
  isValid: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isTouched: true,
      isValid: startsCorrectly(action.value) && isExactNumbers(action.value),
    };
  }
  if (action.type === "BLUR") {
    return {
      value: state.value,
      isTouched: true,
      isValid: state.isValid,
    };
  }
  if (action.type === "RESET") {
    return {
      value: "",
      isTouched: false,
      isValid: false,
    };
  }
  return initialInputState;
};

const UseNumberInput = () => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };
  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  const valueComment = "უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს";
  const valueHasError = !inputState.isValid && inputState.isTouched;

  //using useEffect to avoid unnecessary rerenderings while typing
  const [inputHasError, setInputHasError] = useState(false);
  const [inputcomment, setInputComment] = useState(null);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setInputHasError(valueHasError);
      setInputComment(valueComment);
    }, 1);
    return () => {
      clearTimeout(identifier);
    };
  }, [valueHasError, valueComment]);


  return {
    value: inputState.value,
    comment: inputcomment,
    valueHasError:inputHasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default UseNumberInput;
