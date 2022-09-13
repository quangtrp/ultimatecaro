import classNames from "classnames/bind";
import styles from "./Main.module.scss";

import Board from "../Board/Board";
import Control from "../Control/Control";
import { useContext } from "react";
import { AppContext } from "../Context/AppProvider";
import InvisibleBoard from "../Board/InvisibleBoard";

const cx = classNames.bind(styles);

function Main() {
  const { isReset } = useContext(AppContext);

  return (
    <div className={cx("main__container")}>
      {isReset ? <InvisibleBoard size="16" /> : <Board size="16" />}
      <Control />
    </div>
  );
}

export default Main;
