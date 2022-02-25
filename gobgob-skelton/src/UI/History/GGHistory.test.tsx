import _ from 'lodash';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import store, { changeHistoryStateAction } from 'utils/test_mock/store';
import { PIECE_SIZE, PLAYER } from 'utils/constants';
import GGHistory from './GGHistory';

// 関数のモック化
jest.mock('./HistoryButton/GGHistoryButton', () => {
  return function DummyMock(props: any) {
    return <div data-testid="gg_history-button">{JSON.stringify(props)}</div>;
  };
});

jest.mock('./RestartButton/GGRestartButton', () => {
  return function DummyMock(props: any) {
    return <div data-testid="gg_restart-button">{JSON.stringify(props)}</div>;
  };
});

describe('GGHistory', () => {
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
    boardPieces: [[], [{ size: PIECE_SIZE.S, player: PLAYER.P1 }], [], [], [], [], [], [], []],
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
      [],
      [
        { size: PIECE_SIZE.S, player: PLAYER.P1 },
        { size: PIECE_SIZE.M, player: PLAYER.P2 },
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
      { size: PIECE_SIZE.S, player: PLAYER.P2 },
      { size: PIECE_SIZE.S, player: PLAYER.P2 },
    ],
    playingPlayer: PLAYER.P1,
  };

  const gameState03 = {
    boardPieces: [
      [],
      [
        { size: PIECE_SIZE.S, player: PLAYER.P1 },
        { size: PIECE_SIZE.M, player: PLAYER.P2 },
        { size: PIECE_SIZE.L, player: PLAYER.P1 },
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
      { size: PIECE_SIZE.L, player: PLAYER.P1 },
      { size: PIECE_SIZE.M, player: PLAYER.P1 },
      { size: PIECE_SIZE.M, player: PLAYER.P1 },
      { size: PIECE_SIZE.S, player: PLAYER.P1 },
    ],
    player2Pieces: [
      { size: PIECE_SIZE.L, player: PLAYER.P2 },
      { size: PIECE_SIZE.L, player: PLAYER.P2 },
      { size: PIECE_SIZE.M, player: PLAYER.P2 },
      { size: PIECE_SIZE.S, player: PLAYER.P2 },
      { size: PIECE_SIZE.S, player: PLAYER.P2 },
    ],
    playingPlayer: PLAYER.P2,
  };

  const initialHistoryState = {
    gameHistory: [initialGameState],
    stepNumber: 0,
  };

  const historyState01 = {
    gameHistory: [initialGameState, gameState01],
    stepNumber: 1,
  };

  const historyState02 = {
    gameHistory: [initialGameState, gameState01, gameState02, gameState03],
    stepNumber: 3,
  };

  const testClassName01 = 'test';
  const testClassName02 = 'gg-test';
  // #endregion

  // #region 期待値
  // #endregion
  // #endregion

  // #region グローバル処理
  // #endregion

  // #region 正常系テスト
  test('No.1：・props で渡ったクラス名"test"がGGHistoryコンポーネントのクラス名に設定されていること\n\t    ・historyState.gameHistory の要素数が1の時、GGHistoryButtonコンポーネントが描画されていないこと\n\t    ・適切なpropsでGGRestartButtonが描画されていること', () => {
    // 入力
    const inputTestClassName = testClassName01;
    const inputHistoryState = initialHistoryState;

    // 期待値
    const expectedTestClassName = inputTestClassName;

    // 対象コンポーネントのレンダリング
    render(
      <Provider store={store}>
        <GGHistory className={inputTestClassName} />
      </Provider>
    );

    // 履歴ストアの更新
    act(() => {
      store.dispatch(changeHistoryStateAction(_.cloneDeep(inputHistoryState)));
    });

    // 期待値の確認
    expect(screen.getByTestId('gg_history')).toHaveClass(expectedTestClassName);
    expect(screen.getByTestId('history-board')).toBeInTheDocument();
    // GGRestartButtonコンポーネントの呼び出し確認
    expect(screen.getAllByTestId('gg_restart-button')).toHaveLength(1);
    expect(screen.getByTestId('gg_restart-button')).toHaveTextContent(
      JSON.stringify({
        className: 'restart-button',
        initialGameState: inputHistoryState.gameHistory[0],
      })
    );
    // GGHistoryButtonコンポーネントの呼び出し確認
    expect(screen.queryByTestId('gg_history-button')).not.toBeInTheDocument();
  });

  test('No.2：・props で渡ったクラス名"gg-test"がGGHistoryコンポーネントのクラス名に設定されていること\n\t    ・historyState.gameHistory の要素数が2以上の時、適切なpropsでGGHistoryButtonコンポーネントが描画されていること\n\t    ・適切なpropsでGGRestartButtonが描画されていること', () => {
    // 入力
    const inputTestClassName = testClassName02;
    const inputHistoryState = historyState01;

    // 期待値
    const expectedTestClassName = inputTestClassName;

    // 対象コンポーネントのレンダリング
    render(
      <Provider store={store}>
        <GGHistory className={inputTestClassName} />
      </Provider>
    );

    // 履歴ストアの更新
    act(() => {
      store.dispatch(changeHistoryStateAction(_.cloneDeep(inputHistoryState)));
    });

    // 期待値の確認
    expect(screen.getByTestId('gg_history')).toHaveClass(expectedTestClassName);
    expect(screen.getByTestId('history-board')).toBeInTheDocument();
    // GGRestartButtonコンポーネントの呼び出し確認
    expect(screen.getAllByTestId('gg_restart-button')).toHaveLength(1);
    expect(screen.getByTestId('gg_restart-button')).toHaveTextContent(
      JSON.stringify({
        className: 'restart-button',
        initialGameState: inputHistoryState.gameHistory[0],
      })
    );
    // GGHistoryButtonコンポーネントの呼び出し確認
    expect(screen.getAllByTestId('gg_history-button')).toHaveLength(
      inputHistoryState.gameHistory.length - 1
    );
    screen.getAllByTestId('gg_history-button').forEach((component, index) => {
      expect(component).toHaveTextContent(
        JSON.stringify({
          prevGameState: inputHistoryState.gameHistory[index + 1],
          prevStepNumber: index + 1,
        })
      );
    });
  });

  test('No.3：・props でクラス名が渡されなかった時に、駒置き場のクラス名に何も追加されていないこと', () => {
    // 入力
    const inputHistoryState = historyState02;

    // 対象コンポーネントのレンダリング
    render(
      <Provider store={store}>
        <GGHistory />
      </Provider>
    );

    // 履歴ストアの更新
    act(() => {
      store.dispatch(changeHistoryStateAction(_.cloneDeep(inputHistoryState)));
    });

    // 期待値の確認
    expect(screen.getByTestId('gg_history')).not.toHaveClass(testClassName01);
    // GGRestartButtonコンポーネントの呼び出し確認
    expect(screen.getAllByTestId('gg_restart-button')).toHaveLength(1);
    expect(screen.getByTestId('gg_restart-button')).toHaveTextContent(
      JSON.stringify({
        className: 'restart-button',
        initialGameState: inputHistoryState.gameHistory[0],
      })
    );
    // GGHistoryButtonコンポーネントの呼び出し確認
    expect(screen.getAllByTestId('gg_history-button')).toHaveLength(
      inputHistoryState.gameHistory.length - 1
    );
    screen.getAllByTestId('gg_history-button').forEach((component, index) => {
      expect(component).toHaveTextContent(
        JSON.stringify({
          prevGameState: inputHistoryState.gameHistory[index + 1],
          prevStepNumber: index + 1,
        })
      );
    });
  });

  // #endregion

  // #redion 異常系テスト
  // #endregion
});
