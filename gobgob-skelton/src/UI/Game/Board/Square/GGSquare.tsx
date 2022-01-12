// #region import宣言
import { FC } from 'react';
import GGPiece from 'UI/Game/Piece/GGPiece';

import { Piece } from 'utils/types';
import './GGSquare.scss';
// #endregion
// #region 型定義
type Props = {
  pieceHistory: Piece[];
  index: number;
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
 * 盤面のマスの情報を表すコンポーネント
 *
 * @param pieceHistory
 * @param index
 * @return 盤面のマスの情報を表すJSX要素
 */
const GGSquare: FC<Props> = ({ pieceHistory, index }) => {
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
  
  // 盤面のマスに駒が置かれている場合は駒を描画するJSX要素を返す
  if(pieceHistory !== null){
    return(
      <div className="gg_square">
        <GGPiece 
          className={`${pieceHistory[0].size} ${pieceHistory[0].player === 'Player1' ? 'p1' : 'p2'}`}
          piece={pieceHistory[0]}
          boardSquareIndex={index}
        />
      </div>
    );
  }
  else{
    return(
      <div className="gg_square"></div>
    );
  }
  // #endregion
};

export default GGSquare;
// #endregion
