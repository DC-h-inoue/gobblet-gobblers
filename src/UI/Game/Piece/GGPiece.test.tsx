import _ from 'lodash';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import GGPiece from './GGPiece';
import store, { changeGameStateAction } from 'utils/test_mock/store';
import { PIECE_SIZE, PLAYER } from 'utils/constants';

describe('GGPiece', () => {
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
    boardPieces: [[{ size: PIECE_SIZE.L, player: PLAYER.P1 }], [], [], [], [], [], [], []],
    player1Pieces: [
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
    playingPlayer: PLAYER.P2,
  };

  const testClassName01 = 'test';
  const testClassName02 = 'gg-test';

  const pieceP1S = { size: PIECE_SIZE.S, player: PLAYER.P1 };
  const pieceP1M = { size: PIECE_SIZE.M, player: PLAYER.P1 };
  const pieceP2L = { size: PIECE_SIZE.L, player: PLAYER.P2 };

  const pieceStandBoardSquareIndex = -1;
  const boardSquareIndex0 = 0;
  // #endregion

  // #region 期待値
  const P1ClassName = 'p1';
  const P2ClassName = 'p2';

  const draggablePieceClassName = 'is-draggable';

  const pieceStandPieceClassName = 'is-standing-piece-stand';

  const pieceTextContentsS = PIECE_SIZE.S[0].toUpperCase();
  const pieceTextContentsM = PIECE_SIZE.M[0].toUpperCase();
  const pieceTextContentsL = PIECE_SIZE.L[0].toUpperCase();
  // #endregion

  // #endregion

  // #region グローバル処理
  // #endregion

  // #region 正常系テスト
  test('No.1：\t・props で渡ったクラス名"test"が駒のクラス名に設定されていること\n\t\t・props で渡った piece のサイズがSの時、駒のクラス名が適切に設定されていること\n\t\t・props で渡った piece のサイズがSの時、駒に Sという文字が書かれていること\n\t\t・props で渡った boardSquareIndex が駒置き場上の位置である時、クラス名"is-standing-piece-stand"が設定されていること\n\t\t・props で渡った piece のプレイヤー情報がplayer1の時、駒のクラス名が設定されていること\n\t\t・gameState の playingPlayerがプレイヤー1である場合、クラス名"is-draggable"が設定されていること', () => {
    // 入力
    const inputClassName = testClassName01;
    const inputPiece = pieceP1S;
    const inputBoardSquareIndex = pieceStandBoardSquareIndex;
    const inputGameState = initialGameState;

    // 期待値
    const expectedClassName = testClassName01;
    const expectedPlayerClassName = P1ClassName;
    const expectedSizeClassName = PIECE_SIZE.S;
    const expectedDraggablePieceClassName = draggablePieceClassName;
    const expectedPieceStandPieceClassName = pieceStandPieceClassName;
    const expectedTextContents = pieceTextContentsS;

    // 対象コンポーネントのレンダリング及び処理実行
    render(
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <GGPiece
            className={inputClassName}
            piece={inputPiece}
            boardSquareIndex={inputBoardSquareIndex}
          />
        </DndProvider>
      </Provider>
    );

    act(() => {
      store.dispatch(changeGameStateAction(_.cloneDeep(inputGameState)));
    });

    // 期待値の確認
    // 要素が正しく描画されているか確認
    expect(screen.getByTestId('gg_piece')).toBeInTheDocument();
    // クラス名の確認
    expect(screen.getByTestId('gg_piece')).toHaveClass(expectedClassName);
    expect(screen.getByTestId('gg_piece')).toHaveClass(expectedSizeClassName);
    expect(screen.getByTestId('gg_piece')).toHaveClass(expectedPlayerClassName);
    expect(screen.getByTestId('gg_piece')).toHaveClass(expectedDraggablePieceClassName);
    expect(screen.getByTestId('gg_piece')).toHaveClass(expectedPieceStandPieceClassName);
    // 駒に表示される文字の確認
    expect(screen.getByTestId('gg_piece')).toHaveTextContent(expectedTextContents);
  });

  test('No.2：\t・props で渡ったクラス名"gg-test"が駒のクラス名に設定されていること\n\t\t・props で渡った piece のサイズがMの時、駒のクラス名が適切に設定されていること\n\t\t・props で渡った piece のサイズがMの時、駒に Mという文字が書かれていること\n\t\t・props で渡った boardSquareIndex が盤面上の位置である時、クラス名"is-standing-piece-stand"が設定されていないこと\n\t\t・props で渡った piece のプレイヤー情報がplayer1の時、駒のクラス名が適切に設定されていること\n\t\t・gameState の playingPlayerがプレイヤー2である場合、クラス名"is-draggable"が設定されていないこと', () => {
    // 入力
    const inputClassName = testClassName02;
    const inputPiece = pieceP1M;
    const inputBoardSquareIndex = boardSquareIndex0;
    const inputGameState = gameState01;

    // 期待値
    const expectedClassName = testClassName02;
    const expectedPlayerClassName = P1ClassName;
    const expectedSizeClassName = PIECE_SIZE.M;
    const expectedDraggablePieceClassName = draggablePieceClassName;
    const expectedPieceStandPieceClassName = pieceStandPieceClassName;
    const expectedTextContents = pieceTextContentsM;

    // 対象コンポーネントのレンダリング及び処理実行
    render(
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <GGPiece
            className={inputClassName}
            piece={inputPiece}
            boardSquareIndex={inputBoardSquareIndex}
          />
        </DndProvider>
      </Provider>
    );

    act(() => {
      store.dispatch(changeGameStateAction(_.cloneDeep(inputGameState)));
    });

    // 期待値の確認
    // クラス名の確認
    expect(screen.getByTestId('gg_piece')).toHaveClass(expectedClassName);
    expect(screen.getByTestId('gg_piece')).toHaveClass(expectedSizeClassName);
    expect(screen.getByTestId('gg_piece')).toHaveClass(expectedPlayerClassName);
    expect(screen.getByTestId('gg_piece')).not.toHaveClass(expectedDraggablePieceClassName);
    expect(screen.getByTestId('gg_piece')).not.toHaveClass(expectedPieceStandPieceClassName);
    // 駒に表示される文字の確認
    expect(screen.getByTestId('gg_piece')).toHaveTextContent(expectedTextContents);
  });

  test('No.3：\t・props でクラス名に何も渡されなかったとき、駒のクラス名に設定されていないこと\n\t\t・props で渡った piece のサイズがLの時、駒のクラス名が適切に設定されていること\n\t\t・props で渡った piece のサイズがLの時、駒に Mという文字が書かれていること\n\t\t・props で渡った piece のプレイヤー情報がplayer2で、gameState の playingPlayerがプレイヤー1である場合、クラス名"is-draggable"が設定されていないこと', () => {
    // 入力
    const inputPiece = pieceP2L;
    const inputBoardSquareIndex = pieceStandBoardSquareIndex;
    const inputGameState = initialGameState;

    // 期待値
    const expectedPlayerClassName = P2ClassName;
    const expectedSizeClassName = PIECE_SIZE.L;
    const expectedDraggablePieceClassName = draggablePieceClassName;
    const expectedPieceStandPieceClassName = pieceStandPieceClassName;
    const expectedTextContents = pieceTextContentsL;

    // 対象コンポーネントのレンダリング及び処理実行
    render(
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <GGPiece piece={inputPiece} boardSquareIndex={inputBoardSquareIndex} />
        </DndProvider>
      </Provider>
    );

    act(() => {
      store.dispatch(changeGameStateAction(_.cloneDeep(inputGameState)));
    });

    // 期待値の確認
    // クラス名の確認
    expect(screen.getByTestId('gg_piece')).not.toHaveClass(testClassName01);
    expect(screen.getByTestId('gg_piece')).toHaveClass(expectedSizeClassName);
    expect(screen.getByTestId('gg_piece')).toHaveClass(expectedPlayerClassName);
    expect(screen.getByTestId('gg_piece')).not.toHaveClass(expectedDraggablePieceClassName);
    expect(screen.getByTestId('gg_piece')).toHaveClass(expectedPieceStandPieceClassName);
    // 駒に表示される文字の確認
    expect(screen.getByTestId('gg_piece')).toHaveTextContent(expectedTextContents);
  });

  test('No.4：\tprops で渡った piece のプレイヤー情報がplayer2で、gameState の playingPlayerがプレイヤー2である場合、クラス名"is-draggable"が設定されていること', () => {
    // 入力
    const inputClassName = testClassName01;
    const inputPiece = pieceP2L;
    const inputBoardSquareIndex = pieceStandBoardSquareIndex;
    const inputGameState = gameState01;

    // 期待値
    const expectedClassName = testClassName01;
    const expectedPlayerClassName = P2ClassName;
    const expectedSizeClassName = PIECE_SIZE.L;
    const expectedDraggablePieceClassName = draggablePieceClassName;
    const expectedPieceStandPieceClassName = pieceStandPieceClassName;
    const expectedTextContents = pieceTextContentsL;

    // 対象コンポーネントのレンダリング及び処理実行
    render(
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <GGPiece
            className={inputClassName}
            piece={inputPiece}
            boardSquareIndex={inputBoardSquareIndex}
          />
        </DndProvider>
      </Provider>
    );

    act(() => {
      store.dispatch(changeGameStateAction(_.cloneDeep(inputGameState)));
    });

    // 期待値の確認
    // クラス名の確認
    expect(screen.getByTestId('gg_piece')).toHaveClass(expectedClassName);
    expect(screen.getByTestId('gg_piece')).toHaveClass(expectedSizeClassName);
    expect(screen.getByTestId('gg_piece')).toHaveClass(expectedPlayerClassName);
    expect(screen.getByTestId('gg_piece')).toHaveClass(expectedDraggablePieceClassName);
    expect(screen.getByTestId('gg_piece')).toHaveClass(expectedPieceStandPieceClassName);
    // 駒に表示される文字の確認
    expect(screen.getByTestId('gg_piece')).toHaveTextContent(expectedTextContents);
  });
  // #endregion

  // #redion 異常系テスト
  // #endregion
});
