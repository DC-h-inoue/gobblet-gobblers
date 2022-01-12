// #region import宣言
import { FC } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import GGSquare from './Square/GGSquare';

import './GGBoard.scss';
// #endregion
// #region 型定義
type Props = {
  className?: string;
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
 * 盤面を表示するコンポーネント
 *
 * @param  {className} 外部から指定するクラス名
 * @return GGSquareコンポーネントのJSX要素
 */
const GGBoard: FC<Props> = ({ className }) => {
  // #region state変数
  // #endregion
  // #region 内部変数
  const { boardPieces } = useSelector((state) => state.game);
  // #endregion
  // #region 内部関数
  // #endregion
  // #region イベントハンドラ
  // #endregion
  // #region 副作用処理
  // #endregion
  // #region レンダリング処理
  return (
    <div className={classNames('gg_board', className)}>
      {boardPieces.map((pieceHistory, index) => (
        <GGSquare pieceHistory={pieceHistory} index={index} key={index.toString()} />
      ))}
    </div>
  );
  // #endregion
};
// #endregion

export default GGBoard;
