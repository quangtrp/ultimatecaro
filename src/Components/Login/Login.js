import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { CheckOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Login() {
  const [nameOfPlayer1, setNameOfPlayer1] = useState("");
  const [nameOfPlayer2, setNameOfPlayer2] = useState("");
  const [countChecked, setCountChecked] = useState(0);

  const [checkedPlayer1, setCheckPlayer1] = useState("none");
  const [checkedPlayer2, setCheckPlayer2] = useState("none");

  const navigate = useNavigate();

  const clickSavePlayer1 = () => {
    setCheckPlayer1("flex");
    setCountChecked(countChecked + 1);
  };

  const clickSavePlayer2 = () => {
    setCheckPlayer2("flex");
    setCountChecked(countChecked + 1);
  };

  if (countChecked === 2) {
    navigate("/main", { replace: false });
  }

  const handleChangeNamePlayer1 = (e) => {
    setNameOfPlayer1(e.target.value);
  };

  const handleChangeNamePlayer2 = (e) => {
    setNameOfPlayer2(e.target.value);
  };

  return (
    <div className={cx("login__wrapper")}>
      <div className={cx("player1")}>
        <div className={cx("playerName")}>Tên người chơi O</div>
        <div className={cx("player__container")}>
          <input
            type="text"
            className={cx("nameInput")}
            value={nameOfPlayer1}
            onChange={handleChangeNamePlayer1}
          />
          <button className={cx("saveBtn")} onClick={clickSavePlayer1}>
            Lưu
          </button>
          <CheckOutlined style={{ display: checkedPlayer1 }} />
        </div>
      </div>

      <div className={cx("player2")}>
        <div className={cx("playerName")}>Tên người chơi X</div>
        <div className={cx("player__container")}>
          <input
            type="text"
            className={cx("nameInput")}
            value={nameOfPlayer2}
            onChange={handleChangeNamePlayer2}
          />
          <button className={cx("saveBtn")} onClick={clickSavePlayer2}>
            Lưu
          </button>
          <CheckOutlined style={{ display: checkedPlayer2 }} />
        </div>
      </div>
    </div>
  );
}

export default Login;
