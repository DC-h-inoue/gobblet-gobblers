import { reducer } from 'store/game/reducer';
import { PIECE_SIZE, PLAYER } from 'utils/constants';
import { Piece } from 'utils/types';
import { movePieceStandOnBoardAction } from '../actions';

describe('movePieceStandOnBoard', () => {
  // #region テストデータ
  // #region 入力
  const INITIAL_STATE = {
    boardPieces: Array(9).fill([]),
    player1Pieces: [
      { size: PIECE_SIZE.L, player: PLAYER.P1 },
      { size: PIECE_SIZE.L, player: PLAYER.P1 },
      { size: PIECE_SIZE.M, player: PLAYER.P1 },
      { size: PIECE_SIZE.M, player: PLAYER.P1 },
      { size: PIECE_SIZE.S, player: PLAYER.P1 },
      { size: PIECE_SIZE.S, player: PLAYER.P1 },
    ],
    player2Pieces: [
      { size: PIECE_SIZE.L, player: PLAYER.P2 },
      { size: PIECE_SIZE.L, player: PLAYER.P2 },
      { size: PIECE_SIZE.M, player: PLAYER.P2 },
      { size: PIECE_SIZE.M, player: PLAYER.P2 },
      { size: PIECE_SIZE.S, player: PLAYER.P2 },
      { size: PIECE_SIZE.S, player: PLAYER.P2 },
    ],
    playingPlayer: PLAYER.P1,
  };

  const boardPieces01: Piece[][] = [
    [],
    [{ player: PLAYER.P1, size: PIECE_SIZE.L }],
    [],
    [],
    [],
    [{ player: PLAYER.P2, size: PIECE_SIZE.L }],
    [],
    [],
    [],
    [],
  ];

  const boardPieces02: Piece[][] = [
    [],
    [
      { player: PLAYER.P1, size: PIECE_SIZE.S },
      { player: PLAYER.P2, size: PIECE_SIZE.M },
      { player: PLAYER.P1, size: PIECE_SIZE.L },
    ],
    [],
    [],
    [],
    [{ player: PLAYER.P2, size: PIECE_SIZE.L }],
    [],
    [],
    [],
  ];

  const boardPieces03: Piece[][] = [
    [{ player: PLAYER.P1, size: PIECE_SIZE.S }],
    [{ player: PLAYER.P2, size: PIECE_SIZE.L }],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  const boardPieces04: Piece[][] = [
    [{ player: PLAYER.P1, size: PIECE_SIZE.S }],
    [
      { player: PLAYER.P2, size: PIECE_SIZE.S },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
      { player: PLAYER.P2, size: PIECE_SIZE.L },
    ],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  const movedPieceP1L: Piece = { player: PLAYER.P1, size: PIECE_SIZE.L };
  const movedPieceP2L: Piece = { player: PLAYER.P2, size: PIECE_SIZE.L };
  const moveFromIndex = 1;
  const moveToIndex = 0;
  // #endregion

  // #region 期待値
  const updatedBoardPieces01: Piece[][] = [
    [{ player: PLAYER.P1, size: PIECE_SIZE.L }],
    [],
    [],
    [],
    [],
    [{ player: PLAYER.P2, size: PIECE_SIZE.L }],
    [],
    [],
    [],
    [],
  ];

  const updatedBoardPieces02: Piece[][] = [
    [{ player: PLAYER.P1, size: PIECE_SIZE.L }],
    [
      { player: PLAYER.P1, size: PIECE_SIZE.S },
      { player: PLAYER.P2, size: PIECE_SIZE.M },
    ],
    [],
    [],
    [],
    [{ player: PLAYER.P2, size: PIECE_SIZE.L }],
    [],
    [],
    [],
  ];

  const updatedBoardPieces03: Piece[][] = [
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
    [],
  ];

  const updatedBoardPieces04: Piece[][] = [
    [
      { player: PLAYER.P1, size: PIECE_SIZE.S },
      { player: PLAYER.P2, size: PIECE_SIZE.L },
    ],
    [
      { player: PLAYER.P2, size: PIECE_SIZE.S },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
    ],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];
  // #endregion
  // #endregion

  // #region グローバル処理
  // #endregion

  // #region 正常系テスト
  test('テストNo.1', () => {
    // 入力
    const inputState01 = {
      ...INITIAL_STATE,
      boardPieces: boardPieces01,
      playingPlayer: PLAYER.P1,
    };
    const inputAction01 = movePieceStandOnBoardAction(movedPieceP1L, moveToIndex, moveFromIndex);
    // 期待値
    const expectedState01 = {
      ...INITIAL_STATE,
      boardPieces: updatedBoardPieces01,
      playingPlayer: PLAYER.P2,
    };

    // テスト対象関数の実行
    const testMethodOutput01 = reducer(inputState01, inputAction01);

    // テスト結果の確認
    expect(testMethodOutput01).toStrictEqual(expectedState01);
  });

  test('テストNo.2', () => {
    // 入力
    const inputState02 = {
      ...INITIAL_STATE,
      boardPieces: boardPieces02,
      playingPlayer: PLAYER.P1,
    };
    const inputAction02 = movePieceStandOnBoardAction(movedPieceP1L, moveToIndex, moveFromIndex);
    // 期待値
    const expectedState02 = {
      ...INITIAL_STATE,
      boardPieces: updatedBoardPieces02,
      playingPlayer: PLAYER.P2,
    };

    // テスト対象関数の実行
    const testMethodOutput02 = reducer(inputState02, inputAction02);

    // テスト結果の確認
    expect(testMethodOutput02).toStrictEqual(expectedState02);
  });

  test('テストNo.3', () => {
    // 入力
    const inputState03 = {
      ...INITIAL_STATE,
      boardPieces: boardPieces03,
      playingPlayer: PLAYER.P2,
    };
    const inputAction03 = movePieceStandOnBoardAction(movedPieceP2L, moveToIndex, moveFromIndex);
    // 期待値
    const expectedState03 = {
      ...INITIAL_STATE,
      boardPieces: updatedBoardPieces03,
      playingPlayer: PLAYER.P1,
    };

    // テスト対象関数の実行
    const testMethodOutput03 = reducer(inputState03, inputAction03);

    // テスト結果の確認
    expect(testMethodOutput03).toStrictEqual(expectedState03);
  });

  test('テストNo.4', () => {
    // 入力
    const inputState04 = {
      ...INITIAL_STATE,
      boardPieces: boardPieces04,
      playingPlayer: PLAYER.P2,
    };
    const inputAction04 = movePieceStandOnBoardAction(movedPieceP2L, moveToIndex, moveFromIndex);
    // 期待値
    const expectedState04 = {
      ...INITIAL_STATE,
      boardPieces: updatedBoardPieces04,
      playingPlayer: PLAYER.P1,
    };

    // テスト対象関数の実行
    const testMethodOutput04 = reducer(inputState04, inputAction04);

    // テスト結果の確認
    expect(testMethodOutput04).toStrictEqual(expectedState04);
  });
  // #endregion

  // #region 異常系テスト
  // #endregion
});
