import { render, screen } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import GGSquare from './GGSquare';
import { PIECE_SIZE, PLAYER } from 'utils/constants';
import { Piece } from 'utils/types';

// 関数のモック化
jest.mock('react-redux');
jest.mock('../../Piece/GGPiece', () => {
  return function DummyMock(props: any) {
    return <div data-testid="gg_piece">{JSON.stringify(props)}</div>;
  };
});

describe('GGPiece', () => {
  // #region テストデータ
  // #region 入力

  const pieceHistory01: Piece[] = [];
  const pieceHistory02: Piece[] = [{ size: PIECE_SIZE.S, player: PLAYER.P1 }];
  const pieceHistory03: Piece[] = [
    { size: PIECE_SIZE.S, player: PLAYER.P1 },
    { size: PIECE_SIZE.M, player: PLAYER.P2 },
    { size: PIECE_SIZE.L, player: PLAYER.P1 },
  ];

  const index0 = 0;
  const index1 = 1;
  // #endregion

  // #region 期待値
  const pieceP1S: Piece = { size: PIECE_SIZE.S, player: PLAYER.P1 };
  const pieceP1L: Piece = { size: PIECE_SIZE.L, player: PLAYER.P1 };
  // #endregion
  // #endregion

  // #region グローバル処理
  // #endregion

  // #region 正常系テスト
  test('No.1：propsで渡されたpieceHistoryの要素数が0のとき、GGPieceコンポーネントが描画されていないこと', () => {
    // 入力
    const inputIndex = index0;
    const inputPieceHistory = pieceHistory01;

    // 対象コンポーネントのレンダリング
    render(
      <DndProvider backend={HTML5Backend}>
        <GGSquare pieceHistory={inputPieceHistory} index={inputIndex} />
      </DndProvider>
    );

    // 期待値確認
    expect(screen.getByTestId('gg_square')).toBeInTheDocument();
    expect(screen.queryByTestId('gg_piece')).not.toBeInTheDocument();
  });

  test.each([
    [
      'No.2：propsで渡されたpieceHistoryの要素数が1のとき、GGPieceコンポーネントのpropsのpieceに正しく駒情報を与えられていること\n\t    propsで渡ってきたindexが、GGPieceコンポーネントのpropsのboardSquareIndexに設定されていること',
      pieceHistory02,
      index0,
      pieceP1S,
    ],
    [
      'No.3：propsで渡されたpieceHistoryの要素数が3のとき、GGPieceコンポーネントのpropsのpieceに正しく駒情報を与えられていること',
      pieceHistory03,
      index1,
      pieceP1L,
    ],
  ])(
    '%s',
    /**
     * @param {string} _testCase テストケース名
     * @param {Piece[]} inputPieceHistory 駒の配置履歴
     * @param {number} inputIndex マスの位置情報
     * @param {Piece} mockArgPiece GGPieceコンポーネントのprops.pieceに渡す駒の情報
     */
    (_testCase, inputPieceHistory, inputIndex, mockArgPiece) => {
      // モックの引数
      const mockArgBoardSquareIndex = inputIndex;

      // 対象コンポーネントのレンダリング
      render(
        <DndProvider backend={HTML5Backend}>
          <GGSquare pieceHistory={inputPieceHistory} index={inputIndex} />
        </DndProvider>
      );

      // 期待値確認
      expect(screen.getByTestId('gg_square')).toBeInTheDocument();
      expect(screen.getByTestId('gg_piece')).toHaveTextContent(
        JSON.stringify({ piece: mockArgPiece, boardSquareIndex: mockArgBoardSquareIndex })
      );
      expect(screen.getAllByTestId('gg_piece')).toHaveLength(1);
    }
  );

  // #endregion

  // #redion 異常系テスト
  // #endregion
});
