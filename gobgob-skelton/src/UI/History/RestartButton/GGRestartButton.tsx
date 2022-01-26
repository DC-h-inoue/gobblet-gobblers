// #region import宣言
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Button } from '@mui/material';

import { goBackToPrevBoardAction } from 'store/game/actions';
import { PrevGameState } from 'utils/types';
import { deleteHistory } from 'store/history/actions';

import './GGRestartButton.scss';
// #endregion
type Props = {
  className?: string;
  initialGameState: PrevGameState;
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
const GGRestartButton: FC<Props> = ({ className, initialGameState }) => {
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
   */
  const handleRestartButtonClick = () => {
    const isGameReset = window.confirm('ゲームを中断して、新しくゲームを開始しますか？');
    if (isGameReset) {
      dispatch(deleteHistory());
      dispatch(goBackToPrevBoardAction(initialGameState));
    }
  };
  // #endregion
  // #region 副作用処理
  // #endregion
  // #region レンダリング処理
  return (
    <Button
      className={classNames('restart_button gg_restart_button', className)}
      onClick={handleRestartButtonClick}
    >
      Restart
    </Button>
  );
  // #endregion
};

export default GGRestartButton;
// #endregion
