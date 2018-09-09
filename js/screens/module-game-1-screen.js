import {controlGameScreens, recordUserAnswer} from '../game.js';
import dataGame from '../data-game.js';
import GameOneScreen from '../views/screens/module-game-1-screen-view.js';

export default (stateGame, arrImages, statsAnswersStr) => {
  const gameOneScreen = new GameOneScreen(stateGame, arrImages, statsAnswersStr);

  gameOneScreen.nextScreen = (evt, state) => {
    const selectUserAnswer = Array.from(evt.currentTarget.elements)
      .map((item) => item.checked && item.value)
      .filter(function (item) {
        return !!item;
      });
    const correctAnswer = Array.from(evt.currentTarget.querySelectorAll(`img`))
      .map((item) => item.getAttribute(`data-type`));

    if (selectUserAnswer.length === correctAnswer.length) {
      const sameArrays = selectUserAnswer.every((item, index) => {
        return item === correctAnswer[index];
      });

      const newState = recordUserAnswer(sameArrays, state);
      controlGameScreens(newState, dataGame);
    }
  };

  return gameOneScreen.element;
};
