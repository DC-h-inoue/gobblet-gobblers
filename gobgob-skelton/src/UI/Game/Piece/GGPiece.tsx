// #region import宣言
import { FC } from 'react';
import { Avatar } from '@mui/material';
import classNames from 'classnames';

import { Piece } from 'utils/types';
import { PLAYER } from 'utils/constants';

import './GGPiece.scss';
// #endregion
// #region 型定義
type Props = {
  className?: string;
  piece: Piece;
  boardSquareIndex?: number;
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
 * 駒を表すコンポーネント
 *
 * @param {className} 外部から指定するクラス名
 * @param {piece} 駒の情報
 * @return 駒を表すJSX要素
 */
const GGPiece: FC<Props> = ({ className, piece }) => {
  return (
    <Avatar
      classes={{
        root: classNames(
          `gg_piece piece ${piece.size} ${piece.player === PLAYER.P1 ? 'p1' : 'p2'}`,
          className
        ),
      }}
    >
      {piece.size[0].toUpperCase()}
    </Avatar>
  );
};

export default GGPiece;
// #endregion
