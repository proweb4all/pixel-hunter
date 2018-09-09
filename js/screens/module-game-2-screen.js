import {controlGameScreens, recordUserAnswer} from '../game.js';
import dataGame from '../data-game.js';
import GameTwoScreen from '../views/screens/module-game-2-screen-view.js';

export default (stateGame, arrImages, statsAnswersStr) => {
  const gameTwoScreen = new GameTwoScreen(stateGame, arrImages, statsAnswersStr);
  gameTwoScreen.nextScreen = (evt, state) => {
    const targetInput = evt.target;
    const currentTarget = evt.currentTarget;
    const selectUserAnswer = targetInput.value;
    const correctAnswer = currentTarget.querySelector(`img`).getAttribute(`data-type`);

    const newState = recordUserAnswer(correctAnswer === selectUserAnswer, state);
    controlGameScreens(newState, dataGame);
  };
  return gameTwoScreen.element;
};
