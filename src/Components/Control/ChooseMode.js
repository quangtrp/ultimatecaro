import classNames from "classnames/bind";
import { useContext } from "react";
import { AppContext } from "../Context/AppProvider";
import useViewport from "../hooks/useViewport";
import styles from "./Control.module.scss";

const cx = classNames.bind(styles);

function ChooseMode() {
  const {
    setShowControl,
    setInGame,
    setIsBoardVisible,
    setAi,
    setCplayer,
    setShowImage,
    setOnlyBoard,
    setOnlyControl,
  } = useContext(AppContext);

  const viewPort = useViewport();
  const tabletAndMobile = viewPort.width <= 768;

  const handleClick = () => {
    setShowControl(true);
    setInGame(true);
    setIsBoardVisible(true);
    setAi(false);
    setCplayer(0);
    setShowImage(false);

    if (tabletAndMobile) {
      setOnlyBoard(true);
      setOnlyControl(false);
    }
  };

  const handleClickAi = () => {
    setShowControl(true);
    setInGame(true);
    setIsBoardVisible(true);
    setAi(true);
    setCplayer(0);
    setShowImage(false);

    if (tabletAndMobile) {
      setOnlyBoard(true);
      setOnlyControl(false);
    }
  };

  return (
    <div className={cx("mode__container")}>
      <div className={cx("pvsp")} onClick={handleClick}>
        Player Vs Player
      </div>
      <div className={cx("pvsc")} onClick={handleClickAi}>
        Player Vs Computer
      </div>
    </div>
  );
}

export default ChooseMode;
