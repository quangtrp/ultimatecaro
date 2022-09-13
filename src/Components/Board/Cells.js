import classNames from "classnames/bind";
import { useContext, useState } from "react";
import { AppContext } from "../Context/AppProvider";
import styles from "./Board.module.scss";
import background from "../../Assets/Images/Xpng.png";

const cx = classNames.bind(styles);
let countmax = 5;
let A_Atk = [0, 2, 4, 20, 100, 105, 110, 115, 120, 130];
let A_Def = [0, 1, 3, 15, 55, 56, 57, 58, 60, 62];
let l_win = [];
let mode = 1;

function Cells({ id, size }) {
  const [playedO, setPlayedO] = useState(false);
  const [playedX, setPlayedX] = useState(false);
  const {
    setShowImage,
    inGame,
    setInGame,
    ai,
    time,
    setTimerOn,
    cplayer,
    setCplayer,
  } = useContext(AppContext);

  //   Click
  const handleClick = () => {
    let square = document.getElementsByClassName("square");
    let pos = parseInt(id);

    if (!inGame) {
      return;
    }

    if (square.item(pos).getAttribute("player") !== "-1") {
      return;
    }
    setPlayedO(true);

    square.item(pos).setAttribute("player", cplayer.toString());

    let win = WinGame();
    let pwin = cplayer;

    if (!ai) {
      if (cplayer === 0) {
        setPlayedO(true);
        setShowImage(true);
      } else {
        setPlayedX(true);
        setShowImage(false);
      }

      if (cplayer === 0) setCplayer(1);
      else setCplayer(0);
    } else {
      if (!win) {
        AIMode();
        win = WinGame();
        pwin = 1;
      }
    }

    if (win) {
      setTimerOn(false);

      let mess;

      if (pwin === 1) {
        mess = `Người chơi 'X' đã thắng với thời gian là ${(
          "0" + Math.floor((time / 60000) % 60)
        ).slice(-2)} phút ${("0" + Math.floor((time / 1000) % 60)).slice(
          -2
        )} giây`;
      }
      if (pwin === 0) {
        mess = `Người chơi 'O' đã thắng với thời gian là ${(
          "0" + Math.floor((time / 60000) % 60)
        ).slice(-2)} phút ${("0" + Math.floor((time / 1000) % 60)).slice(
          -2
        )} giây`;
      }
      alert(mess);
      setInGame(false);
    }
  };

  const getBoard = () => {
    let wholeBoard = [];

    let sqr = document.getElementsByClassName("square");

    for (let i = 0; i < size * size; i++) {
      wholeBoard.push(parseInt(sqr.item(i).getAttribute("player")));
    }
    return wholeBoard;
  };

  // Min Max
  const minab = (a, b) => {
    if (a < b) return a;
    else return b;
  };

  //   Win Dir
  const winHor = (x, y, Board) => {
    l_win = [];

    let count = 0;
    let countOp = 0; // count opponent
    let player = Board[x + y * size];

    if (player === -1) {
      return false;
    }

    if (x > 0) {
      let p = Board[x - 1 + y * size];
      if (p !== player && p !== -1) {
        countOp++;
      }
    }

    for (let i = x; i < size; i++) {
      let p = Board[i + y * size];
      if (p === player && p !== -1) {
        count++;
        l_win.push(i + y * size);
      } else {
        if (p !== -1) {
          countOp++;
        }
        break;
      }
    }

    if (count >= countmax) {
      if (mode === 0) return true;
      else {
        if (countOp >= 2) return false;
        else return true;
      }
    }
    return false;
  };

  const winVer = (x, y, Board) => {
    l_win = [];
    let count = 0;
    let countOp = 0;
    let player = Board[x + y * size];

    if (player === -1) {
      return false;
    }

    if (y > 0) {
      let p = Board[x + (y - 1) * size];
      if (p !== player && p !== -1) {
        countOp++;
      }
    }

    for (let i = y; i < size; i++) {
      let p = Board[x + i * size];
      if (p === player && p !== -1) {
        count++;
        l_win.push(x + i * size);
      } else {
        if (p !== -1) {
          countOp++;
        }
        break;
      }
    }

    if (count >= countmax) {
      if (mode === 0) {
        return true;
      } else {
        if (countOp >= 2) {
          return false;
        } else {
          return true;
        }
      }
    }
    return false;
  };

  const winCross1 = (x, y, Board) => {
    l_win = [];

    if (x > size - countmax || y < countmax - 1) {
      return false;
    }

    let count = 0;
    let countOp = 0;
    let player = Board[x + y * size];

    if (player === -1) {
      return false;
    }

    if (y < size - 1 && x > 0) {
      let p = Board[x - 1 + (y + 1) * size];

      if (p !== player && p !== -1) {
        countOp++;
      }
    }

    for (let i = 0; i <= minab(size - x, y); i++) {
      let p = Board[x + i + (y - i) * size];
      if (p === player && p !== -1) {
        count++;
        l_win.push(x + i + (y - i) * size);
      } else {
        if (p !== -1) {
          countOp++;
        }
        break;
      }
    }

    if (count >= countmax) {
      if (mode === 0) {
        return true;
      } else {
        if (countOp >= 2) {
          return false;
        } else {
          return true;
        }
      }
    }
    return false;
  };

  const winCross2 = (x, y, Board) => {
    l_win = [];
    if (x > size - countmax || y > size - countmax) {
      return false;
    }

    let count = 0;
    let countOp = 0;
    let player = Board[x + y * size];

    if (player === -1) {
      return false;
    }

    if (y > 0 && x > 0) {
      let p = Board[x - 1 + (y - 1) * size];
      if (p !== player && p !== -1) {
        countOp++;
      }
    }

    for (let i = 0; i < minab(size - x, size - y); i++) {
      let p = Board[x + i + (y + i) * size];
      if (p === player && p !== -1) {
        count++;
        l_win.push(x + i + (y + i) * size);
      } else {
        if (p !== -1) {
          countOp++;
        }
        break;
      }
    }
    if (count >= countmax) {
      if (mode === 0) {
        return true;
      } else {
        if (countOp >= 2) {
          return false;
        } else {
          return true;
        }
      }
    }
    return false;
  };

  //   Win Game

  const WinGame = () => {
    let result = false;
    let Board = getBoard();

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        if (
          winHor(x, y, Board) ||
          winVer(x, y, Board) ||
          winCross1(x, y, Board) ||
          winCross2(x, y, Board)
        ) {
          l_win.forEach((won) => {
            let selectedSqr = document.getElementById(won.toString());
            selectedSqr.style.backgroundColor = "yellow";
          });

          result = true;
        }
      }
    }
    return result;
  };

  // AI MODE

  function AIMode() {
    if (!inGame) return;
    let vmax = -Infinity;
    let px,
      py = -1;
    let TBoard = getBoard();
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (TBoard[x + y * size] === -1) {
          TBoard[x + y * size] = 1;
          let mark = GetMark(x, y, TBoard);
          TBoard[x + y * size] = -1;
          if (mark > vmax) {
            px = x;
            py = y;
            vmax = mark;
          }
        }
      }
    }
    try {
      let sqr = document.getElementsByClassName("square");

      sqr.item(px + py * size).setAttribute("player", "1");
      sqr.item(py + px * size).style.backgroundImage =
        "url(" + background + ")";
      sqr.item(py + px * size).style.backgroundSize = "cover";
    } catch (e) {
      alert(e.message);
    }
  }

  function GetMark(x, y, Tboard) {
    let val = Tboard[x + y * size];
    if (val === -1) return 0;

    let result =
      A_Atk[GetMarkHor(x, y, Tboard, 1)] +
      A_Atk[GetMarkVer(x, y, Tboard, 1)] +
      A_Atk[GetMarkCross1(x, y, Tboard, 1)] +
      A_Atk[GetMarkCross2(x, y, Tboard, 1)];

    result +=
      A_Def[GetMarkHor(x, y, Tboard, 0)] +
      A_Def[GetMarkVer(x, y, Tboard, 0)] +
      A_Def[GetMarkCross1(x, y, Tboard, 0)] +
      A_Def[GetMarkCross2(x, y, Tboard, 0)];

    return result;
  }

  function GetMarkHor(x, y, TBoard, player) {
    let count = 0,
      counto = 0;
    for (let i = x - 1; i > 0; i--) {
      if (TBoard[i + y * size] === player) count++;
      else {
        if (TBoard[i + y * size] !== -1) counto++;
        break;
      }
    }
    for (let i = x + 1; i < size; i++) {
      if (TBoard[i + y * size] === player) count++;
      else {
        if (TBoard[i + y * size] !== -1) counto++;
        break;
      }
    }
    if (mode === 1 && counto >= 2) return 0;
    if ((x === 0 || x === size - 1) && count < 4) counto++;
    if (count <= counto) return 0;
    else if (count - counto >= 3) return count + counto;
    else return count - counto;
  }

  function GetMarkVer(x, y, TBoard, player) {
    let count = 0,
      counto = 0;
    for (let i = y - 1; i > 0; i--) {
      if (TBoard[x + i * size] === player) count++;
      else {
        if (TBoard[x + i * size] !== -1) counto++;
        break;
      }
    }
    for (let i = y + 1; i < size; i++) {
      if (TBoard[x + i * size] === player) count++;
      else {
        if (TBoard[x + i * size] !== -1) counto++;
        break;
      }
    }
    if (mode === 1 && counto >= 2) return 0;
    if ((y === 0 || y === size - 1) && count < 4) counto++;
    if (count <= counto) return 0;
    else if (count - counto >= 3) return count + counto;
    else return count - counto;
  }

  function GetMarkCross1(x, y, TBoard, player) {
    let count = 0,
      counto = 0;
    for (let i = 1; i < minab(size - x, y + 1); i++) {
      if (TBoard[x + i + (y - i) * size] === player) count++;
      else {
        if (TBoard[x + i + (y - i) * size] !== -1) counto++;
        break;
      }
    }
    for (let i = 1; i < minab(x + 1, size - y); i++) {
      if (TBoard[x - i + (y + i) * size] === player) count++;
      else {
        if (TBoard[x - i + (y + i) * size] !== -1) counto++;
        break;
      }
    }
    if (mode === 1 && counto >= 2) return 0;
    if ((x === 0 || x === size - 1 || y === 0 || y === size - 1) && count < 4)
      counto++;
    if (count <= counto) return 0;
    else if (count - counto >= 3) return count + counto;
    else return count - counto;
  }

  function GetMarkCross2(x, y, TBoard, player) {
    let count = 0,
      counto = 0;
    for (let i = 1; i < minab(x + 1, y + 1); i++) {
      if (TBoard[x - i + (y - i) * size] === player) count++;
      else {
        if (TBoard[x - i + (y - i) * size] !== -1) counto++;
        break;
      }
    }
    for (let i = 1; i < minab(size - x, size - y); i++) {
      if (TBoard[x + i + (y + i) * size] === player) count++;
      else {
        if (TBoard[x + i + (y + i) * size] !== -1) counto++;
        break;
      }
    }
    if (mode === 1 && counto >= 2) return 0;
    if ((x === 0 || x === size - 1 || y === 0 || y === size - 1) && count < 4)
      counto++;
    if (count <= counto) return 0;
    else if (count - counto >= 3) return count + counto;
    else return count - counto;
  }

  return (
    <div
      className={cx("cell", {
        playedO: playedO,
        playedX: playedX,
        square: true,
      })}
      onClick={handleClick}
      id={id}
      player="-1"
    ></div>
  );
}

export default Cells;
