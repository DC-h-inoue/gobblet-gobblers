import _ from 'lodash';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import store, { changeGameStateAction } from 'utils/test_mock/store';
import { PIECE_SIZE, PLAYER } from 'utils/constants';
import GGBoard from './GGBoard';

// 関数のモック化
jest.mock('./Square/GGSquare', () => {
  return function DummyMock(props: any) {
    return <div data-testid="gg_square">{JSON.stringify(props)}</div>;
  };
});

describe('GGBoard', () => {
  // #region テストデータ
  // #region 入力
  const testGameState = {
    boardPieces: [
      [{ size: PIECE_SIZE.S, player: PLAYER.P1 }],
      [{ size: PIECE_SIZE.M, player: PLAYER.P1 }],
      [{ size: PIECE_SIZE.L, player: PLAYER.P2 }],
      [{ size: PIECE_SIZE.S, player: PLAYER.P2 }],
      [{ size: PIECE_SIZE.M, player: PLAYER.P2 }],
      [{ size: PIECE_SIZE.L, player: PLAYER.P1 }],
      [
        { size: PIECE_SIZE.S, player: PLAYER.P1 },
        { size: PIECE_SIZE.L, player: PLAYER.P1 },
      ],
      [
        { size: PIECE_SIZE.S, player: PLAYER.P2 },
        { size: PIECE_SIZE.M, player: PLAYER.P1 },
        { size: PIECE_SIZE.L, player: PLAYER.P2 },
      ],
      [],
    ],
    player1Pieces: [],
    player2Pieces: [{ size: PIECE_SIZE.M, player: PLAYER.P2 }],
    playingPlayer: PLAYER.P2,
  };

  const testClassName01 = 'test';
  const testClassName02 = 'gg-test';
  // #endregion

  // #region 期待値
  // #endregion
  // #endregion

  // #region グローバル処理
  beforeAll(() => {
    store.dispatch(changeGameStateAction(_.cloneDeep(testGameState)));
  });
  // #endregion

  // #region 正常系テスト
  test.each([
    [
      'No.1：・props で渡ったクラス名"test"が盤面のクラス名に設定されていること\n\t    ・gameState.boardPiecesの中身が、各GGSquareコンポーネントのprops.pieceHistoryに正しく設定されていること\n\t    ・各GGSquareコンポーネントのprops.indexが正しく設定されていること\n\t    ・GGSquareコンポーネントが、gameState.boardPiecesの要素数の分だけ描画されていること',
      testClassName01,
    ],
    [
      'No.2：・props で渡ったクラス名"gg-test"が盤面のクラス名に設定されていること',
      testClassName02,
    ],
  ])(
    '%s',
    /**
     * @param {string} _testCase テストケース名
     * @param {string} inputTestClassName 外部から受け取ったクラス名
     */
    (_testCase, inputTestClassName) => {
      // 期待値
      const expectedTestClassName = inputTestClassName;

      // 対象コンポーネントのレンダリング及び処理実行
      render(
        <Provider store={store}>
          <GGBoard className={inputTestClassName} />
        </Provider>
      );

      // 期待値の確認
      expect(screen.getByTestId('gg_board')).toBeInTheDocument();
      expect(screen.getByTestId('gg_board')).toHaveClass(expectedTestClassName);
      // GGSquareコンポーネントのprops確認
      screen.getAllByTestId('gg_square').forEach((component, index) => {
        expect(component).toHaveTextContent(
          JSON.stringify({ pieceHistory: testGameState.boardPieces[index], index: index })
        );
      });
      // GGSquareコンポーネントの呼び出し回数
      expect(screen.getAllByTestId('gg_square')).toHaveLength(testGameState.boardPieces.length);
    }
  );

  test('No.3：・props でクラス名が渡されなかった時に、盤面のクラス名に何も追加されていないこと', () => {
    // 対象コンポーネントのレンダリング及び処理実行
    render(
      <Provider store={store}>
        <GGBoard />
      </Provider>
    );

    // 期待値の確認
    expect(screen.getByTestId('gg_board')).not.toHaveClass(testClassName01);
    // GGSquareコンポーネントのprops確認
    screen.getAllByTestId('gg_square').forEach((component, index) => {
      expect(component).toHaveTextContent(
        JSON.stringify({ pieceHistory: testGameState.boardPieces[index], index: index })
      );
    });
    // GGSquareコンポーネントの呼び出し回数
    expect(screen.getAllByTestId('gg_square')).toHaveLength(testGameState.boardPieces.length);
  });
  // #endregion

  // #redion 異常系テスト
  // #endregion
});
