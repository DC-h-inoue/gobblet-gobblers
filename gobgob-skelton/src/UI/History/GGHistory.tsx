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
  return (
    <div className={classNames('gg_history', className)}>
      Play Histories
      <div className="history_board">
        {gameHistory.map((prevGameState, index) =>
          index === 0 ? (
            <GGRestartButton
              className="restart_button"
              initialGameState={prevGameState}
              key={index}
            />
          ) : (
            <GGHistoryButton
              className="history_button"
              prevGameState={prevGameState}
              prevStepNumber={index}
              key={index}
            />
          )
        )}
      </div>
    </div>
  );
  // #endregion
};

export default GGHistory;
// #endregion
