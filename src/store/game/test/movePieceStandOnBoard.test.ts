import _ from 'lodash';

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
  test.each([
    [
      'No.1 : 移動先に駒がない, 移動元のマスの配置履歴の個数が1個, プレイヤー1の手番',
      boardPieces01,
      PLAYER.P1,
      movedPieceP1L,
      updatedBoardPieces01,
      PLAYER.P2,
    ],
    [
      'No.2 : 移動先に駒がない, 移動元のマスの配置履歴の個数が3個, プレイヤー1の手番',
      boardPieces02,
      PLAYER.P1,
      movedPieceP1L,
      updatedBoardPieces02,
      PLAYER.P2,
    ],
    [
      'No.3 : 移動先に駒がある, 移動元のマスの配置履歴の個数が1個, プレイヤー2の手番',
      boardPieces03,
      PLAYER.P2,
      movedPieceP2L,
      updatedBoardPieces03,
      PLAYER.P1,
    ],
    [
      'No.4 : 移動先に駒がある, 移動元のマスの配置履歴の個数が3個, プレイヤー2の手番',
      boardPieces04,
      PLAYER.P2,
      movedPieceP2L,
      updatedBoardPieces04,
      PLAYER.P1,
    ],
  ])(
    '%s',
    /**
     * @param {string} _testCase テストケース名
     * @param {Piece[][]} inputBoardPieces 入力データ：state更新前の盤上の駒の情報
     * @param {Player} inputPlayingPlayer 入力データ：state更新前の現在の手番
     * @param {Piece} inputPiece 入力データ：移動させる駒の情報
     * @param {Piece[][]} expectedBoardPieces 期待値：state更新後の盤上の駒の情報
     * @param {Player} expectedPlayingPlayer 期待値：state更新後の現在の手番
     */
    (
      _testCase,
      inputBoardPieces,
      inputPlayingPlayer,
      inputPiece,
      expectedBoardPieces,
      expectedPlayingPlayer
    ) => {
      // 入力
      const inputState = {
        ...INITIAL_STATE,
        boardPieces: inputBoardPieces,
        playingPlayer: inputPlayingPlayer,
      };

      // テスト対象関数の実行
      const action = movePieceStandOnBoardAction(
        _.cloneDeep(inputPiece),
        moveToIndex,
        moveFromIndex
      );

      const result = reducer(_.cloneDeep(inputState), action);

      // テスト結果の確認
      expect(result.boardPieces).toStrictEqual(expectedBoardPieces);
      expect(result.playingPlayer).toStrictEqual(expectedPlayingPlayer);
    }
  );
  // #endregion

  // #region 異常系テスト
  // #endregion
});
