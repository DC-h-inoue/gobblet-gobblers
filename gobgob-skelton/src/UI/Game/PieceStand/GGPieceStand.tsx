// #region import宣言
import { FC } from 'react';
import classNames from 'classnames';

import { Player } from 'utils/types';

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

const GGPieceStand: FC<Props> = ({ className }) => {
  // #region state変数
  // #endregion
  // #region 内部変数
  // #endregion
  // #region 内部関数
  // #endregion
  // #region イベントハンドラ
  // #endregion
  // #region 副作用処理
  // #endregion
  // #region レンダリング処理
  return <div className={classNames('gg_piece-stand', className)}></div>;
  // #endregion
};

export default GGPieceStand;
// #endregion
