import _ from 'lodash';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

import store, { changeGameStateAction } from 'utils/test_mock/store';
import { PIECE_SIZE, PLAYER } from 'utils/constants';
import GGPieceStand from './GGPieceStand';

// 関数のモック化
jest.mock('../Piece/GGPiece', () => {
  return function DummyMock(props: any) {
    return <div data-testid="gg_piece">{JSON.stringify(props)}</div>;
  };
});

describe('GGPieceStand', () => {
  // #region テストデータ
  // #region 入力
  const gameState01 = {
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
      [{ size: PIECE_SIZE.M, player: PLAYER.P2 }],
    ],
    player1Pieces: [],
    player2Pieces: [],
    playingPlayer: PLAYER.P1,
  };

  const gameState02 = {
    boardPieces: [
      [{ size: PIECE_SIZE.L, player: PLAYER.P1 }],
      [
        { size: PIECE_SIZE.M, player: PLAYER.P2 },
        { size: PIECE_SIZE.L, player: PLAYER.P1 },
      ],
      [
        { size: PIECE_SIZE.S, player: PLAYER.P2 },
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
      { size: PIECE_SIZE.M, player: PLAYER.P1 },
      { size: PIECE_SIZE.S, player: PLAYER.P1 },
      { size: PIECE_SIZE.S, player: PLAYER.P1 },
    ],
    player2Pieces: [
      { size: PIECE_SIZE.S, player: PLAYER.P2 },
      { size: PIECE_SIZE.M, player: PLAYER.P2 },
      { size: PIECE_SIZE.L, player: PLAYER.P2 },
    ],
    playingPlayer: PLAYER.P1,
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
  test.each([
    [
      'No.1：・props で渡ったクラス名"test"が駒置き場のクラス名に設定されていること\n\t    ・propsで渡ったplayerがプレイヤー1の時でかつ、gameState.player1Piecesの要素数が0の時、GGPieceコンポーネントが描画されていないこと',
      testClassName01,
      PLAYER.P1,
    ],
    [
      'No.2：・props で渡ったクラス名"gg-test"が駒置き場のクラス名に設定されていること\n\t    ・propsで渡ったplayerがプレイヤー2の時でかつ、gameState.player2Piecesの要素数が0の時、GGPieceコンポーネントが描画されていないこと',
      testClassName02,
      PLAYER.P2,
    ],
  ])(
    '%s',
    /**
     * @param {string} _testCase テストケース名
     * @param {string} inputTestClassName 外部から受け取ったクラス名
     * @param {Player} inputPlayer 駒置き場のプレイヤー情報
     */
    (_testCase, inputTestClassName, inputPlayer) => {
      // 入力
      const inputGameState = gameState01;

      // 期待値
      const expectedTestClassName = inputTestClassName;

      // 対象コンポーネントのレンダリング
      render(
        <Provider store={store}>
          <GGPieceStand className={inputTestClassName} player={inputPlayer} />
        </Provider>
      );

      // gameStateの更新
      act(() => {
        store.dispatch(changeGameStateAction(_.cloneDeep(inputGameState)));
      });

      // 期待値の確認
      expect(screen.getByTestId('gg_piece-stand')).toBeInTheDocument();
      expect(screen.getByTestId('gg_piece-stand')).toHaveClass(expectedTestClassName);
      // GGPieceコンポーネントの呼び出し回数
      expect(screen.queryByTestId('gg_piece')).not.toBeInTheDocument();
    }
  );

  test('No.3：・props でクラス名が渡されなかった時に、駒置き場のクラス名に何も追加されていないこと\n\t    ・propsで渡ったplayerがプレイヤー1の時、gameState.player1Piecesの中身に応じて、GGPieceコンポーネントが描画されていること\n\t    ・各GGPieceコンポーネントのprops.piece及びprops.boardSquareIndexが正しく設定されていること\n\t    ・GGPieceコンポーネントがgameState.player1Piecesの要素数の分だけ描画されていること', () => {
    // 入力
    const inputPlayer = PLAYER.P1;
    const inputGameState = gameState02;

    // 対象コンポーネントのレンダリング
    render(
      <Provider store={store}>
        <GGPieceStand player={inputPlayer} />
      </Provider>
    );

    // gameStateの更新
    act(() => {
      store.dispatch(changeGameStateAction(_.cloneDeep(inputGameState)));
    });

    // 期待値の確認
    expect(screen.getByTestId('gg_piece-stand')).toBeInTheDocument();
    expect(screen.getByTestId('gg_piece-stand')).not.toHaveClass(testClassName01);
    // GGPieceコンポーネントの呼び出し回数
    screen.getAllByTestId('gg_piece').forEach((component, index) => {
      expect(component).toHaveTextContent(
        JSON.stringify({
          className: 'piece-item',
          piece: inputGameState.player1Pieces[index],
          boardSquareIndex: -1,
        })
      );
    });
    expect(screen.getAllByTestId('gg_piece')).toHaveLength(inputGameState.player1Pieces.length);
  });

  test('No.4：・propsで渡ったplayerがプレイヤー2の時、gameState.player2Piecesの中身に応じて、GGPieceコンポーネントが描画されていること\n\t    ・各GGPieceコンポーネントのprops.pieceが正しく設定されていること\n\t    ・GGPieceコンポーネントが、gameState.player2Piecesの要素数の分だけ描画されていること', () => {
    // 入力
    const inputTestClassName = testClassName01;
    const inputPlayer = PLAYER.P2;
    const inputGameState = gameState02;

    // 期待値
    const expectedTestClassName = testClassName01;

    // 対象コンポーネントのレンダリング
    render(
      <Provider store={store}>
        <GGPieceStand className={inputTestClassName} player={inputPlayer} />
      </Provider>
    );

    // gameStateの更新
    act(() => {
      store.dispatch(changeGameStateAction(_.cloneDeep(inputGameState)));
    });

    // 期待値の確認
    expect(screen.getByTestId('gg_piece-stand')).toHaveClass(expectedTestClassName);
    // GGPieceコンポーネントの呼び出し回数
    screen.getAllByTestId('gg_piece').forEach((component, index) => {
      expect(component).toHaveTextContent(
        JSON.stringify({
          className: 'piece-item',
          piece: inputGameState.player2Pieces[index],
          boardSquareIndex: -1,
        })
      );
    });
    expect(screen.getAllByTestId('gg_piece')).toHaveLength(inputGameState.player2Pieces.length);
  });
  // #endregion

  // #region 異常系テスト
  // #endregion
});
