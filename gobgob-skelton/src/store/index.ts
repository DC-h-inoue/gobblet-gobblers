// #region import宣言
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { reducer as gameReducer } from "./game/reducer";
// #endregion
// #region 型定義
interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}
declare var window: ExtendedWindow;

const composeReduxDevToolsEnhancers =
  (typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export type RootState = ReturnType<typeof store.getState>;

declare module "react-redux" {
  interface DefaultRootState extends RootState {}
}
// #endregion
// #region 定数
// #endregion
// #region 内部関数
// #endregion
// #region 公開関数
// #endregion
// #region 公開モジュール

const rootReducer = combineReducers({ game: gameReducer });

const store = createStore(
  rootReducer,
  composeReduxDevToolsEnhancers(applyMiddleware())
);

export default store;
// #endregion
