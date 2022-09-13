import classNames from "classnames/bind";
import { useContext } from "react";
import { AppContext } from "../Context/AppProvider";
import ChooseMode from "./ChooseMode";
import styles from "./Control.module.scss";
import ControlContent from "./ControlContent";

const cx = classNames.bind(styles);

function Control() {
  const { showControl } = useContext(AppContext);

  return (
    <div className={cx("control__container")}>
      <div className={cx("control__wrapper")}>
        {showControl === false ? <ChooseMode /> : ""}
        {showControl ? <ControlContent /> : ""}
      </div>
    </div>
  );
}

export default Control;
