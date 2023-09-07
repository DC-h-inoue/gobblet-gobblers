import _ from 'lodash';

import { reducer } from 'store/game/reducer';
import { PIECE_SIZE, PLAYER } from 'utils/constants';
import { Piece } from 'utils/types';
import { movePieceFromStandAction } from '../actions';

describe('movePieceFromStand', () => {
  // #region テストデータ
  // #region 入力
  const boardPieces01: Piece[][] = Array(9).fill([]);

  const boardPieces02: Piece[][] = [
    [],
    [{ player: PLAYER.P1, size: PIECE_SIZE.L }],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  const boardPieces03: Piece[][] = [
    [{ player: PLAYER.P1, size: PIECE_SIZE.S }],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  const player1Pieces01: Piece[] = [
    { player: PLAYER.P1, size: PIECE_SIZE.L },
    { player: PLAYER.P1, size: PIECE_SIZE.L },
    { player: PLAYER.P1, size: PIECE_SIZE.M },
    { player: PLAYER.P1, size: PIECE_SIZE.M },
    { player: PLAYER.P1, size: PIECE_SIZE.S },
    { player: PLAYER.P1, size: PIECE_SIZE.S },
  ];

  const player1Pieces02: Piece[] = [
    { player: PLAYER.P1, size: PIECE_SIZE.L },
    { player: PLAYER.P1, size: PIECE_SIZE.M },
    { player: PLAYER.P1, size: PIECE_SIZE.M },
    { player: PLAYER.P1, size: PIECE_SIZE.S },
    { player: PLAYER.P1, size: PIECE_SIZE.S },
  ];

  const player1Pieces03: Piece[] = [
    { player: PLAYER.P1, size: PIECE_SIZE.L },
    { player: PLAYER.P1, size: PIECE_SIZE.L },
    { player: PLAYER.P1, size: PIECE_SIZE.M },
    { player: PLAYER.P1, size: PIECE_SIZE.M },
    { player: PLAYER.P1, size: PIECE_SIZE.S },
  ];

  const player2Pieces: Piece[] = [
    { player: PLAYER.P2, size: PIECE_SIZE.L },
    { player: PLAYER.P2, size: PIECE_SIZE.L },
    { player: PLAYER.P2, size: PIECE_SIZE.M },
    { player: PLAYER.P2, size: PIECE_SIZE.M },
    { player: PLAYER.P2, size: PIECE_SIZE.S },
    { player: PLAYER.P2, size: PIECE_SIZE.S },
  ];

  const movedPieceP1S: Piece = { player: PLAYER.P1, size: PIECE_SIZE.S };
  const movedPieceP1M: Piece = { player: PLAYER.P1, size: PIECE_SIZE.M };
  const movedPieceP1L: Piece = { player: PLAYER.P1, size: PIECE_SIZE.L };
  const movedPieceP2S: Piece = { player: PLAYER.P2, size: PIECE_SIZE.S };
  const movedPieceP2M: Piece = { player: PLAYER.P2, size: PIECE_SIZE.M };
  const movedPieceP2L: Piece = { player: PLAYER.P2, size: PIECE_SIZE.L };

  const moveToIndex = 0;
  // #endregion

  // #region 期待値
  const updatedBoardPieces01: Piece[][] = [
    [{ player: PLAYER.P1, size: PIECE_SIZE.S }],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  const updatedBoardPieces02: Piece[][] = [
    [{ player: PLAYER.P1, size: PIECE_SIZE.M }],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  const updatedBoardPieces03: Piece[][] = [
    [{ player: PLAYER.P1, size: PIECE_SIZE.L }],
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
    [{ player: PLAYER.P2, size: PIECE_SIZE.S }],
    [{ player: PLAYER.P1, size: PIECE_SIZE.L }],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  const updatedBoardPieces05: Piece[][] = [
    [{ player: PLAYER.P2, size: PIECE_SIZE.M }],
    [{ player: PLAYER.P1, size: PIECE_SIZE.L }],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  const updatedBoardPieces06: Piece[][] = [
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
  ];

  const updatedPlayer1Pieces01: Piece[] = [
    { player: PLAYER.P1, size: PIECE_SIZE.L },
    { player: PLAYER.P1, size: PIECE_SIZE.L },
    { player: PLAYER.P1, size: PIECE_SIZE.M },
    { player: PLAYER.P1, size: PIECE_SIZE.M },
    { player: PLAYER.P1, size: PIECE_SIZE.S },
  ];

  const updatedPlayer1Pieces02: Piece[] = [
    { player: PLAYER.P1, size: PIECE_SIZE.L },
    { player: PLAYER.P1, size: PIECE_SIZE.L },
    { player: PLAYER.P1, size: PIECE_SIZE.M },
    { player: PLAYER.P1, size: PIECE_SIZE.S },
    { player: PLAYER.P1, size: PIECE_SIZE.S },
  ];

  const updatedPlayer1Pieces03: Piece[] = [
    { player: PLAYER.P1, size: PIECE_SIZE.L },
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
    { player: PLAYER.P2, size: PIECE_SIZE.L },
    { player: PLAYER.P2, size: PIECE_SIZE.M },
    { player: PLAYER.P2, size: PIECE_SIZE.M },
    { player: PLAYER.P2, size: PIECE_SIZE.S },
  ];

  const updatedPlayer2Pieces03: Piece[] = [
    { player: PLAYER.P2, size: PIECE_SIZE.L },
    { player: PLAYER.P2, size: PIECE_SIZE.L },
    { player: PLAYER.P2, size: PIECE_SIZE.M },
    { player: PLAYER.P2, size: PIECE_SIZE.S },
    { player: PLAYER.P2, size: PIECE_SIZE.S },
  ];

  const updatedPlayer2Pieces04: Piece[] = [
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
      'No.1 : P1Sを駒置き場から移動させる, 移動先に駒がない',
      boardPieces01,
      player1Pieces01,
      player2Pieces,
      PLAYER.P1,
      movedPieceP1S,
      updatedBoardPieces01,
      updatedPlayer1Pieces01,
      updatedPlayer2Pieces01,
      PLAYER.P2,
    ],
    [
      'No.2 : P1Mを駒置き場から移動させる, 移動先に駒がない',
      boardPieces01,
      player1Pieces01,
      player2Pieces,
      PLAYER.P1,
      movedPieceP1M,
      updatedBoardPieces02,
      updatedPlayer1Pieces02,
      updatedPlayer2Pieces01,
      PLAYER.P2,
    ],
    [
      'No.3 : P1Lを駒置き場から移動させる, 移動先に駒がない',
      boardPieces01,
      player1Pieces01,
      player2Pieces,
      PLAYER.P1,
      movedPieceP1L,
      updatedBoardPieces03,
      updatedPlayer1Pieces03,
      updatedPlayer2Pieces01,
      PLAYER.P2,
    ],
    [
      'No.4 : P2Sを駒置き場から移動させる, 移動先に駒がない',
      boardPieces02,
      player1Pieces02,
      player2Pieces,
      PLAYER.P2,
      movedPieceP2S,
      updatedBoardPieces04,
      updatedPlayer1Pieces03,
      updatedPlayer2Pieces02,
      PLAYER.P1,
    ],
    [
      'No.5 : P2Mを駒置き場から移動させる, 移動先に駒がない',
      boardPieces02,
      player1Pieces02,
      player2Pieces,
      PLAYER.P2,
      movedPieceP2M,
      updatedBoardPieces05,
      updatedPlayer1Pieces03,
      updatedPlayer2Pieces03,
      PLAYER.P1,
    ],
    [
      'No.6 : P2Lを駒置き場から移動させる, 移動先に駒がある',
      boardPieces03,
      player1Pieces03,
      player2Pieces,
      PLAYER.P2,
      movedPieceP2L,
      updatedBoardPieces06,
      updatedPlayer1Pieces01,
      updatedPlayer2Pieces04,
      PLAYER.P1,
    ],
  ])(
    '%s',
    /**
     * @param {string} _testCase テストケース名
     * @param {Piece[][]} inputBoardPieces 入力データ：state更新前の盤上の駒の情報
     * @param {Piece[]} inputPlayer1Pieces 入力データ：state更新前のプレイヤー1の駒置き場の駒
     * @param {Piece[]} inputPlayer2Pieces 入力データ：state更新前のプレイヤー2の駒置き場の駒
     * @param {Player} inputPlayingPlayer 入力データ：state更新前の現在の手番
     * @param {Piece} inputMovedPiece 入力データ：移動させる駒の情報
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
      inputMovedPiece,
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
      const action = movePieceFromStandAction(_.cloneDeep(inputMovedPiece), moveToIndex);

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
