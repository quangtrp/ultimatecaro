import { useContext } from "react";
import { AppContext } from "../Context/AppProvider";
import Timer from "../Timer/Timer";

import classNames from "classnames/bind";
import styles from "./Control.module.scss";

const cx = classNames.bind(styles);

function ControlContent() {
  const {
    showImage,
    setShowControl,
    setInGame,
    setIsBoardVisible,
    setIsReset,
    isReset,
    setTime,
    setTimerOn,
  } = useContext(AppContext);

  const handleBack = () => {
    setShowControl(false);
    setInGame(false);
    setIsBoardVisible(false);
    setTime(0);
    setTimerOn(true);
  };

  const handleReset = () => {
    setIsReset(!isReset);
    setInGame(true);
    setTime(0);
    setTimerOn(true);
  };

  return (
    <div className={cx("control__content")}>
      {/* Display */}
      <div className={cx("display")}>
        <div
          className={cx(
            "display__image",
            showImage ? { showX: true } : { showO: true }
          )}
        ></div>
        {/* <div className={cx("display__name")}>Phạm Quang Trinh</div> */}
      </div>

      {/* Mode */}
      <div className={cx("mode")}>
        <div className={cx("resetBtn")} onClick={handleReset}>
          Reset
        </div>
        <div className={cx("backBtn")} onClick={handleBack}>
          Back To Choose Mode
        </div>
      </div>

      {/* Time */}
      <div className={cx("time")}>
        <Timer />
      </div>
    </div>
  );
}

export default ControlContent;
