import App from 'App';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { PIECE_SIZE, PLAYER } from 'utils/constants';
import GGHistoryButton from '../GGHistoryButton';

describe('GGHistoryButton', () => {
  test.skip('test', () => {
    // const props = {
    //   className: 'GG',
    //   prevGameState: {
    //     boardPieces: [[{ player: PLAYER.P1, size: PIECE_SIZE.S }], [], [], [], [], [], [], [], []],
    //     player1Pieces: [
    //       { player: PLAYER.P1, size: PIECE_SIZE.L },
    //       { player: PLAYER.P1, size: PIECE_SIZE.L },
    //       { player: PLAYER.P1, size: PIECE_SIZE.M },
    //       { player: PLAYER.P1, size: PIECE_SIZE.M },
    //       { player: PLAYER.P1, size: PIECE_SIZE.S },
    //     ],
    //     player2Pieces: [
    //       { player: PLAYER.P2, size: PIECE_SIZE.L },
    //       { player: PLAYER.P2, size: PIECE_SIZE.L },
    //       { player: PLAYER.P2, size: PIECE_SIZE.M },
    //       { player: PLAYER.P2, size: PIECE_SIZE.M },
    //       { player: PLAYER.P2, size: PIECE_SIZE.S },
    //       { player: PLAYER.P2, size: PIECE_SIZE.S },
    //     ],
    //     playingPlayer: PLAYER.P2,
    //   },
    //   prevStepNumber: 1,
    // };

    // const wrapper = shallow(
    //   <GGHistoryButton
    //     className={props.className}
    //     prevGameState={props.prevGameState}
    //     prevStepNumber={props.prevStepNumber}
    //   />
    // );

    // expect(toJson(wrapper)).toMatchSnapshot();

    const wrapper = shallow(<App />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
