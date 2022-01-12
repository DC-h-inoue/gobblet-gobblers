// #region import宣言
import GGPieceStand from 'UI/Game/PieceStand/GGPieceStand';
import GGBoard from 'UI/Game/Board/GGBoard';
import { PLAYER } from 'utils/constants';

import './GGGame.scss';
// #endregion
// #region 型定義
// #endregion
// #region 定数

// #endregion
// #region 内部関数
// #endregion
// #region 公開関数
// #endregion

// #region 公開モジュール
/**
 * ゲームの進行状況を表示するコンポーネント
 * @returns GGBoard、GGPieceStandコンポーネントのJSX要素
 */
const GGGame = () => {
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
  return (
    <div className="gg_game">
      <GGBoard />
      <div className="piece-stand-container">
        <GGPieceStand className="piece-stand" player={PLAYER.P1} />
        <GGPieceStand className="piece-stand" player={PLAYER.P2} />
      </div>
    </div>
  );
  // #endregion
};

export default GGGame;
// #endregion
