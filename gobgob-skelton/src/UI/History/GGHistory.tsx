// #region import宣言
import classNames from 'classnames';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import GGHistoryButton from './HistoryButton/GGHistoryButton';
import GGRestartButton from './RestartButton/GGRestartButton';

import './GGHistory.scss';
// #endregion
type Props = {
  className?: string;
};
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
const GGHistory: FC<Props> = ({ className }) => {
  // #region state変数
  // #endregion
  // #region 内部変数
  const { gameHistory } = useSelector((state) => state.history);
  // #endregion
  // #region 内部関数
  // #endregion
  // #region イベントハンドラ
  // #endregion
  // #region 副作用処理
  // #endregion
  // #region レンダリング処理

  // ゲームの進行履歴の先頭以外の要素を履歴ボタンとして展開する
  return (
    <div className={classNames('gg_history', className)} data-testid="gg_history">
      Play Histories
      <GGRestartButton className="restart-button" initialGameState={gameHistory[0]} key={0} />
      <div className="history-board" data-testid="history-board">
        {gameHistory.slice(1).map((prevGameState, index) => (
          <GGHistoryButton
            prevGameState={prevGameState}
            prevStepNumber={index + 1}
            key={index + 1}
          />
        ))}
      </div>
    </div>
  );
  // #endregion
};

export default GGHistory;
// #endregion
