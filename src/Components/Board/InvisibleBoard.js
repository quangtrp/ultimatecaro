import classNames from "classnames/bind";
import styles from "./Board.module.scss";
import { AppContext } from "../Context/AppProvider";

import Row from "./Row";
import { useContext } from "react";

const cx = classNames.bind(styles);

function InvisibleBoard({ size }) {
  const { isBoardVisible } = useContext(AppContext);

  let board = [];

  function load() {
    if (isBoardVisible) {
      for (let y = 0; y < size; y++) {
        board.push(<Row y={y} size={size} />);
      }
      return board;
    } else {
      board = [];
      return board;
    }
  }

  return (
    <div className={cx("board")}>
      {load().map((row, index) => {
        return <div key={index}>{row}</div>;
      })}
    </div>
  );
}

export default InvisibleBoard;
