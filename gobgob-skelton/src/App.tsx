// #region import宣言
import { Divider } from "@mui/material";
import { Provider } from "react-redux";

import GGGame from "UI/Game/GGGame";
import store from "./store";
import "./App.scss";
// #endregion
// #region 型定義
// #endregion
// #region 定数
// #endregion
// #region 内部関数
// #endregion
// #region 公開関数
// #endregion

// #region 公開モジュール
function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-title">GOBBLET GOBBLERS</div>
      </header>
      <Divider />
      <div className="app-body">
        <Provider store={store}>
          <GGGame />
        </Provider>
      </div>
    </div>
  );
}

export default App;
// #endregion
