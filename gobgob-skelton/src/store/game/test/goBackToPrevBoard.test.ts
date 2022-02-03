import _ from 'lodash';

import { reducer } from 'store/game/reducer';
import { PIECE_SIZE, PLAYER } from 'utils/constants';
import { Piece, PrevGameState } from 'utils/types';
import { goBackToPrevBoardAction } from '../actions';

describe('goBackToPrevBoard', () => {
  // #region テストデータ
  // #region 入力
  const boardPieces01: Piece[][] = [
    [{ player: PLAYER.P1, size: PIECE_SIZE.S }],
    [
      { player: PLAYER.P2, size: PIECE_SIZE.S },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
    ],
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
  ];

  const boardPieces02: Piece[][] = [
    [{ player: PLAYER.P1, size: PIECE_SIZE.L }],
    [{ player: PLAYER.P2, size: PIECE_SIZE.L }],
    [{ player: PLAYER.P1, size: PIECE_SIZE.L }],
    [{ player: PLAYER.P2, size: PIECE_SIZE.L }],
    [],
    [],
    [],
    [],
    [],
  ];

  const boardPieces03: Piece[][] = [
    [{ player: PLAYER.P1, size: PIECE_SIZE.L }],
    [{ player: PLAYER.P2, size: PIECE_SIZE.L }],
    [{ player: PLAYER.P1, size: PIECE_SIZE.L }],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  const player1Pieces01: Piece[] = [
    { player: PLAYER.P1, size: PIECE_SIZE.L },
    { player: PLAYER.P1, size: PIECE_SIZE.S },
    { player: PLAYER.P1, size: PIECE_SIZE.S },
  ];

  const player1Pieces02: Piece[] = [
    { player: PLAYER.P1, size: PIECE_SIZE.M },
    { player: PLAYER.P1, size: PIECE_SIZE.M },
    { player: PLAYER.P1, size: PIECE_SIZE.S },
    { player: PLAYER.P1, size: PIECE_SIZE.S },
  ];

  const player2Pieces01: Piece[] = [
    { player: PLAYER.P2, size: PIECE_SIZE.L },
    { player: PLAYER.P2, size: PIECE_SIZE.M },
    { player: PLAYER.P2, size: PIECE_SIZE.M },
  ];

  const player2Pieces02: Piece[] = [
    { player: PLAYER.P2, size: PIECE_SIZE.M },
    { player: PLAYER.P2, size: PIECE_SIZE.M },
    { player: PLAYER.P2, size: PIECE_SIZE.S },
    { player: PLAYER.P2, size: PIECE_SIZE.S },
  ];

  const player2Pieces03: Piece[] = [
    { player: PLAYER.P2, size: PIECE_SIZE.L },
    { player: PLAYER.P2, size: PIECE_SIZE.M },
    { player: PLAYER.P2, size: PIECE_SIZE.M },
    { player: PLAYER.P2, size: PIECE_SIZE.S },
    { player: PLAYER.P2, size: PIECE_SIZE.S },
  ];

  const gameState01: PrevGameState = {
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

  const gameState02: PrevGameState = {
    boardPieces: [
      [{ player: PLAYER.P1, size: PIECE_SIZE.S }],
      [
        { player: PLAYER.P2, size: PIECE_SIZE.S },
        { player: PLAYER.P1, size: PIECE_SIZE.M },
      ],
      [
        { player: PLAYER.P2, size: PIECE_SIZE.S },
        { player: PLAYER.P1, size: PIECE_SIZE.M },
        { player: PLAYER.P2, size: PIECE_SIZE.L },
      ],
      [{ player: PLAYER.P1, size: PIECE_SIZE.L }],
      [],
      [],
      [],
      [],
      [],
    ],
    player1Pieces: [
      { player: PLAYER.P1, size: PIECE_SIZE.S },
      { player: PLAYER.P1, size: PIECE_SIZE.S },
    ],
    player2Pieces: [
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.M },
      { player: PLAYER.P2, size: PIECE_SIZE.M },
    ],
    playingPlayer: PLAYER.P2,
  };

  const gameState03: PrevGameState = {
    boardPieces: [
      [{ player: PLAYER.P1, size: PIECE_SIZE.L }],
      [{ player: PLAYER.P2, size: PIECE_SIZE.L }],
      [{ player: PLAYER.P1, size: PIECE_SIZE.L }],
      [],
      [],
      [],
      [],
      [],
      [],
    ],
    player1Pieces: [
      { player: PLAYER.P1, size: PIECE_SIZE.M },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
      { player: PLAYER.P1, size: PIECE_SIZE.S },
      { player: PLAYER.P1, size: PIECE_SIZE.S },
    ],
    player2Pieces: [
      { player: PLAYER.P2, size: PIECE_SIZE.L },
      { player: PLAYER.P2, size: PIECE_SIZE.M },
      { player: PLAYER.P2, size: PIECE_SIZE.M },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
      { player: PLAYER.P2, size: PIECE_SIZE.S },
    ],
    playingPlayer: PLAYER.P2,
  };
  // #endregion

  // #region 期待値
  const updatedBoardPieces01: Piece[][] = Array(9).fill([]);

  const updatedBoardPieces02: Piece[][] = [
    [{ player: PLAYER.P1, size: PIECE_SIZE.S }],
    [
      { player: PLAYER.P2, size: PIECE_SIZE.S },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
    ],
    [
      { player: PLAYER.P2, size: PIECE_SIZE.S },
      { player: PLAYER.P1, size: PIECE_SIZE.M },
      { player: PLAYER.P2, size: PIECE_SIZE.L },
    ],
    [{ player: PLAYER.P1, size: PIECE_SIZE.L }],
    [],
    [],
    [],
    [],
    [],
  ];

  const updatedBoardPieces03: Piece[][] = [
    [{ player: PLAYER.P1, size: PIECE_SIZE.L }],
    [{ player: PLAYER.P2, size: PIECE_SIZE.L }],
    [{ player: PLAYER.P1, size: PIECE_SIZE.L }],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  const updatedPlayer1Pieces01: Piece[] = [
    { player: PLAYER.P1, size: PIECE_SIZE.L },
    { player: PLAYER.P1, size: PIECE_SIZE.L },
    { player: PLAYER.P1, size: PIECE_SIZE.M },
    { player: PLAYER.P1, size: PIECE_SIZE.M },
    { player: PLAYER.P1, size: PIECE_SIZE.S },
    { player: PLAYER.P1, size: PIECE_SIZE.S },
  ];

  const updatedPlayer1Pieces02: Piece[] = [
    { player: PLAYER.P1, size: PIECE_SIZE.S },
    { player: PLAYER.P1, size: PIECE_SIZE.S },
  ];

  const updatedPlayer1Pieces03: Piece[] = [
    { player: PLAYER.P1, size: PIECE_SIZE.M },
    { player: PLAYER.P1, size: PIECE_SIZE.M },
    { player: PLAYER.P1, size: PIECE_SIZE.S },
    { player: PLAYER.P1, size: PIECE_SIZE.S },
  ];

  const updatedPlayer2Pieces01: Piece[] = [
    { player: PLAYER.P2, size: PIECE_SIZE.L },
    { player: PLAYER.P2, size: PIECE_SIZE.L },
    { player: PLAYER.P2, size: PIECE_SIZE.M },
    { player: PLAYER.P2, size: PIECE_SIZE.M },
    { player: PLAYER.P2, size: PIECE_SIZE.S },
    { player: PLAYER.P2, size: PIECE_SIZE.S },
  ];

  const updatedPlayer2Pieces02: Piece[] = [
    { player: PLAYER.P2, size: PIECE_SIZE.L },
    { player: PLAYER.P2, size: PIECE_SIZE.M },
    { player: PLAYER.P2, size: PIECE_SIZE.M },
  ];

  const updatedPlayer2Pieces03: Piece[] = [
    { player: PLAYER.P2, size: PIECE_SIZE.L },
    { player: PLAYER.P2, size: PIECE_SIZE.M },
    { player: PLAYER.P2, size: PIECE_SIZE.M },
    { player: PLAYER.P2, size: PIECE_SIZE.S },
    { player: PLAYER.P2, size: PIECE_SIZE.S },
  ];
  // #endregion
  // #endregion

  // #region グローバル処理
  // #endregion

  // #region 正常系テスト
  test.each([
    [
      'No.1 : 更新後、盤面に駒が無い, 更新前、更新後ともにプレイヤー1の手番, 駒置き場に更新がある',
      boardPieces01,
      player1Pieces01,
      player2Pieces01,
      PLAYER.P1,
      gameState01,
      updatedBoardPieces01,
      updatedPlayer1Pieces01,
      updatedPlayer2Pieces01,
      PLAYER.P1,
    ],
    [
      'No.2 : 更新後、盤面に駒がある, 更新後の盤面のマスに駒が1～3個ある, 更新前はプレイヤー1の、更新後はプレイヤー2の手番',
      boardPieces02,
      player1Pieces02,
      player2Pieces02,
      PLAYER.P1,
      gameState02,
      updatedBoardPieces02,
      updatedPlayer1Pieces02,
      updatedPlayer2Pieces02,
      PLAYER.P2,
    ],
    [
      'No.3 : 更新前はプレイヤー2の、更新後はプレイヤー1の手番',
      boardPieces03,
      player1Pieces02,
      player2Pieces03,
      PLAYER.P2,
      gameState01,
      updatedBoardPieces01,
      updatedPlayer1Pieces01,
      updatedPlayer2Pieces01,
      PLAYER.P1,
    ],
    [
      'No.4 : 駒置き場に更新がない, 更新前、更新後ともにプレイヤー2の手番',
      boardPieces03,
      player1Pieces02,
      player2Pieces03,
      PLAYER.P2,
      gameState03,
      updatedBoardPieces03,
      updatedPlayer1Pieces03,
      updatedPlayer2Pieces03,
      PLAYER.P2,
    ],
  ])(
    '%s',
    /**
     * @param {string} _testCase テストケース名
     * @param {Piece[][]} inputBoardPieces 入力データ：state更新前の盤上の駒の情報
     * @param {Piece[]} inputPlayer1Pieces 入力データ：state更新前のプレイヤー1の駒置き場の駒
     * @param {Piece[]} inputPlayer2Pieces 入力データ：state更新前のプレイヤー2の駒置き場の駒
     * @param {Player} inputPlayingPlayer 入力データ：state更新前の現在の手番
     * @param {PrevGameState} inputGameState 入力データ：更新後のゲームの進行情報
     * @param {Piece[][]} expectedBoardPieces 期待値：state更新後の盤上の駒の情報
     * @param {Piece[]} expectedPlayer1Pieces 期待値：state更新後のプレイヤー1の駒置き場の駒
     * @param {Piece[]} expectedPlayer2Pieces 期待値：state更新後のプレイヤー2の駒置き場の駒
     * @param {Player} expectedPlayingPlayer 期待値：state更新後の現在の手番
     */
    (
      _testCase,
      inputBoardPieces,
      inputPlayer1Pieces,
      inputPlayer2Pieces,
      inputPlayingPlayer,
      inputGameState,
      expectedBoardPieces,
      expectedPlayer1Pieces,
      expectedPlayer2Pieces,
      expectedPlayingPlayer
    ) => {
      // 入力
      const inputState = {
        boardPieces: inputBoardPieces,
        player1Pieces: inputPlayer1Pieces,
        player2Pieces: inputPlayer2Pieces,
        playingPlayer: inputPlayingPlayer,
      };

      // テスト対象関数の実行
      const action = goBackToPrevBoardAction(_.cloneDeep(inputGameState));

      const result = reducer(_.cloneDeep(inputState), action);

      // テスト結果の確認
      expect(result.boardPieces).toStrictEqual(expectedBoardPieces);
      expect(result.player1Pieces).toStrictEqual(expectedPlayer1Pieces);
      expect(result.player2Pieces).toStrictEqual(expectedPlayer2Pieces);
      expect(result.playingPlayer).toStrictEqual(expectedPlayingPlayer);
    }
  );
  // #endregion

  // #region 異常系テスト
  // #endregion
});
