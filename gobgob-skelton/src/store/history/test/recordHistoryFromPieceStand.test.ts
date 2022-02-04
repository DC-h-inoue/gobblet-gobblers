import _ from 'lodash';

import { reducer } from 'store/history/reducer';
import { PIECE_SIZE, PLAYER } from 'utils/constants';
import { Piece, PrevGameState } from 'utils/types';
import { recordHistoryFromPieceStandAction } from '../actions';

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

  const gameState03: PrevGameState = {
    boardPieces: [
      [{ player: PLAYER.P1, size: PIECE_SIZE.S }],
      [{ player: PLAYER.P2, size: PIECE_SIZE.S }],
      [{ player: PLAYER.P1, size: PIECE_SIZE.M }],
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
      { player: PLAYER.P1, size: PIECE_SIZE.S },
    ],
    player2Pieces: [
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.M },
      { player: PLAYER.P2, size: PIECE_SIZE.M },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
    ],
    playingPlayer: PLAYER.P2,
  };

  const gameState04: PrevGameState = {
    boardPieces: [
      [{ player: PLAYER.P1, size: PIECE_SIZE.S }],
      [{ player: PLAYER.P2, size: PIECE_SIZE.S }],
      [{ player: PLAYER.P1, size: PIECE_SIZE.M }],
      [{ player: PLAYER.P2, size: PIECE_SIZE.M }],
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
      { player: PLAYER.P1, size: PIECE_SIZE.S },
    ],
    player2Pieces: [
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.M },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
    ],
    playingPlayer: PLAYER.P1,
  };

  const gameState05: PrevGameState = {
    boardPieces: [
      [{ player: PLAYER.P1, size: PIECE_SIZE.S }],
      [{ player: PLAYER.P2, size: PIECE_SIZE.S }],
      [{ player: PLAYER.P1, size: PIECE_SIZE.M }],
      [{ player: PLAYER.P2, size: PIECE_SIZE.M }],
      [{ player: PLAYER.P1, size: PIECE_SIZE.L }],
      [],
      [],
      [],
      [],
    ],
    player1Pieces: [
      { player: PLAYER.P1, size: PIECE_SIZE.L },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
      { player: PLAYER.P1, size: PIECE_SIZE.S },
    ],
    player2Pieces: [
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.M },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
    ],
    playingPlayer: PLAYER.P2,
  };

  const gameState06: PrevGameState = {
    boardPieces: [
      [
        { player: PLAYER.P1, size: PIECE_SIZE.S },
        { player: PLAYER.P2, size: PIECE_SIZE.L },
      ],
      [],
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
      { player: PLAYER.P2, size: PIECE_SIZE.M },
      { player: PLAYER.P2, size: PIECE_SIZE.M },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
    ],
    playingPlayer: PLAYER.P1,
  };

  const gameHistory01: PrevGameState[] = [initialGameState];
  const gameHistory02: PrevGameState[] = [initialGameState, gameState01, gameState02];
  const gameHistory03: PrevGameState[] = [
    initialGameState,
    gameState01,
    gameState02,
    gameState03,
    gameState04,
  ];
  const gameHistory04: PrevGameState[] = [initialGameState, gameState01];
  const gameHistory05: PrevGameState[] = [initialGameState, gameState01, gameState02, gameState03];
  const gameHistory06: PrevGameState[] = [
    initialGameState,
    gameState01,
    gameState02,
    gameState03,
    gameState04,
    gameState05,
  ];

  const stepNumber01 = 0;
  const stepNumber02 = 2;
  const stepNumber03 = 4;
  const stepNumber04 = 1;
  const stepNumber05 = 3;
  const stepNumber06 = 5;

  const movedPieceP1S: Piece = { player: PLAYER.P1, size: PIECE_SIZE.S };
  const movedPieceP1M: Piece = { player: PLAYER.P1, size: PIECE_SIZE.M };
  const movedPieceP1L: Piece = { player: PLAYER.P1, size: PIECE_SIZE.L };
  const movedPieceP2S: Piece = { player: PLAYER.P2, size: PIECE_SIZE.S };
  const movedPieceP2M: Piece = { player: PLAYER.P2, size: PIECE_SIZE.M };
  const movedPieceP2L: Piece = { player: PLAYER.P2, size: PIECE_SIZE.L };

  const moveToIndex01 = 0;
  const moveToIndex02 = 2;
  const moveToIndex03 = 4;
  const moveToIndex04 = 1;
  const moveToIndex05 = 3;
  // #endregion

  // #region 期待値
  const gameHistory07: PrevGameState[] = [initialGameState, gameState01, gameState06];
  // #endregion
  // #endregion

  // #region グローバル処理
  // #endregion

  // #region 正常系テスト
  test.each([
    [
      'No.1 : P1Sを駒置き場から移動させる, 移動先に駒がない, 表示中の盤面の手順情報が最新である',
      gameHistory01,
      stepNumber01,
      movedPieceP1S,
      moveToIndex01,
      gameHistory04,
      stepNumber04,
    ],
    [
      'No.2 : P1Mを駒置き場から移動させる, 移動先に駒がない',
      gameHistory02,
      stepNumber02,
      movedPieceP1M,
      moveToIndex02,
      gameHistory05,
      stepNumber05,
    ],
    [
      'No.3 : P1Lを駒置き場から移動させる, 移動先に駒がない',
      gameHistory03,
      stepNumber03,
      movedPieceP1L,
      moveToIndex03,
      gameHistory06,
      stepNumber06,
    ],
    [
      'No.4 : P2Sを駒置き場から移動させる, 移動先に駒がない',
      gameHistory04,
      stepNumber04,
      movedPieceP2S,
      moveToIndex04,
      gameHistory02,
      stepNumber02,
    ],
    [
      'No.5 : P2Mを駒置き場から移動させる, 移動先に駒がない',
      gameHistory05,
      stepNumber05,
      movedPieceP2M,
      moveToIndex05,
      gameHistory03,
      stepNumber03,
    ],
    [
      'No.6 : P2Lを駒置き場から移動させる, 移動先に駒がある, 表示中の盤面の手順情報が最新でない',
      gameHistory06,
      stepNumber04,
      movedPieceP2L,
      moveToIndex01,
      gameHistory07,
      stepNumber02,
    ],
  ])(
    '%s',
    /**
     * @param {string} _testCase テストケース名
     * @param {PrevGameState[]} inputGameHistory 入力データ：state更新前のゲームの進行履歴
     * @param {number} inputStepNumber 入力データ：state更新前の手順情報
     * @param {Piece} inputMovedPiece 入力データ：移動させる駒の情報
     * @param {number} inputMoveToIndex 入力データ：移動先のマスの位置
     * @param {PrevGameState[]} expectedGameHistory 期待値：state更新後のゲームの進行履歴
     * @param {number} expectedStepNumber 期待値：state更新後の手順情報
     */
    (
      _testCase,
      inputGameHistory,
      inputStepNumber,
      inputMovedPiece,
      inputMoveToIndex,
      expectedGameHistory,
      expectedStepNumber
    ) => {
      // 入力
      const inputState = {
        gameHistory: inputGameHistory,
        stepNumber: inputStepNumber,
      };

      // テスト対象関数の実行
      const action = recordHistoryFromPieceStandAction(
        _.cloneDeep(inputMovedPiece),
        inputMoveToIndex
      );

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
