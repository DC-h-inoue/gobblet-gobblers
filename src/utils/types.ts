// #region import宣言
import { PIECE_SIZE, PLAYER } from './constants';
// #endregion

// #region 型定義
export type PieceSize = typeof PIECE_SIZE[keyof typeof PIECE_SIZE];
export type Player = typeof PLAYER[keyof typeof PLAYER];

export type Piece = {
  size: PieceSize;
  player: Player;
};

export type PrevGameState = {
  boardPieces: Piece[][];
  player1Pieces: Piece[];
  player2Pieces: Piece[];
  playingPlayer: Player;
};

// #endregion

// #region 定数
// #endregion
// #region 内部関数
// #endregion
// #region 公開関数
// #endregion
// #region 公開モジュール
// #endregion
