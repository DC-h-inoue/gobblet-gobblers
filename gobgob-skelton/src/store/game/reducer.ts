// #region import宣言
import { PIECE_SIZE, PLAYER } from 'utils/constants';
import { Piece, Player } from 'utils/types';
import {
  ActionType,
  GO_BACK_TO_PREV_BOARD,
  MOVE_PIECE_FROM_STAND,
  MOVE_PIECE_ON_BOARD,
} from './actions';
// #endregion

// #region 型定義
type GameState = {
  boardPieces: Piece[][];
  player1Pieces: Piece[];
  player2Pieces: Piece[];
  playingPlayer: Player;
};
// #endregion
// #region 定数
const INITIAL_STATE: GameState = {
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
// #endregion
// #region 内部関数

// #endregion
// #region 公開関数

// #endregion
// #region 公開モジュール
export function reducer(state = INITIAL_STATE, action: ActionType<any>): GameState {
  switch (action.type) {
    // #region MOVE_PIECE_FROM_STAND
    case MOVE_PIECE_FROM_STAND: {
      // 盤面情報の新規作成
      const newBoardPieces = state.boardPieces.map((squarePieces, index) =>
        index === action.payload.toIndex ? [...squarePieces, action.payload.piece] : squarePieces
      );

      // 駒置き場の情報の新規作成
      const playerPieces =
        action.payload.piece.player === PLAYER.P1 ? state.player1Pieces : state.player2Pieces;
      const newPlayerPieces = [...playerPieces];
      newPlayerPieces.splice(
        playerPieces.findIndex((element) => element.size === action.payload.piece.size),
        1
      );

      // 現在の手番情報の新規作成
      const newPlayingPlayer = state.playingPlayer === PLAYER.P1 ? PLAYER.P2 : PLAYER.P1;

      // 動かされた駒の情報に応じた駒置き場の情報の更新
      return action.payload.piece.player === PLAYER.P1
        ? {
            ...state,
            boardPieces: newBoardPieces,
            player1Pieces: newPlayerPieces,
            playingPlayer: newPlayingPlayer,
          }
        : {
            ...state,
            boardPieces: newBoardPieces,
            player2Pieces: newPlayerPieces,
            playingPlayer: newPlayingPlayer,
          };
    }
    // #endregion

    // #region MOVE_PIECE_ON_BOARD
    case MOVE_PIECE_ON_BOARD: {
      // 盤面情報の新規作成
      const newBoardPieces = state.boardPieces.map((squarePieces, index) => {
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
      const newPlayingPlayer = state.playingPlayer === PLAYER.P1 ? PLAYER.P2 : PLAYER.P1;

      return { ...state, boardPieces: newBoardPieces, playingPlayer: newPlayingPlayer };
    }
    // #endregion

    // #region GO_BACK_TO_PREV_BOARD
    case GO_BACK_TO_PREV_BOARD: {
      return {
        ...state,
        boardPieces: action.payload.boardPieces,
        player1Pieces: action.payload.player1Pieces,
        player2Pieces: action.payload.player2Pieces,
        playingPlayer: action.payload.playingPlayer,
      };
    }
    // #endregion

    default: {
      return state;
    }
  }
}

// #endregion
