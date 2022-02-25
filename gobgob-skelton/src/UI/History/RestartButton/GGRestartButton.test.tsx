import { fireEvent, render, screen } from '@testing-library/react';
import _ from 'lodash';

import * as GameActions from 'store/game/actions';
import * as HistoryActions from 'store/history/actions';
import { PIECE_SIZE, PLAYER } from 'utils/constants';
import { PrevGameState } from 'utils/types';
import GGRestartButton from './GGRestartButton';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

const goBackToPrevBoardActionSpy: jest.SpyInstance = jest
  .spyOn(GameActions, 'goBackToPrevBoardAction')
  .mockImplementation(
    (gameState: PrevGameState): GameActions.ActionType<PrevGameState> => ({
      type: GameActions.GO_BACK_TO_PREV_BOARD,
      payload: gameState,
    })
  );

const deleteHistoryActionSpy: jest.SpyInstance = jest
  .spyOn(HistoryActions, 'deleteHistory')
  .mockImplementation(
    (): HistoryActions.ActionType<undefined> => ({
      type: HistoryActions.DELETE_HISTORY,
      payload: undefined,
    })
  );

describe('GGRestartButton', () => {
  // #region テストデータ
  // #region 入力
  const testClassName01 = 'test';
  const testClassName02 = 'gg-test';

  const initialGameState = {
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
  // #endregion

  // #region 期待値
  // 外部から受け取ったクラス名
  // #endregion
  // #endregion

  // #region グローバル処理
  afterEach(() => {
    goBackToPrevBoardActionSpy.mockClear();
    deleteHistoryActionSpy.mockClear();
  });
  // #endregion

  // #region 正常系テスト
  test.each([
    [
      'No.1：・props で渡ったクラス名"test"がRestartボタンのクラス名に設定されていること',
      testClassName01,
    ],
    [
      'No.2：・props で渡ったクラス名"gg-test"がRestartボタンのクラス名に設定されていること',
      testClassName02,
    ],
  ])(
    '%s',
    /**
     * @param {string} _testCase テストケース名
     * @param {string} inputTestClassName 外部から受け取るクラス名
     */
    (_testCase, inputTestClassName) => {
      // 入力
      const inputInitialGameState = initialGameState;

      // 期待値
      const expectedClassName = inputTestClassName;

      // テスト対象コンポーネントの生成
      render(
        <GGRestartButton
          className={inputTestClassName}
          initialGameState={_.cloneDeep(inputInitialGameState)}
        />
      );

      // 期待値の確認
      // ボタンコンポーネントのクラス名
      expect(screen.getByTestId('gg_restart-button')).toHaveClass(expectedClassName);
    }
  );

  test('No.3：・Props で渡ったクラス名が渡されなかった時、ボタンのクラス名に何も設定されていないこと', () => {
    // 入力
    const inputInitialGameState = initialGameState;

    // テスト対象コンポーネントの生成
    render(<GGRestartButton initialGameState={_.cloneDeep(inputInitialGameState)} />);

    // 期待値の確認
    // ボタンコンポーネントのクラス名
    expect(screen.getByTestId('gg_restart-button')).not.toHaveClass(testClassName01);
  });

  test('No.4：・Restartボタンクリック時の確認画面でOKボタンをクリックした際に、適切な引数で deleteHistoryアクション と goBackToPrevBoardアクション が実行されていること', () => {
    // 入力
    const inputTestClassName = testClassName01;
    const inputInitialGameState = initialGameState;
    // mockの戻り値設定
    window.confirm = jest.fn().mockReturnValue(true);

    // 期待値
    // mockの引数
    const mockArgInitialGameState = initialGameState;

    // テスト対象コンポーネントの生成
    render(
      <GGRestartButton
        className={inputTestClassName}
        initialGameState={_.cloneDeep(inputInitialGameState)}
      />
    );

    // テスト対象コンポーネントのイベントハンドラ実行
    fireEvent.click(screen.getByTestId('gg_restart-button'));

    // 期待値の確認
    // 各関数の呼び出し回数確認
    expect(goBackToPrevBoardActionSpy).toHaveBeenCalledTimes(1);
    expect(deleteHistoryActionSpy).toHaveBeenCalledTimes(1);
    // 各関数の引数確認
    expect(goBackToPrevBoardActionSpy).toHaveBeenCalledWith(mockArgInitialGameState);
  });

  test('No.5：・Restartボタンクリック時の確認画面でキャンセルボタンをクリックした際に、 deleteHistoryアクション と goBackToPrevBoardアクション が実行されていないこと', () => {
    // 入力
    const inputTestClassName = testClassName01;
    const inputInitialGameState = initialGameState;
    // mockの戻り値設定
    window.confirm = jest.fn().mockReturnValue(false);

    // テスト対象コンポーネントの生成
    render(
      <GGRestartButton
        className={inputTestClassName}
        initialGameState={_.cloneDeep(inputInitialGameState)}
      />
    );

    // テスト対象コンポーネントのイベントハンドラ実行
    fireEvent.click(screen.getByTestId('gg_restart-button'));

    // 期待値の確認
    // 各関数の呼び出し回数確認
    expect(goBackToPrevBoardActionSpy).not.toHaveBeenCalled();
    expect(deleteHistoryActionSpy).not.toHaveBeenCalled();
  });
  // #endregion

  // #region 異常系テスト
  // #endregion
});
