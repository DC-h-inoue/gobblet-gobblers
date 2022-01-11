// #region import宣言
import { Piece } from 'utils/types';

// #endregion

// #region 型定義
export type ActionType<T> = {
  type: string;
  payload: T;
};

export type MovePiecePayload = {
  piece: Piece;
  toIndex: number;
  fromIndex?: number;
};
// #endregion

// #region 定数
export const MOVE_PIECE_FROM_STAND = 'BOARD/MOVE_PIECE_FROM_STAND';
export const MOVE_PIECE_ON_BOARD = 'BOARD/MOVE_PIECE_ON_BOARD';
// #endregion
// #region 内部関数
// #endregion
// #region 公開関数

/**
 * 駒置き場からの駒を移動するアクション
 * @param piece 移動させた駒の情報
 * @param moveToIndex 移動元のマスの位置
 */
export function movePieceFromStandAction(
  piece: Piece,
  moveToIndex: number
): ActionType<MovePiecePayload> {
  return {
    type: MOVE_PIECE_FROM_STAND,
    payload: { piece, toIndex: moveToIndex },
  };
}

/**
 * 盤上の駒を移動するアクション
 * @param piece 移動させた駒の情報
 * @param moveToIndex 移動先のマスの位置
 * @param moveFromIndex 移動元のマスの位置
 */
export function movePieceStandOnBoardAction(
  piece: Piece,
  moveToIndex: number,
  moveFromIndex: number
): ActionType<MovePiecePayload> {
  return {
    type: MOVE_PIECE_ON_BOARD,
    payload: { piece, toIndex: moveToIndex, fromIndex: moveFromIndex },
  };
}

// #endregion
// #region 公開モジュール
// #endregion
