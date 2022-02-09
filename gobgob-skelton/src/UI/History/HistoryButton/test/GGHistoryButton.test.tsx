import { shallow } from 'enzyme';
import _ from 'lodash';

import * as GameActions from 'store/game/actions';
import * as HistoryActions from 'store/history/actions';
import { PIECE_SIZE, PLAYER } from 'utils/constants';
import { PrevGameState } from 'utils/types';
import GGHistoryButton from '../GGHistoryButton';

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
const updateStepNumberActionSpy: jest.SpyInstance = jest
  .spyOn(HistoryActions, 'updateStepNumberAction')
  .mockImplementation(
    (stepNumber: number): HistoryActions.ActionType<number> => ({
      type: HistoryActions.UPDATE_STEP_NUMBER,
      payload: stepNumber,
    })
  );

describe('GGHistoryButton', () => {
  // #region テストデータ
  // #region 入力
  const className = 'gg-test';

  const prevGameState01: PrevGameState = {
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
  const prevGameState02: PrevGameState = {
    boardPieces: [
      [{ player: PLAYER.P1, size: PIECE_SIZE.S }],
      [{ player: PLAYER.P2, size: PIECE_SIZE.S }],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ],
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
    ],
    playingPlayer: PLAYER.P2,
  };

  const prevStepNumber01 = 1;
  const prevStepNumber02 = 2;
  // #endregion

  // #region 期待値
  // 外部から受け取ったクラス名
  const buttonClassName01 = 'player1-button';
  const buttonClassName02 = 'player2-button';

  // 履歴ボタンに表示されるメッセージ
  const buttonMessage01 = 'move to #1';
  const buttonMessage02 = 'move to #2';

  // アクションの呼び出し回数
  const goBackToPrevBoardActionCallTimes = 1;
  const updateStepNumberActionCalledTimes = 1;
  // #endregion
  // #endregion

  // #region グローバル処理
  afterEach(() => {
    goBackToPrevBoardActionSpy.mockClear();
    updateStepNumberActionSpy.mockClear();
  });
  // #endregion

  // #region 正常系テスト
  test.each([
    ['No.1：', prevGameState01, prevStepNumber01, buttonClassName01, buttonMessage01],
    ['No.2：', prevGameState02, prevStepNumber02, buttonClassName02, buttonMessage02],
  ])(
    '%s',
    (
      _testCase,
      inputPrevGameState,
      inputPrevStepNumber,
      expectedButtonClass,
      expectedButtonMessage
    ) => {
      // 期待値
      const expectedClassName = className;

      // mockの引数
      const mockArgPrevStepNumber = inputPrevStepNumber;
      const mockArgPrevGameState = inputPrevGameState;

      // テスト対象コンポーネントの生成
      const wrapper = shallow(
        <GGHistoryButton
          className={className}
          prevGameState={_.cloneDeep(inputPrevGameState)}
          prevStepNumber={inputPrevStepNumber}
        />
      );

      // テスト対象コンポーネントのイベントハンドラ実行
      wrapper.find('.gg_history_button').simulate('click');

      // 期待値の確認
      // ボタンコンポーネントのクラス名
      expect(wrapper.find('.gg_history_button').hasClass(expectedClassName)).toBe(true);
      expect(wrapper.find('.gg_history_button').hasClass(expectedButtonClass)).toBe(true);

      // ボタンコンポーネントの表示メッセージ
      expect(wrapper.text()).toBe(expectedButtonMessage);

      // 各関数の呼び出し回数
      expect(goBackToPrevBoardActionSpy).toHaveBeenCalledTimes(goBackToPrevBoardActionCallTimes);
      expect(updateStepNumberActionSpy).toHaveBeenCalledTimes(updateStepNumberActionCalledTimes);

      // 各関数の引数確認
      expect(goBackToPrevBoardActionSpy).toHaveBeenCalledWith(mockArgPrevGameState);
      expect(updateStepNumberActionSpy).toHaveBeenCalledWith(mockArgPrevStepNumber);
    }
  );
  // #endregion

  // #region 異常系テスト
  // #endregion
});
