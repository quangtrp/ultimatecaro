import { createContext, useState } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [showImage, setShowImage] = useState(false);
  const [showControl, setShowControl] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [isBoardVisible, setIsBoardVisible] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [ai, setAi] = useState(false);
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(true);
  const [onlyBoard, setOnlyBoard] = useState(false);
  const [onlyControl, setOnlyControl] = useState(true);

  const [stopTime, setStopTime] = useState(0);

  const [cplayer, setCplayer] = useState(0);

  return (
    <AppContext.Provider
      value={{
        showImage,
        setShowImage,
        showControl,
        setShowControl,
        inGame,
        setInGame,
        isBoardVisible,
        setIsBoardVisible,
        isReset,
        setIsReset,
        ai,
        setAi,
        time,
        setTime,
        timerOn,
        setTimerOn,
        stopTime,
        setStopTime,
        cplayer,
        setCplayer,
        onlyBoard,
        setOnlyBoard,
        onlyControl,
        setOnlyControl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
