import classNames from "classnames/bind";
import { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppProvider";
import styles from "./Timer.module.scss";

const cx = classNames.bind(styles);

function Timer() {
  const { timerOn, time, setTime } = useContext(AppContext);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn, setTime]);

  return (
    <div className={cx("timer__container")}>
      <div className={cx("time__display")}>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
      </div>
    </div>
  );
}

export default Timer;
