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
    boardPieces: [
      [{ size: PIECE_SIZE.L, player: PLAYER.P1 }],
      [{ size: PIECE_SIZE.L, player: PLAYER.P2 }],
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
      { size: PIECE_SIZE.S, player: PLAYER.P1 },
    ],
    player2Pieces: [
      { size: PIECE_SIZE.L, player: PLAYER.P2 },
      { size: PIECE_SIZE.M, player: PLAYER.P2 },
      { size: PIECE_SIZE.M, player: PLAYER.P2 },
      { size: PIECE_SIZE.S, player: PLAYER.P2 },
      { size: PIECE_SIZE.S, player: PLAYER.P2 },
    ],
    playingPlayer: PLAYER.P1,
  };

  const className = 'gg-test';

  const pieceP1S = { size: PIECE_SIZE.S, player: PLAYER.P1 };
  const pieceP2M = { size: PIECE_SIZE.M, player: PLAYER.P2 };
  const pieceP1L = { size: PIECE_SIZE.L, player: PLAYER.P1 };

  const boardSquareIndex01 = -1;
  const boardSquareIndex02 = 0;
  // #endregion

  // #region 期待値
  const classNameP1 = 'p1';
  const classNameP2 = 'p2';

  const classNameIsDraggable = 'is-draggable';

  const classNameIsStandingPieceStand = 'is-standing-piece-stand';

  const pieceTextContentsS = PIECE_SIZE.S[0].toUpperCase();
  const pieceTextContentsM = PIECE_SIZE.M[0].toUpperCase();
  const pieceTextContentsL = PIECE_SIZE.L[0].toUpperCase();
  // #endregion

  // #endregion

  // #region グローバル処理
  // #endregion

  // #region 正常系テスト
  test('No.1：・props で渡ったクラス名が駒のクラス名に設定されていること\n\t    ・props で渡った piece のサイズがSの時、駒のクラス名が適切に設定されていること\n\t    ・props で渡った piece のサイズがSの時、駒に Sという文字が書かれていること\n\t    ・props で渡った boardSquareIndex が駒置き場上の位置である時、クラス名が設定されていること\n\t    ・props で渡った piece のプレイヤー情報がplayer1の時、駒のクラス名が設定されていること\n\t    ・gameState の playingPlayer とprops で渡った piece のプレイヤー情報が同じ時、クラス名が設定されていること', () => {
    // 入力
    const inputClassName = className;
    const inputPiece = pieceP1S;
    const inputBoardSquareIndex = boardSquareIndex01;
    const inputGameState = initialGameState;

    // 期待値
    const expectedClassName = className;
    const expectedSizeClassName = PIECE_SIZE.S;
    const expectedPlayerClassName = classNameP1;
    const expectedClassNameIsDraggable = classNameIsDraggable;
    const expectedClassNameIsPieceStand = classNameIsStandingPieceStand;
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
    // クラス名の確認
    expect(screen.getByTestId('gg_piece piece')).toHaveClass(expectedClassName);
    expect(screen.getByTestId('gg_piece piece')).toHaveClass(expectedSizeClassName);
    expect(screen.getByTestId('gg_piece piece')).toHaveClass(expectedPlayerClassName);
    expect(screen.getByTestId('gg_piece piece')).toHaveClass(expectedClassNameIsDraggable);
    expect(screen.getByTestId('gg_piece piece')).toHaveClass(expectedClassNameIsPieceStand);
    // 駒に表示される文字の確認
    expect(screen.getByTestId('gg_piece piece')).toHaveTextContent(expectedTextContents);
  });

  test('No.2：・props で渡った piece のサイズがMの時、駒のクラス名が適切に設定されていること\n\t    ・props で渡った piece のサイズがMの時、駒に Mという文字が書かれていること\n\t    ・gameState の playingPlayer とprops で渡った piece のプレイヤー情報が違う時、クラス名が設定されていないこと', () => {
    // 入力
    const inputClassName = className;
    const inputPiece = pieceP2M;
    const inputBoardSquareIndex = boardSquareIndex01;
    const inputGameState = initialGameState;

    // 期待値
    const expectedClassName = className;
    const expectedSizeClassName = PIECE_SIZE.M;
    const expectedPlayerClassName = classNameP2;
    const expectedClassNameIsDraggable = classNameIsDraggable;
    const expectedClassNameIsPieceStand = classNameIsStandingPieceStand;
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
    expect(screen.getByTestId('gg_piece piece')).toHaveClass(expectedClassName);
    expect(screen.getByTestId('gg_piece piece')).toHaveClass(expectedSizeClassName);
    expect(screen.getByTestId('gg_piece piece')).toHaveClass(expectedPlayerClassName);
    expect(screen.getByTestId('gg_piece piece')).not.toHaveClass(expectedClassNameIsDraggable);
    expect(screen.getByTestId('gg_piece piece')).toHaveClass(expectedClassNameIsPieceStand);
    // 駒に表示される文字の確認
    expect(screen.getByTestId('gg_piece piece')).toHaveTextContent(expectedTextContents);
  });

  test('No.3：・props で渡った piece のサイズがLの時、駒のクラス名が適切に設定されていること\n\t    ・props で渡った piece のサイズがLの時、駒に Lという文字が書かれていること\n\t    ・props で渡った piece のプレイヤー情報がplayer2の時、駒のクラス名が設定されているか\n\t    ・props で渡った boardSquareIndex が盤面上の位置である時、クラス名が設定されていないこと', () => {
    // 入力
    const inputClassName = className;
    const inputPiece = pieceP1L;
    const inputBoardSquareIndex = boardSquareIndex02;
    const inputGameState = gameState01;

    // 期待値
    const expectedClassName = className;
    const expectedSizeClassName = PIECE_SIZE.L;
    const expectedPlayerClassName = classNameP1;
    const expectedClassNameIsDraggable = classNameIsDraggable;
    const expectedClassNameIsPieceStand = classNameIsStandingPieceStand;
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
    expect(screen.getByTestId('gg_piece piece')).toHaveClass(expectedClassName);
    expect(screen.getByTestId('gg_piece piece')).toHaveClass(expectedSizeClassName);
    expect(screen.getByTestId('gg_piece piece')).toHaveClass(expectedPlayerClassName);
    expect(screen.getByTestId('gg_piece piece')).toHaveClass(expectedClassNameIsDraggable);
    expect(screen.getByTestId('gg_piece piece')).not.toHaveClass(expectedClassNameIsPieceStand);
    // 駒に表示される文字の確認
    expect(screen.getByTestId('gg_piece piece')).toHaveTextContent(expectedTextContents);
  });
  // #endregion

  // #redion 異常系テスト
  // #endregion
});
