// import Login from "./Components/Login/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Components/Main/Main";
import AppProvider from "./Components/Context/AppProvider";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AppProvider>
          <Routes>
            {/* <Route path="/" element={<Login />} /> */}
            <Route path="/" element={<Main />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
