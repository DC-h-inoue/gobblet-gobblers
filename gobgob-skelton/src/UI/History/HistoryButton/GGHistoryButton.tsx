// #region import宣言
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Button } from '@mui/material';

import { goBackToPrevBoardAction } from 'store/game/actions';
import { updateStepNumberAction } from 'store/history/actions';
import { PrevGameState } from 'utils/types';

import './GGHistoryButton.scss';
// #endregion
type Props = {
  className?: string;
  prevGameState: PrevGameState;
  prevStepNumber: number;
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
const GGHistoryButton: FC<Props> = ({ className, prevGameState, prevStepNumber }) => {
  // #region state変数
  // #endregion
  // #region 内部変数
  const dispatch = useDispatch();
  // #endregion
  // #region 内部関数
  // #endregion
  // #region イベントハンドラ
  /**
   * ボタンクリック時のイベントハンドラ
   * @param {React.MouseEvent<HTMLButtonElement>} _event ボタンクリック時のイベント
   */
  const handleHistoryButtonClick = (_event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(updateStepNumberAction(prevStepNumber));
    dispatch(goBackToPrevBoardAction(prevGameState));
  };
  // #endregion
  // #region 副作用処理
  // #endregion
  // #region レンダリング処理
  return (
    <Button
      className={classNames(
        'history_button gg_history_button',
        className,
        prevStepNumber % 2 === 1 ? 'player1_button' : 'player2_button'
      )}
      onClick={handleHistoryButtonClick}
    >
      move to #{prevStepNumber}
    </Button>
  );
  // #endregion
};

export default GGHistoryButton;
// #endregion
