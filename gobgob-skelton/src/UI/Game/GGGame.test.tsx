import _ from 'lodash';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import GGGame from './GGGame';
import store, { changeGameStateAction } from 'utils/test_mock/store';
import * as helper from 'utils/helper';
import { PIECE_SIZE, PLAYER } from 'utils/constants';

// 関数のモック化
jest.mock('UI/History/GGHistory', () => 'GGHistory');
jest.mock('./Board/GGBoard', () => 'GGBoard');
jest.mock('./PieceStand/GGPieceStand', () => 'GGPieceStand');

const checkWinnerSpy = jest.spyOn(helper, 'checkWinner');
const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('GGGame', () => {
  // #region テストデータ
  // #region 入力

  const initialGameState = {
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

  const gameState01 = {
    boardPieces: [[{ size: PIECE_SIZE.S, player: PLAYER.P1 }], [], [], [], [], [], [], [], []],
    player1Pieces: [
      { size: PIECE_SIZE.L, player: PLAYER.P1 },
      { size: PIECE_SIZE.L, player: PLAYER.P1 },
      { size: PIECE_SIZE.M, player: PLAYER.P1 },
      { size: PIECE_SIZE.M, player: PLAYER.P1 },
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
    playingPlayer: PLAYER.P2,
  };

  const gameState02 = {
    boardPieces: [
      [{ size: PIECE_SIZE.S, player: PLAYER.P1 }],
      [{ size: PIECE_SIZE.S, player: PLAYER.P1 }],
      [{ size: PIECE_SIZE.M, player: PLAYER.P1 }],
      [{ size: PIECE_SIZE.S, player: PLAYER.P2 }],
      [],
      [],
      [{ size: PIECE_SIZE.M, player: PLAYER.P2 }],
      [],
      [],
    ],
    player1Pieces: [
      { size: PIECE_SIZE.L, player: PLAYER.P1 },
      { size: PIECE_SIZE.L, player: PLAYER.P1 },
      { size: PIECE_SIZE.M, player: PLAYER.P1 },
    ],
    player2Pieces: [
      { size: PIECE_SIZE.L, player: PLAYER.P2 },
      { size: PIECE_SIZE.L, player: PLAYER.P2 },
      { size: PIECE_SIZE.M, player: PLAYER.P2 },
      { size: PIECE_SIZE.S, player: PLAYER.P2 },
    ],
    playingPlayer: PLAYER.P2,
  };

  const gameState03 = {
    boardPieces: [
      [
        { size: PIECE_SIZE.S, player: PLAYER.P1 },
        { size: PIECE_SIZE.M, player: PLAYER.P2 },
      ],
      [
        { size: PIECE_SIZE.S, player: PLAYER.P1 },
        { size: PIECE_SIZE.M, player: PLAYER.P2 },
      ],
      [
        { size: PIECE_SIZE.M, player: PLAYER.P1 },
        { size: PIECE_SIZE.L, player: PLAYER.P2 },
      ],
      [],
      [],
      [],
      [],
      [],
      [],
    ],
    player1Pieces: [
      { size: PIECE_SIZE.L, player: PLAYER.P1 },
      { size: PIECE_SIZE.L, player: PLAYER.P1 },
      { size: PIECE_SIZE.M, player: PLAYER.P1 },
    ],
    player2Pieces: [
      { size: PIECE_SIZE.L, player: PLAYER.P2 },
      { size: PIECE_SIZE.S, player: PLAYER.P2 },
      { size: PIECE_SIZE.S, player: PLAYER.P2 },
    ],
    playingPlayer: PLAYER.P1,
  };

  const checkWinnerRetVal01 = PLAYER.P1;
  const checkWinnerRetVal02 = PLAYER.P2;
  // #endregion

  // #region 期待値
  const player1Message = 'Player1のターン';
  const player2Message = 'Player2のターン';

  const alertMessageP1 = 'ゲーム終了です！Player1の勝ちです';
  const alertMessageP2 = 'ゲーム終了です！Player2の勝ちです';

  const checkWinnerArg01 = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  const checkWinnerArg02 = [
    { size: PIECE_SIZE.S, player: PLAYER.P1 },
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  const checkWinnerArg03 = [
    { size: PIECE_SIZE.S, player: PLAYER.P1 },
    { size: PIECE_SIZE.S, player: PLAYER.P1 },
    { size: PIECE_SIZE.M, player: PLAYER.P1 },
    { size: PIECE_SIZE.S, player: PLAYER.P2 },
    undefined,
    undefined,
    { size: PIECE_SIZE.M, player: PLAYER.P2 },
    undefined,
    undefined,
  ];
  const checkWinnerArg04 = [
    { size: PIECE_SIZE.M, player: PLAYER.P2 },
    { size: PIECE_SIZE.M, player: PLAYER.P2 },
    { size: PIECE_SIZE.L, player: PLAYER.P2 },
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];

  // #endregion
  // #endregion

  // #region グローバル処理
  afterEach(() => {
    store.dispatch(changeGameStateAction(_.cloneDeep(initialGameState)));
    alertSpy.mockClear();
    checkWinnerSpy.mockClear();
  });
  // #endregion

  // #region 正常系テスト
  test.each([
    [
      'No.1：ストアのplayingPlayerの値がPLAYER.P1の時、「Player1のターン」という文字列が存在するか',
      initialGameState,
      player1Message,
    ],
    [
      'No.2：ストアのplayingPlayerの値がPLAYER.P2の時、「Player2のターン」という文字列が存在するか',
      gameState01,
      player2Message,
    ],
  ])(
    '%s',
    /**
     * @param {string} _testCase テストケース名
     * @param {GameState} inputGameState 盤面の情報
     * @param {string} expectedPlayerMessage 現在の手番の情報
     */
    (_testCase, inputGameState, expectedPlayerMessage) => {
      // 対象コンポーネントのレンダリング及び処理実行
      render(
        <Provider store={store}>
          <GGGame />
        </Provider>
      );

      store.dispatch(changeGameStateAction(_.cloneDeep(inputGameState)));

      // 期待値の確認
      expect(screen.getByTestId('playing-player-info')).toHaveTextContent(expectedPlayerMessage);
    }
  );

  test('No.3：checkWinner()の返り値がnullの時、何も表示されない', () => {
    // 入力
    const inputGameState = gameState01;
    // モックの戻り値
    checkWinnerSpy.mockReturnValue(null);

    // 期待値
    // モックの引数
    const mockArgCheckWinnerFirst = checkWinnerArg01;
    const mockArgCheckWinnerSecond = checkWinnerArg02;

    // 対象コンポーネントのレンダリング
    render(
      <Provider store={store}>
        <GGGame />
      </Provider>
    );
    // 初回レンダー時の期待値確認
    expect(alertSpy).not.toHaveBeenCalled();
    expect(checkWinnerSpy).toHaveBeenCalledWith(mockArgCheckWinnerFirst);
    expect(checkWinnerSpy).toHaveBeenCalledTimes(1);

    // gameStateの変更
    act(() => {
      store.dispatch(changeGameStateAction(_.cloneDeep(inputGameState)));
    });
    // 再レンダー後の期待値確認
    expect(alertSpy).not.toHaveBeenCalled();
    expect(checkWinnerSpy).toHaveBeenCalledWith(mockArgCheckWinnerSecond);
    expect(checkWinnerSpy).toHaveBeenCalledTimes(2);
  });

  test.each([
    [
      'No.4：checkWinner()の返り値がPLAYER.P1の時、「ゲーム終了です！Player1の勝ちです」というメッセージが表示されるか',
      gameState02,
      checkWinnerRetVal01,
      alertMessageP1,
      checkWinnerArg03,
    ],
    [
      'No.5：checkWinner()の返り値がPLAYER.P2の時、「ゲーム終了です！Player2の勝ちです」というメッセージが表示されるか',
      gameState03,
      checkWinnerRetVal02,
      alertMessageP2,
      checkWinnerArg04,
    ],
  ])(
    /**
     * @param {string} _testCase テストケース名
     * @param {GameState} inputGameState 盤面の情報
     * @param {number} inputCheckWinnerRetVal checkWinnerの返り値
     * @param {string} expectedAlertMessage 勝敗決定時のメッセージ
     * @param {Piece[]} mockArgCheckWinnerSecond 再レンダー後のcheckWinnerの引数
     */
    '%s',
    (
      _testCase,
      inputGameState,
      mockResponseCheckWinnerRetVal,
      expectedAlertMessage,
      mockArgCheckWinnerSecond
    ) => {
      // 入力
      // モックの戻り値
      checkWinnerSpy.mockReturnValueOnce(null).mockReturnValueOnce(mockResponseCheckWinnerRetVal);

      // 期待値
      // モックへの出力
      const mockArgAlertMessage = expectedAlertMessage;
      const mockArgCheckWinnerFirst = checkWinnerArg01;

      // 対象コンポーネントのレンダリング
      render(
        <Provider store={store}>
          <GGGame />
        </Provider>
      );
      // 初回レンダー時の期待値確認
      expect(alertSpy).not.toHaveBeenCalled();
      expect(checkWinnerSpy).toHaveBeenCalledWith(mockArgCheckWinnerFirst);
      expect(checkWinnerSpy).toHaveBeenCalledTimes(1);

      // gameStateの変更
      act(() => {
        store.dispatch(changeGameStateAction(_.cloneDeep(inputGameState)));
      });
      // 期待値の確認
      expect(alertSpy).toHaveBeenCalledWith(mockArgAlertMessage);
      expect(alertSpy).toHaveBeenCalledTimes(1);
      expect(checkWinnerSpy).toHaveBeenCalledWith(mockArgCheckWinnerSecond);
      expect(checkWinnerSpy).toHaveBeenCalledTimes(2);
    }
  );
  // #endregion

  // #redion 異常系テスト
  // #endregion
});
