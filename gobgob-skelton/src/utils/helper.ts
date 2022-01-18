// #region import宣言
import { PIECE_SIZE } from './constants';
import { Piece } from './types';
// #endregion
// #region 型定義
// #endregion
// #region 定数
// #endregion
// #region 内部関数
// #endregion
// #region 公開関数

/**
 * 駒が移動可能か検証する
 * @param movedPiece 移動させる駒
 * @param placedPiece マスに置いてある駒
 * @returns 移動可能ならtrue, 不可ならfalseを返す
 */
export function validatePieceMoving(movedPiece: Piece, placedPiece: Piece): boolean {
  return (
    placedPiece === undefined ||
    (movedPiece.size === PIECE_SIZE.M && placedPiece.size === PIECE_SIZE.S) ||
    (movedPiece.size === PIECE_SIZE.L && placedPiece.size === PIECE_SIZE.S) ||
    (movedPiece.size === PIECE_SIZE.L && placedPiece.size === PIECE_SIZE.M)
  );
}

/**
 * 現在の盤面から勝敗を判定する
 * @param boardState 現在の盤面
 * @returns 勝利プレーヤー。勝敗がついていない場合はnullを返す
 */
export function checkWinner() {}
// #endregion
// #region 公開モジュール
// #endregion
