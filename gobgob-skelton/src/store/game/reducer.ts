// #region import宣言
import { PIECE_SIZE, PLAYER } from 'utils/constants';
import { Piece } from 'utils/types';
import { ActionType, MOVE_PIECE_FROM_STAND, MOVE_PIECE_ON_BOARD } from './actions';
// #endregion

// #region 型定義
type GameState = {
  boardPieces: Piece[][];
  player1Pieces: Piece[];
  player2Pieces: Piece[];
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
};
// #endregion
// #region 内部関数

// #endregion
// #region 公開関数

// #endregion
// #region 公開モジュール
export function reducer(state = INITIAL_STATE, action: ActionType<any>) {
  switch (action.type) {
    // #region MOVE_PIECE_FROM_STAND
    case MOVE_PIECE_FROM_STAND: {
      // 盤面情報の新規作成
      const newBoardPieces = state.boardPieces.map((piece, index) =>
        index === action.payload.toIndex ? [...piece, action.payload.piece] : piece
      );

      // 駒置き場の情報の新規作成
      const playerPieces =
        action.payload.piece.player === PLAYER.P1 ? state.player1Pieces : state.player2Pieces;
      const newPlayerPieces = playerPieces.map((piece) => piece);
      newPlayerPieces.splice(
        playerPieces.findIndex((element) => element === action.payload.piece),
        1
      );

      // 動かされた駒の情報に応じた駒置き場の情報の更新
      return action.payload.piece.player === PLAYER.P1
        ? { ...state, boardPieces: newBoardPieces, player1Pieces: newPlayerPieces }
        : { ...state, boardPieces: newBoardPieces, player2Pieces: newPlayerPieces };
    }
    // #endregion

    // #region MOVE_PIECE_ON_BOARD
    case MOVE_PIECE_ON_BOARD: {
      const newBoardPieces = state.boardPieces.map((piece, index) => {
        if (index === action.payload.toIndex) {
          return [...piece, action.payload.piece];
        } else if (index === action.payload.fromIndex) {
          return piece.slice(0, piece.length - 1);
        } else {
          return piece;
        }
      });

      return { ...state, boardPieces: newBoardPieces };
    }
    // #endregion

    default: {
      return state;
    }
  }
}

// #endregion
