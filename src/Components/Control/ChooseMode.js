import classNames from "classnames/bind";
import { useContext } from "react";
import { AppContext } from "../Context/AppProvider";
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
  } = useContext(AppContext);

  const handleClick = () => {
    setShowControl(true);
    setInGame(true);
    setIsBoardVisible(true);
    setAi(false);
    setCplayer(0);
    setShowImage(false);
  };

  const handleClickAi = () => {
    setShowControl(true);
    setInGame(true);
    setIsBoardVisible(true);
    setAi(true);
    setCplayer(0);
    setShowImage(false);
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
