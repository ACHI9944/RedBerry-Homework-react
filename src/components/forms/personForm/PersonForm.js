import { Fragment, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../button/Button";
import EmailInput from "./inputs/EmailInput";
import FirstNameInput from "./inputs/FirstNameInput";
import LastNameInput from "./inputs/LastNameInput";
import NumberInput from "./inputs/NumberInput";
import classes from "./PersonForm.module.css";
import SelectPosition from "./selects/SelectPosition";
import SelectTeam from "./selects/SelectTeam";

const PersonForm = (props) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/main");
  };

  //function for form submiting
  const submitDataHandler = () => {
    return;
  };

  const [personValues, setPersonValues] = useState({
    firstname: "",
    lastName: "",
    team: "",
    position: "",
    email: "",
    number: "",
  });

  const mergeData = useCallback((value) => {
    setPersonValues((previousValues) => ({
      ...previousValues,
      [value.name]: value.value,
    }));
  }, []);
  console.log(personValues);

  const forwardToNextInfo = (event) => {
    event.preventDefault();

    if (
      personValues.firstname.isvalid &&
      personValues.lastName.isvalid &&
      personValues.team.isvalid &&
      personValues.position.isvalid &&
      personValues.email.isvalid &&
      personValues.number.isvalid
    ) {
      navigate("/add/laptopForm");
    } else {
      personValues.firstname.blur()
      personValues.lastName.blur()
      personValues.team.blur()
      personValues.position.blur()
      personValues.email.blur()
      personValues.number.blur()
    }
  };

  return (
    <Fragment>
      <Button onBack={goBack} />
      <form className={classes.personform} onSubmit={submitDataHandler}>
        <div className={classes.fullname}>
          <FirstNameInput onTakeData={mergeData} />
          <LastNameInput onTakeData={mergeData} />
        </div>
        <SelectTeam team={props.team} onTakeData={mergeData} />
        <SelectPosition positions={props.positions} onTakeData={mergeData} />
        <EmailInput onTakeData={mergeData} />
        <NumberInput onTakeData={mergeData} />
        <div className={classes.forwardButton}>
          <button onClick={forwardToNextInfo}>შემდეგი</button>
        </div>
      </form>
    </Fragment>
  );
};

export default PersonForm;
