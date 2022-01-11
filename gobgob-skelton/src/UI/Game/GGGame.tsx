// #region import宣言
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import GGPieceStand from 'UI/Game/PieceStand/GGPieceStand';
import GGBoard from 'UI/Game/Board/GGBoard';
import { PLAYER } from 'utils/constants';
import { GameState } from 'store/game/reducer';
import { movePieceFromStandAction, movePieceStandOnBoardAction } from 'store/game/actions';

import './GGGame.scss';
// #endregion
// #region 型定義
// #endregion
// #region 定数
// #endregion
// #region 内部関数
const mapStandToProps = (state: GameState) => {
  return {
    boardPieces: state.boardPieces
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {movePieceFromStandAction, movePieceStandOnBoardAction},
    dispatch
  )  
};
// #endregion
// #region 公開関数
// #endregion

// #region 公開モジュール
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

export default connect(mapStandToProps, mapDispatchToProps)(GGGame);
// #endregion
