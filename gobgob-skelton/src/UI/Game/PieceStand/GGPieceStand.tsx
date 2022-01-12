// #region import宣言
import { FC } from 'react';
import classNames from 'classnames';

import { Player } from 'utils/types';

import './GGPieceStand.scss';
import { useSelector } from 'react-redux';
import GGPiece from '../Piece/GGPiece';
// #endregion
// #region 型定義
type Props = {
  className?: string;
  player: Player;
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
 * 駒置き場を表すコンポーネント
 *
 * @param {className} 外部から指定するクラス名
 * @param {player} 駒置き場のプレーヤー情報
 * @return 駒置き場を表すJSX要素
 */
const GGPieceStand: FC<Props> = ({ className, player }) => {
  // #region state変数
  // #endregion
  // #region 内部変数
  const player1Pieces = useSelector(state => state.game.player1Pieces);
  const player2Pieces = useSelector(state => state.game.player2Pieces);
  // #endregion
  // #region 内部関数
  // #endregion
  // #region イベントハンドラ
  // #endregion
  // #region 副作用処理
  // #endregion
  // #region レンダリング処理
  
  // playerがP1ならP1の駒の、P2ならP2の駒のJSX要素を返す
  return(
    <div className={classNames('gg_piece-stand', className)}>
        {
          (player === 'Player1' ? player1Pieces : player2Pieces).map((piece, index) => {
            return(
              <div className='piece-item' key={index.toString()}>
                <GGPiece className={`${piece.size} ${player === 'Player1' ? 'p1' : 'p2'}`} piece={piece}/>
              </div>
            );
          })
        }
    </div>
  );
  // #endregion
};

export default GGPieceStand;
// #endregion
