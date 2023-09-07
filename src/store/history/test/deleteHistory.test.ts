import _ from 'lodash';

import { reducer } from 'store/history/reducer';
import { PIECE_SIZE, PLAYER } from 'utils/constants';
import { PrevGameState } from 'utils/types';
import { deleteHistory } from '../actions';

describe('deleteHistory', () => {
  // #region テストデータ
  // #region 入力
  const initialGameState: PrevGameState = {
    boardPieces: Array(9).fill([]),
    player1Pieces: [
      { player: PLAYER.P1, size: PIECE_SIZE.L },
      { player: PLAYER.P1, size: PIECE_SIZE.L },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
      { player: PLAYER.P1, size: PIECE_SIZE.S },
      { player: PLAYER.P1, size: PIECE_SIZE.S },
    ],
    player2Pieces: [
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.M },
      { player: PLAYER.P2, size: PIECE_SIZE.M },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
    ],
    playingPlayer: PLAYER.P1,
  };

  const gameState01: PrevGameState = {
    boardPieces: [[{ player: PLAYER.P1, size: PIECE_SIZE.S }], [], [], [], [], [], [], [], []],
    player1Pieces: [
      { player: PLAYER.P1, size: PIECE_SIZE.L },
      { player: PLAYER.P1, size: PIECE_SIZE.L },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
      { player: PLAYER.P1, size: PIECE_SIZE.S },
    ],
    player2Pieces: [
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.M },
      { player: PLAYER.P2, size: PIECE_SIZE.M },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
    ],
    playingPlayer: PLAYER.P2,
  };

  const gameState02: PrevGameState = {
    boardPieces: [
      [{ player: PLAYER.P1, size: PIECE_SIZE.S }],
      [{ player: PLAYER.P2, size: PIECE_SIZE.S }],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ],
    player1Pieces: [
      { player: PLAYER.P1, size: PIECE_SIZE.L },
      { player: PLAYER.P1, size: PIECE_SIZE.L },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
      { player: PLAYER.P1, size: PIECE_SIZE.S },
    ],
    player2Pieces: [
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.M },
      { player: PLAYER.P2, size: PIECE_SIZE.M },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
    ],
    playingPlayer: PLAYER.P1,
  };

  const gameHistory01: PrevGameState[] = [initialGameState];
  const gameHistory02: PrevGameState[] = [initialGameState, gameState01, gameState02];

  const stepNumber01 = 0;
  const stepNumber02 = 2;
  // #endregion

  // #region 期待値
  // #endregion
  // #endregion

  // #region グローバル処理
  // #endregion

  // #region 正常系テスト
  test.each([
    [
      'No.1 : ゲームの進行履歴がない, 現在表示中の盤面の手順情報が0になる',
      gameHistory01,
      stepNumber01,
    ],
    [
      'No.2 : ゲームの進行履歴がある, 現在表示中の盤面の手順情報が0になる',
      gameHistory02,
      stepNumber02,
    ],
  ])(
    '%s',
    /**
     * @param {string} _testCase テストケース名
     * @param {PrevGameState[]} inputGameHistory 入力データ：state更新前のゲームの進行履歴
     * @param {number} inputStepNumber 入力データ：state更新前の手順情報
     */
    (_testCase, inputGameHistory, inputStepNumber) => {
      // 入力
      const inputState = {
        gameHistory: inputGameHistory,
        stepNumber: inputStepNumber,
      };

      // 期待値
      const expectedStepNumber = stepNumber01;
      const expectedGameHistory = gameHistory01;

      // テスト対象関数の実行
      const action = deleteHistory();

      const result = reducer(_.cloneDeep(inputState), action);

      // テスト結果の確認
      expect(result.gameHistory).toStrictEqual(expectedGameHistory);
      expect(result.stepNumber).toStrictEqual(expectedStepNumber);
    }
  );
  // #endregion

  // #region 異常系テスト
  // #endregion
});
