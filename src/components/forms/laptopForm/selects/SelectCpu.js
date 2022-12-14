import { useEffect } from "react";
import UseInputAndSelect from "../../../hooks/UseInputAndSelect";
import OptionCpu from "./OptionCpu";
import classes from "./SelectCpu.module.css";

//function for Checking input validity
const isNotEmpty = (value) => value.trim().length > 0;

const SelectCpu = (props) => {
  //Destructuring data from custom hook 'UseInputAndSelect'
  const {
    value: CpuValue,
    valueHasError: CpusHasError,
    valueIsTouched: CpuIsTouched,
    valueChangeHandler: CpusChangeHandler,
    inputBlurHandler: CpusBlurHandler,
    setLocalStorage
  } = UseInputAndSelect(isNotEmpty);

  //Using useffects to put input value in local storage and take it out when page refreshed
  useEffect(() => {
    const storedValues = localStorage.getItem("cpuValue");
    if (storedValues) {
      const parsed = JSON.parse(storedValues);
      setLocalStorage(parsed);
    } else return;
  }, [setLocalStorage]);

  useEffect(() => {
    localStorage.setItem("cpuValue", JSON.stringify(CpuValue));
  }, [CpuValue]);



  //Function to take data to the parent component, including functions to blur
  const { onTakeData } = props;
  useEffect(() => {
    onTakeData({
      name: "laptop_cpu",
      value: {
        inputValue: CpuValue,
        isvalid: !CpusHasError && CpuIsTouched,
        blur: CpusBlurHandler,
      },
    });
  }, [onTakeData, CpuValue, CpusHasError, CpuIsTouched, CpusBlurHandler]);

  //Variable to change  input classes depending on value validity.
  const selectClasses = CpusHasError ? classes.invalidCpus : classes.Cpus;

  //Variable to set starting value
  const defaultValue = CpuValue? CpuValue : 'CPU'
  return (
    <select
      className={selectClasses}
      name="CPU"
      value={defaultValue}
      onChange={CpusChangeHandler}
      onBlur={CpusBlurHandler}
    >
      <option value="CPU" disabled hidden>
        CPU
      </option>
      {props.Cpus.map((item) => (
        <OptionCpu key={item.id} value={item.name} />
      ))}
    </select>
  );
};

export default SelectCpu;
