// #region import宣言
import { FC } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { GameState } from 'store/game/reducer';

import './GGBoard.scss';
import GGSquare from './Square/GGSquare';
import { RootState } from 'store';
// #endregion
// #region 型定義
type Props = {
  className?: string;
};

type StateProps = {
  state: {
    game: GameState
  }
};

// #endregion
// #region 定数
// #endregion
// #region 内部関数
// const mapStateToProps: StateProps = (state: GameState) => {
//   return {
//     boardPieces: state.boardPieces,
//     player1Pieces: state.player1Pieces,
//     player2Pieces: state.player2Pieces
//   }
// };

function mapStateToProps(state: RootState){
  return {
    state:{
      game: state.game
    }
  }
};

// #endregion
// #region 公開関数
// #endregion
// #region 公開モジュール
const GGBoard: FC<Props&  StateProps> = ({ className, state }) => {
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
  return(
    <div className={classNames('gg_board', className)}>
      {state.game.boardPieces.map((pieceHistory, index) => 
        {
          return(
            <GGSquare pieceHistory={pieceHistory} index={index} />
            )
          }
          )}
    </div>
  );
  // #endregion
};
// #endregion

export default connect<StateProps>(mapStateToProps)(GGBoard);