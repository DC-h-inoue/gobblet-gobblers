// #region import宣言
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import GGPieceStand from 'UI/Game/PieceStand/GGPieceStand';
import GGBoard from 'UI/Game/Board/GGBoard';
import { PLAYER } from 'utils/constants';
import { Player } from 'utils/types';
import { checkWinner } from 'utils/helper';

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
  const [winner, setWinner] = useState<Player | null>(null);
  // #endregion
  // #region 内部変数
  const { boardPieces, playingPlayer } = useSelector((state) => state.game);
  // #endregion
  // #region 内部関数
  // #endregion
  // #region イベントハンドラ
  // #endregion
  // #region 副作用処理

  // 勝利プレイヤーの更新
  useEffect(() => {
    const gameResult = checkWinner(
      boardPieces.map((squarePiece) => squarePiece[squarePiece.length - 1])
    );
    if (gameResult) {
      setWinner(gameResult);
    }
  }, [boardPieces]);

  // 勝利プレイヤーの表示
  useEffect(() => {
    if (winner) {
      alert(`ゲーム終了です！${winner}の勝ちです`);
      setWinner(null);
    }
  }, [winner]);

  // #endregion
  // #region レンダリング処理
  return (
    <div className="gg_game">
      <div className="playing-player-info">{playingPlayer}のターン</div>
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
