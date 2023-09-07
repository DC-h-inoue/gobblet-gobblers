// #region import宣言
import { combineReducers, createStore } from 'redux';
import { ActionType } from 'store/game/actions';
import { PIECE_SIZE, PLAYER } from 'utils/constants';
import { Piece, Player } from 'utils/types';
// #endregion

// #region 型定義
type GameState = {
  boardPieces: Piece[][];
  player1Pieces: Piece[];
  player2Pieces: Piece[];
  playingPlayer: Player;
};

type HistoryState = {
  gameHistory: GameState[];
  stepNumber: number;
};
// #endregion

// #region 定数
const INITIAL_GAME_STATE: GameState = {
  boardPieces: Array(9).fill([]),
  player1Pieces: [
    { size: PIECE_SIZE.L, player: PLAYER.P1 },
    { size: PIECE_SIZE.L, player: PLAYER.P1 },
    { size: PIECE_SIZE.M, player: PLAYER.P1 },
    { size: PIECE_SIZE.M, player: PLAYER.P1 },
    { size: PIECE_SIZE.S, player: PLAYER.P1 },
    { size: PIECE_SIZE.S, player: PLAYER.P1 },
  ],
  player2Pieces: [
    { size: PIECE_SIZE.L, player: PLAYER.P2 },
    { size: PIECE_SIZE.L, player: PLAYER.P2 },
    { size: PIECE_SIZE.M, player: PLAYER.P2 },
    { size: PIECE_SIZE.M, player: PLAYER.P2 },
    { size: PIECE_SIZE.S, player: PLAYER.P2 },
    { size: PIECE_SIZE.S, player: PLAYER.P2 },
  ],
  playingPlayer: PLAYER.P1,
};

const INITIAL_HISTORY_STATE: HistoryState = {
  gameHistory: [INITIAL_GAME_STATE],
  stepNumber: 0,
};

const CHANGE_GAME_STATE = 'TEST/CHANGE_GAME_STATE';
const CHANGE_HISTORY_STATE = 'TEST/CHANGE_HISTORY_STATE';
// #endregion

// #region 公開モジュール
/**
 * gameStateを書き換える為のAction Creator
 * @param {GameState} gameState ゲームの進行情報
 * @return {ActionType<GameState>} gameStateを書き換える為のアクション
 */
export function changeGameStateAction(gameState: GameState): ActionType<GameState> {
  return {
    type: CHANGE_GAME_STATE,
    payload: gameState,
  };
}

/**
 * historyStateを書き換える為のAction Creator
 * @param {HistoryState} historyState 履歴情報
 * @return {ActionType<HistoryState>} historyStateを書き換える為のアクション
 */
export function changeHistoryStateAction(historyState: HistoryState): ActionType<HistoryState> {
  return {
    type: CHANGE_HISTORY_STATE,
    payload: historyState,
  };
}

/**
 * テスト用gameReducer
 * @param {GameState} state 更新前のgameStoreのstate
 * @param {ActionType<any>} action アクション
 * @return {GameState} 更新後のgameStoreのstate
 */
const gameReducer = (state = INITIAL_GAME_STATE, action: ActionType<any>) => {
  switch (action.type) {
    case CHANGE_GAME_STATE:
      return action.payload;
    default:
      return state;
  }
};

/**
 * テスト用historyReducer
 * @param {HistoryState} state 更新前のhistoryStoreのstate
 * @param {ActionType<any>} action アクション
 * @return {HistoryState} 更新後のhistoryStoreのstate
 */
const historyReducer = (state = INITIAL_HISTORY_STATE, action: ActionType<any>) => {
  switch (action.type) {
    case CHANGE_HISTORY_STATE:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({ game: gameReducer, history: historyReducer });

const store = createStore(rootReducer);

export default store;
// #endregion
