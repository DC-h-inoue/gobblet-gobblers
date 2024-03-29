// #region import宣言
import { PIECE_SIZE } from './constants';
import { Piece } from './types';
// #endregion
// #region 型定義
// #endregion
// #region 定数

/**
 * 走査するラインの設定
 */
const CHECK_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;
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
export function checkWinner(boardState: Piece[]) {
  // 勝利条件を満たすライン情報を格納
  const winnerLine = CHECK_LINES.find((checkLine) => {
    // ライン上の各マスの情報を格納
    const [firstSquare, midSquare, lastSquare] = checkLine.map((square) => boardState[square]);

    // ライン上のマスを確認して勝敗判定を行う
    return (
      firstSquare &&
      firstSquare.player === midSquare?.player &&
      firstSquare.player === lastSquare?.player
    );
  });

  // 勝利条件を満たすラインの先頭要素のプレイヤーを勝利プレイヤーとする
  return winnerLine ? boardState[winnerLine[0]].player : null;
}
// #endregion
// #region 公開モジュール
// #endregion
