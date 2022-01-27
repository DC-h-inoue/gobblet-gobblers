// #region import宣言
import { PIECE_SIZE, PLAYER } from 'utils/constants';
import { PrevGameState } from 'utils/types';
import {
  ActionType,
  DELETE_HISTORY,
  RECORD_HISTORY_FROM_PIECE_STAND,
  RECORD_HISTORY_ON_BOARD,
  UPDATE_STEP_NUMBER,
} from './actions';
// #endregion

// #region 型定義
type HistoryState = {
  gameHistory: PrevGameState[];
  stepNumber: number;
};
// #endregion
// #region 定数
const INITIAL_STATE: HistoryState = {
  gameHistory: [
    {
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
    },
  ],
  stepNumber: 0,
};
// #endregion
// #region 内部関数

// #endregion
// #region 公開関数

// #endregion
// #region 公開モジュール
export function reducer(state = INITIAL_STATE, action: ActionType<any>): HistoryState {
  switch (action.type) {
    // #region RECORD_HISTORY_ON_BOARD
    case RECORD_HISTORY_ON_BOARD: {
      // 現在表示中の盤面の情報
      const nowGameState = state.gameHistory[state.stepNumber];

      // 盤面情報の新規作成
      const newBoardPieces = nowGameState.boardPieces.map((squarePieces, index) => {
        // 駒の移動先のマスの配置履歴を更新
        if (index === action.payload.toIndex) {
          return [...squarePieces, action.payload.piece];
        }
        // 駒の移動元のマスの配置履歴を更新
        else if (index === action.payload.fromIndex) {
          return squarePieces.slice(0, squarePieces.length - 1);
        } else {
          return squarePieces;
        }
      });

      // 現在の手番情報の新規作成
      const newPlayingPlayer = nowGameState.playingPlayer === PLAYER.P1 ? PLAYER.P2 : PLAYER.P1;

      // 現在表示中の盤面の手順情報の新規作成
      const newStepNumber = state.stepNumber + 1;

      return {
        gameHistory: [
          ...state.gameHistory.slice(0, state.stepNumber + 1),
          {
            ...nowGameState,
            boardPieces: newBoardPieces,
            playingPlayer: newPlayingPlayer,
          },
        ],
        stepNumber: newStepNumber,
      };
    }
    // #endregion

    // #region
    case RECORD_HISTORY_FROM_PIECE_STAND: {
      // 現在表示中の盤面の情報
      const nowGameState = state.gameHistory[state.stepNumber];

      // 盤面情報の新規作成
      const newBoardPieces = nowGameState.boardPieces.map((squarePieces, index) =>
        index === action.payload.toIndex ? [...squarePieces, action.payload.piece] : squarePieces
      );

      // 駒置き場の情報の新規作成
      const playerPieces =
        action.payload.piece.player === PLAYER.P1
          ? nowGameState.player1Pieces
          : nowGameState.player2Pieces;
      const newPlayerPieces = [...playerPieces];
      newPlayerPieces.splice(
        playerPieces.findIndex((element) => element.size === action.payload.piece.size),
        1
      );

      // 現在の手番情報の新規作成
      const newPlayingPlayer = nowGameState.playingPlayer === PLAYER.P1 ? PLAYER.P2 : PLAYER.P1;

      // 現在表示中の盤面の手順情報の新規作成
      const newStepNumber = state.stepNumber + 1;

      // 動かされた駒の情報に応じた駒置き場の情報の更新
      return action.payload.piece.player === PLAYER.P1
        ? {
            gameHistory: [
              ...state.gameHistory.slice(0, state.stepNumber + 1),
              {
                ...nowGameState,
                boardPieces: newBoardPieces,
                player1Pieces: newPlayerPieces,
                playingPlayer: newPlayingPlayer,
              },
            ],
            stepNumber: newStepNumber,
          }
        : {
            gameHistory: [
              ...state.gameHistory.slice(0, state.stepNumber + 1),
              {
                ...nowGameState,
                boardPieces: newBoardPieces,
                player2Pieces: newPlayerPieces,
                playingPlayer: newPlayingPlayer,
              },
            ],
            stepNumber: newStepNumber,
          };
    }
    // #endregion

    // #region UPDATE_STEP_NUMBER
    case UPDATE_STEP_NUMBER: {
      // stepNumberのみを指定された値に更新する
      return {
        ...state,
        stepNumber: action.payload,
      };
    }
    // #endregion

    // #region DELETE_HISTORY
    case DELETE_HISTORY: {
      return INITIAL_STATE;
    }
    // #endregion

    default: {
      return state;
    }
  }
}

// #endregion
