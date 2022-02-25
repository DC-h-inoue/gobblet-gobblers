// #region import宣言
import { FC } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { Player } from 'utils/types';
import { PLAYER } from 'utils/constants';
import GGPiece from '../Piece/GGPiece';

import './GGPieceStand.scss';
// #endregion
// #region 型定義
type Props = {
  className?: string;
  player: Player;
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
 * 駒置き場を表すコンポーネント
 *
 * @param {string?} className 外部から指定するクラス名
 * @param {Player} player 駒置き場のプレーヤー情報
 * @return 駒置き場を表すJSX要素
 */
const GGPieceStand: FC<Props> = ({ className, player }) => {
  // #region state変数
  // #endregion
  // #region 内部変数
  const { player1Pieces, player2Pieces } = useSelector((state) => state.game);
  // #endregion
  // #region 内部関数
  // #endregion
  // #region イベントハンドラ
  // #endregion
  // #region 副作用処理
  // #endregion
  // #region レンダリング処理

  // playerがP1ならP1の駒の、P2ならP2の駒のJSX要素を返す
  return (
    <div className={classNames('gg_piece-stand', className)} data-testid="gg_piece-stand">
      {(player === PLAYER.P1 ? player1Pieces : player2Pieces).map((piece, index) => (
        <GGPiece key={index} className="piece-item" piece={piece} boardSquareIndex={-1} />
      ))}
    </div>
  );
  // #endregion
};

export default GGPieceStand;
// #endregion
