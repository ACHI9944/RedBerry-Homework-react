import classes from "./Completed.module.css";
import img from "../pictures/completed.PNG";
import { useNavigate } from "react-router-dom";

const Completed = () => {
  const navigate = useNavigate();

  const addDataToList = () => {
    navigate('/list')
  };

  const backToMainPage = () => {
    navigate('/main')
  };

  return (
    <div className={classes.layer}>
      <div className={classes.completed}>
        <img src={img} alt="img"></img>
        <h4>ჩანაწერი დამატებულია</h4>
        <button className={classes.addToList} onClick={addDataToList}>
          სიაში გადაყვანა
        </button>
        <button className={classes.backToMain} onClick={backToMainPage}>
          მთავარი
        </button>
      </div>
    </div>
  );
};

export default Completed;