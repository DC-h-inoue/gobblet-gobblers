// #region import宣言
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import GGPiece from 'UI/Game/Piece/GGPiece';
import { Piece } from 'utils/types';
import { GG_PIECE } from 'utils/constants';
import { validatePieceMoving } from 'utils/helper';
import { movePieceFromStandAction, movePieceStandOnBoardAction } from 'store/game/actions';
import {
  recordHistoryFromPieceStandAction,
  recordHistoryOnBoardAction,
} from 'store/history/actions';

import './GGSquare.scss';
// #endregion
// #region 型定義
type Props = {
  pieceHistory: Piece[];
  index: number;
};

// #endregion
// #region 定数
// #endregion
// #region 内部関数
// #endregion
// #region 公開関数
// #endregion
// #region 公開モジュール
/**
 * 盤面のマスの情報を表すコンポーネント
 *
 * @param {Piece[]} pieceHistory 駒の配置履歴
 * @param {number} index 盤面のマスのIndex
 * @return 盤面のマスの情報を表すJSX要素
 */
const GGSquare: FC<Props> = ({ pieceHistory, index }) => {
  // #region state変数
  // #endregion
  // #region 内部変数
  const dispatch = useDispatch();
  const [, squareDropRef] = useDrop(
    () => ({
      accept: GG_PIECE,
      canDrop: (item: { piece: Piece; index: number }) =>
        validatePieceMoving(item.piece, pieceHistory[pieceHistory.length - 1]),
      drop: (item: { piece: Piece; index: number }) => {
        if (item.index === -1) {
          dispatch(movePieceFromStandAction(item.piece, index));
          dispatch(recordHistoryFromPieceStandAction(item.piece, index));
        } else {
          dispatch(movePieceStandOnBoardAction(item.piece, index, item.index));
          dispatch(recordHistoryOnBoardAction(item.piece, index, item.index));
        }
      },
    }),
    [pieceHistory]
  );

  // #endregion
  // #region 内部関数
  // #endregion
  // #region イベントハンドラ
  // #endregion
  // #region 副作用処理
  // #endregion
  // #region レンダリング処理

  // 盤面のマスに駒が置かれている場合は駒を描画するJSX要素を返す
  return (
    <div className="gg_square" ref={squareDropRef} data-testid="gg_square">
      {pieceHistory.length > 0 && (
        <GGPiece piece={pieceHistory[pieceHistory.length - 1]} boardSquareIndex={index} />
      )}
    </div>
  );
  // #endregion
};

export default GGSquare;
// #endregion
