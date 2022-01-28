// #region import宣言
import { Piece } from 'utils/types';

// #endregion

// #region 型定義
export type ActionType<T> = {
  type: string;
  payload: T;
};

type MovePiecePayload = {
  piece: Piece;
  toIndex: number;
  fromIndex?: number;
};
// #endregion

// #region 定数
export const RECORD_HISTORY_FROM_PIECE_STAND = 'HISTORY/RECORD_HISTORY_FROM_PIECE_STAND';
export const RECORD_HISTORY_ON_BOARD = 'HISTORY/RECORD_HISTORY_ON_BOARD';
export const UPDATE_STEP_NUMBER = 'HISTORY/UPDATE_STEP_NUMBER';
export const DELETE_HISTORY = 'HISTORY/DELETE_HISTORY';
// #endregion
// #region 内部関数
// #endregion
// #region 公開関数

/**
 * ゲームの進行履歴の記録アクション。
 * 駒置き場から盤上への駒の操作が行われた際に、ゲームの進行履歴を記録する。
 * @param {Piece} piece 移動させた駒の情報
 * @param {number} moveToIndex 移動元のマスの位置
 */
export function recordHistoryFromPieceStandAction(
  piece: Piece,
  moveToIndex: number
): ActionType<MovePiecePayload> {
  return {
    type: RECORD_HISTORY_FROM_PIECE_STAND,
    payload: { piece, toIndex: moveToIndex },
  };
}

/**
 * ゲームの進行履歴の記録アクション。
 * 盤上から盤上への駒の操作が行われた際に、ゲームの進行履歴を記録する。
 * @param {Piece} piece 移動させた駒の情報
 * @param {number} moveToIndex 移動先のマスの位置
 * @param {number} moveFromIndex 移動元のマスの位置
 */
export function recordHistoryOnBoardAction(
  piece: Piece,
  moveToIndex: number,
  moveFromIndex: number
): ActionType<MovePiecePayload> {
  return {
    type: RECORD_HISTORY_ON_BOARD,
    payload: { piece, toIndex: moveToIndex, fromIndex: moveFromIndex },
  };
}

/**
 * ゲームの進行情報の更新アクション
 * @param {GameState} gameState 更新後のゲームの進行情報。
 */
export function updateStepNumberAction(stepNumber: number): ActionType<number> {
  return {
    type: UPDATE_STEP_NUMBER,
    payload: stepNumber,
  };
}

/**
 * ゲームの進行履歴の削除アクション
 */
export function deleteHistory(): ActionType<undefined> {
  return {
    type: DELETE_HISTORY,
    payload: undefined,
  };
}

// #endregion
// #region 公開モジュール
// #endregion
