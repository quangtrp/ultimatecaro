import classNames from "classnames/bind";
import Cells from "./Cells";
import styles from "./Board.module.scss";

const cx = classNames.bind(styles);

function Row({ size, y }) {
  const row = [];

  for (let i = 0; i < size; i++) {
    row.push(<Cells id={y + i * size} size={size} player="-1" />);
  }

  return (
    <div className={cx("row")}>
      {row.map((square, index) => {
        return <div key={index}>{square}</div>;
      })}
    </div>
  );
}

export default Row;
