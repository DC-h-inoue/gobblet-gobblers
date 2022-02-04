import _ from 'lodash';

import { reducer } from 'store/history/reducer';
import { PIECE_SIZE, PLAYER } from 'utils/constants';
import { updateStepNumberAction } from '../actions';

describe('updateStepNumber', () => {
  // #region テストデータ
  // #region 入力
  const INITIAL_STATE = {
    gameHistory: [
      {
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
      },
    ],
    stepNumber: 0,
  };

  const stepNumber = 5;

  const inputStepNumber01 = 5;
  const inputStepNumber02 = 0;
  // #endregion

  // #region 期待値
  // #endregion
  // #endregion

  // #region グローバル処理
  // #endregion

  // #region 正常系テスト
  test.each([
    ['No.1 : 手順情報の更新がない', inputStepNumber01],
    ['No.2 : 手順情報の更新がある', inputStepNumber02],
  ])(
    '%s',
    /**
     * @param {string} _testCase テストケース名
     * @param {number} inputStepNumber 入力データ：state更新前の手順情報
     */
    (_testCase, inputStepNumber) => {
      // 入力
      const inputState = {
        ...INITIAL_STATE,
        stepNumber: stepNumber,
      };

      // 期待値
      const expectedStepNumber = inputStepNumber;

      // テスト対象関数の実行
      const action = updateStepNumberAction(inputStepNumber);

      const result = reducer(_.cloneDeep(inputState), action);

      // テスト結果の確認
      expect(result.stepNumber).toStrictEqual(expectedStepNumber);
    }
  );
  // #endregion

  // #region 異常系テスト
  // #endregion
});
