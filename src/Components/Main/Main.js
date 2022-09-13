import classNames from "classnames/bind";
import styles from "./Main.module.scss";

import Board from "../Board/Board";
import Control from "../Control/Control";
import { useContext } from "react";
import { AppContext } from "../Context/AppProvider";
import InvisibleBoard from "../Board/InvisibleBoard";
import useViewport from "../hooks/useViewport";
import Timer from "../Timer/Timer";

const cx = classNames.bind(styles);

function Main() {
  const {
    isReset,
    onlyBoard,
    onlyControl,
    setShowControl,
    setInGame,
    setIsBoardVisible,
    setTime,
    setTimerOn,
    setIsReset,
    setOnlyBoard,
    setOnlyControl,
    showImage,
  } = useContext(AppContext);

  const handleBack = () => {
    setShowControl(false);
    setInGame(false);
    setIsBoardVisible(false);
    setTime(0);
    setTimerOn(true);
    setOnlyBoard(false);
    setOnlyControl(true);
  };

  const handleReset = () => {
    setIsReset(!isReset);
    setInGame(true);
    setTime(0);
    setTimerOn(true);
  };

  const viewPort = useViewport();
  const tabletAndMobile = viewPort.width <= 768;

  if (tabletAndMobile) {
    return (
      <div className={cx("main__container")}>
        {onlyBoard ? (
          isReset ? (
            <div className={cx("responsive__container")}>
              <div className={cx("btn__container")}>
                <div className={cx("backBtn")} onClick={handleBack}>
                  ⬅ Back{" "}
                </div>
                <div className={cx("display")}>
                  <div
                    className={cx(
                      "display__image",
                      showImage ? { showX: true } : { showO: true }
                    )}
                  ></div>
                </div>
                <div className={cx("resetBtn")} onClick={handleReset}>
                  🔄 Reset{" "}
                </div>
              </div>
              <InvisibleBoard size="16" />
              <Timer />
            </div>
          ) : (
            <div className={cx("responsive__container")}>
              <div className={cx("btn__container")}>
                <div className={cx("backBtn")} onClick={handleBack}>
                  ⬅ Back
                </div>
                <div className={cx("display")}>
                  <div
                    className={cx(
                      "display__image",
                      showImage ? { showX: true } : { showO: true }
                    )}
                  ></div>
                </div>
                <div className={cx("resetBtn")} onClick={handleReset}>
                  🔄 Reset{" "}
                </div>
              </div>
              <Board size="16" />
              <div className={cx("timer")}>
                <Timer />
              </div>
            </div>
          )
        ) : null}
        {onlyControl ? <Control /> : null}
      </div>
    );
  }

  // Desktop
  return (
    <div className={cx("main__container")}>
      {isReset ? <InvisibleBoard size="16" /> : <Board size="16" />}
      <Control />
    </div>
  );
}

export default Main;
