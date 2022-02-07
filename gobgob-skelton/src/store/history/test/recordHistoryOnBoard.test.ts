import _ from 'lodash';

import { reducer } from 'store/history/reducer';
import { PIECE_SIZE, PLAYER } from 'utils/constants';
import { Piece, PrevGameState } from 'utils/types';
import { recordHistoryOnBoardAction } from '../actions';

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
    boardPieces: [[], [{ player: PLAYER.P1, size: PIECE_SIZE.S }], [], [], [], [], [], [], []],
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
      [],
      [{ player: PLAYER.P1, size: PIECE_SIZE.S }],
      [{ player: PLAYER.P2, size: PIECE_SIZE.M }],
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
      { player: PLAYER.P2, size: PIECE_SIZE.S },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
    ],
    playingPlayer: PLAYER.P1,
  };

  const gameState03: PrevGameState = {
    boardPieces: [
      [],
      [
        { player: PLAYER.P1, size: PIECE_SIZE.S },
        { player: PLAYER.P2, size: PIECE_SIZE.M },
      ],
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
      { player: PLAYER.P2, size: PIECE_SIZE.S },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
    ],
    playingPlayer: PLAYER.P1,
  };

  const gameState04: PrevGameState = {
    boardPieces: [
      [],
      [
        { player: PLAYER.P1, size: PIECE_SIZE.S },
        { player: PLAYER.P2, size: PIECE_SIZE.M },
        { player: PLAYER.P1, size: PIECE_SIZE.L },
      ],
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
      { player: PLAYER.P1, size: PIECE_SIZE.M },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
      { player: PLAYER.P1, size: PIECE_SIZE.S },
    ],
    player2Pieces: [
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.M },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
    ],
    playingPlayer: PLAYER.P2,
  };

  const gameState05: PrevGameState = {
    boardPieces: [
      [],
      [
        { player: PLAYER.P1, size: PIECE_SIZE.S },
        { player: PLAYER.P2, size: PIECE_SIZE.M },
        { player: PLAYER.P1, size: PIECE_SIZE.L },
      ],
      [{ player: PLAYER.P2, size: PIECE_SIZE.S }],
      [],
      [],
      [],
      [],
      [],
      [],
    ],
    player1Pieces: [
      { player: PLAYER.P1, size: PIECE_SIZE.L },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
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

  const gameState06: PrevGameState = {
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

  const gameState07: PrevGameState = {
    boardPieces: [
      [{ player: PLAYER.P1, size: PIECE_SIZE.S }],
      [{ player: PLAYER.P2, size: PIECE_SIZE.M }],
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
      { player: PLAYER.P2, size: PIECE_SIZE.S },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
    ],
    playingPlayer: PLAYER.P1,
  };

  const gameState08: PrevGameState = {
    boardPieces: [
      [{ player: PLAYER.P1, size: PIECE_SIZE.S }],
      [{ player: PLAYER.P2, size: PIECE_SIZE.M }],
      [{ player: PLAYER.P1, size: PIECE_SIZE.S }],
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
    ],
    player2Pieces: [
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.M },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
    ],
    playingPlayer: PLAYER.P2,
  };

  const gameState09: PrevGameState = {
    boardPieces: [
      [{ player: PLAYER.P1, size: PIECE_SIZE.S }],
      [{ player: PLAYER.P2, size: PIECE_SIZE.M }],
      [
        { player: PLAYER.P1, size: PIECE_SIZE.S },
        { player: PLAYER.P2, size: PIECE_SIZE.M },
      ],
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
    ],
    player2Pieces: [
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
    ],
    playingPlayer: PLAYER.P1,
  };

  const gameState10: PrevGameState = {
    boardPieces: [
      [{ player: PLAYER.P1, size: PIECE_SIZE.S }],
      [{ player: PLAYER.P2, size: PIECE_SIZE.M }],
      [
        { player: PLAYER.P1, size: PIECE_SIZE.S },
        { player: PLAYER.P2, size: PIECE_SIZE.M },
        { player: PLAYER.P1, size: PIECE_SIZE.L },
      ],
      [],
      [],
      [],
      [],
      [],
      [],
    ],
    player1Pieces: [
      { player: PLAYER.P1, size: PIECE_SIZE.L },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
    ],
    player2Pieces: [
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
    ],
    playingPlayer: PLAYER.P2,
  };

  const gameState11: PrevGameState = {
    boardPieces: [
      [{ player: PLAYER.P1, size: PIECE_SIZE.S }],
      [{ player: PLAYER.P2, size: PIECE_SIZE.M }],
      [
        { player: PLAYER.P1, size: PIECE_SIZE.S },
        { player: PLAYER.P2, size: PIECE_SIZE.M },
        { player: PLAYER.P1, size: PIECE_SIZE.L },
      ],
      [{ player: PLAYER.P2, size: PIECE_SIZE.L }],
      [],
      [],
      [],
      [],
      [],
    ],
    player1Pieces: [
      { player: PLAYER.P1, size: PIECE_SIZE.L },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
    ],
    player2Pieces: [
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
    ],
    playingPlayer: PLAYER.P1,
  };

  const gameState12: PrevGameState = {
    boardPieces: [
      [{ player: PLAYER.P1, size: PIECE_SIZE.S }],
      [],
      [{ player: PLAYER.P2, size: PIECE_SIZE.M }],
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
      { player: PLAYER.P2, size: PIECE_SIZE.S },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
    ],
    playingPlayer: PLAYER.P2,
  };

  const gameState13: PrevGameState = {
    boardPieces: [
      [{ player: PLAYER.P1, size: PIECE_SIZE.L }],
      [
        { player: PLAYER.P1, size: PIECE_SIZE.S },
        { player: PLAYER.P2, size: PIECE_SIZE.M },
      ],
      [{ player: PLAYER.P2, size: PIECE_SIZE.S }],
      [],
      [],
      [],
      [],
      [],
      [],
    ],
    player1Pieces: [
      { player: PLAYER.P1, size: PIECE_SIZE.L },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
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

  const gameState14: PrevGameState = {
    boardPieces: [
      [
        { player: PLAYER.P1, size: PIECE_SIZE.S },
        { player: PLAYER.P2, size: PIECE_SIZE.M },
      ],
      [],
      [{ player: PLAYER.P1, size: PIECE_SIZE.S }],
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
    ],
    player2Pieces: [
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.M },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
    ],
    playingPlayer: PLAYER.P1,
  };

  const gameState15: PrevGameState = {
    boardPieces: [
      [
        { player: PLAYER.P1, size: PIECE_SIZE.S },
        { player: PLAYER.P1, size: PIECE_SIZE.L },
      ],
      [{ player: PLAYER.P2, size: PIECE_SIZE.M }],
      [
        { player: PLAYER.P1, size: PIECE_SIZE.S },
        { player: PLAYER.P2, size: PIECE_SIZE.M },
      ],
      [{ player: PLAYER.P2, size: PIECE_SIZE.L }],
      [],
      [],
      [],
      [],
      [],
    ],
    player1Pieces: [
      { player: PLAYER.P1, size: PIECE_SIZE.L },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
    ],
    player2Pieces: [
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
    ],
    playingPlayer: PLAYER.P2,
  };

  const gameHistory01: PrevGameState[] = [initialGameState, gameState01, gameState02];
  const gameHistory02: PrevGameState[] = [
    initialGameState,
    gameState01,
    gameState03,
    gameState04,
    gameState05,
  ];

  const gameHistory03: PrevGameState[] = [
    initialGameState,
    gameState06,
    gameState07,
    gameState08,
    gameState09,
    gameState10,
  ];

  const gameHistory04: PrevGameState[] = [
    initialGameState,
    gameState06,
    gameState07,
    gameState08,
    gameState09,
    gameState10,
    gameState11,
  ];

  const stepNumber01 = 2;
  const stepNumber02 = 4;
  const stepNumber03 = 3;
  const stepNumber04 = 6;

  const movedPieceP1S: Piece = { player: PLAYER.P1, size: PIECE_SIZE.S };
  const movedPieceP1L: Piece = { player: PLAYER.P1, size: PIECE_SIZE.L };
  const movedPieceP2M: Piece = { player: PLAYER.P2, size: PIECE_SIZE.M };

  const moveToIndex = 0;

  const moveFromIndex01 = 1;
  const moveFromIndex02 = 2;
  // #endregion

  // #region 期待値
  const updatedGameHistory01: PrevGameState[] = [
    initialGameState,
    gameState01,
    gameState02,
    gameState12,
  ];

  const updatedGameHistory02: PrevGameState[] = [
    initialGameState,
    gameState01,
    gameState03,
    gameState04,
    gameState05,
    gameState13,
  ];

  const updatedGameHistory03: PrevGameState[] = [
    initialGameState,
    gameState06,
    gameState07,
    gameState08,
    gameState14,
  ];

  const updatedGameHistory04: PrevGameState[] = [
    initialGameState,
    gameState06,
    gameState07,
    gameState08,
    gameState09,
    gameState10,
    gameState11,
    gameState15,
  ];

  const updatedStepNumber01 = 3;
  const updatedStepNumber02 = 5;
  const updatedStepNumber03 = 4;
  const updatedStepNumber04 = 7;
  // #endregion
  // #endregion

  // #region グローバル処理
  // #endregion

  // #region 正常系テスト
  test.each([
    [
      'No.1 : 移動先に駒がない, 移動元のマスの配置履歴の個数が1個, プレイヤー1の手番, 表示中の盤面の手順情報が最新である',
      gameHistory01,
      stepNumber01,
      movedPieceP1S,
      moveToIndex,
      moveFromIndex01,
      updatedGameHistory01,
      updatedStepNumber01,
    ],
    [
      'No.2 : 移動先に駒がない, 移動元のマスの配置履歴の個数が3個, プレイヤー1の手番',
      gameHistory02,
      stepNumber02,
      movedPieceP1L,
      moveToIndex,
      moveFromIndex01,
      updatedGameHistory02,
      updatedStepNumber02,
    ],
    [
      'No.3 : 移動先に駒がある, 移動元のマスの配置履歴の個数が1個, プレイヤー2の手番, 表示中の盤面の手順情報が最新でない',
      gameHistory03,
      stepNumber03,
      movedPieceP2M,
      moveToIndex,
      moveFromIndex01,
      updatedGameHistory03,
      updatedStepNumber03,
    ],
    [
      'No.4 : 移動先に駒がある, 移動元のマスの配置履歴の個数が3個, プレイヤー1の手番',
      gameHistory04,
      stepNumber04,
      movedPieceP1L,
      moveToIndex,
      moveFromIndex02,
      updatedGameHistory04,
      updatedStepNumber04,
    ],
  ])(
    '%s',
    /**
     * @param {string} _testCase テストケース名
     * @param {PrevGameState[]} inputGameHistory 入力データ：state更新前のゲームの進行履歴
     * @param {number} inputStepNumber 入力データ：state更新前の手順情報
     * @param {Piece} inputMovedPiece 入力データ：移動させる駒の情報
     * @param {number} inputMoveToIndex 入力データ：移動先のマスの位置
     * @param {number} inputMoveFromIndex 入力データ：移動元のマスの位置
     * @param {PrevGameState[]} expectedGameHistory 期待値：state更新後のゲームの進行履歴
     * @param {number} expectedStepNumber 期待値：state更新後の手順情報
     */
    (
      _testCase,
      inputGameHistory,
      inputStepNumber,
      inputMovedPiece,
      inputMoveToIndex,
      inputMoveFromIndex,
      expectedGameHistory,
      expectedStepNumber
    ) => {
      // 入力
      const inputState = {
        gameHistory: inputGameHistory,
        stepNumber: inputStepNumber,
      };

      // テスト対象関数の実行
      const action = recordHistoryOnBoardAction(
        _.cloneDeep(inputMovedPiece),
        inputMoveToIndex,
        inputMoveFromIndex
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
