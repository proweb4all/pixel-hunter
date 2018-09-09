import {controlGameScreens, recordUserAnswer} from '../game.js';
import dataGame from '../data-game.js';
import GameThreeScreen from '../views/screens/module-game-3-screen-view.js';

export default (stateGame, arrImages, statsAnswersStr) => {
  const gameThreeScreen = new GameThreeScreen(stateGame, arrImages, statsAnswersStr);
  gameThreeScreen.nextScreen = (evt, state) => {
    const target = evt.target;
    const selectUserAnswer = target.getAttribute(`data-type`);

    const newState = recordUserAnswer(gameThreeScreen._CORRECT_ANSWER === selectUserAnswer, state);
    controlGameScreens(newState, dataGame);
  };

  return gameThreeScreen.element;
};
