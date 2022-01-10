// #region import宣言
import { FC } from 'react';
import { Avatar } from '@mui/material';
import classNames from 'classnames';

import { Piece } from 'utils/types';

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
const GGPiece: FC<Props> = ({ className, piece }) => {
  return (
    <Avatar
      classes={{
        root: classNames('gg_piece piece', className),
      }}
    >
      {piece.size[0].toUpperCase()}
    </Avatar>
  );
};

export default GGPiece;
// #endregion
