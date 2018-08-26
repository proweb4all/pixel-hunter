import gameOne from './module-game-1-screen.js';
import gameTwo from './module-game-2-screen.js';
import gameThree from './module-game-3-screen.js';
import resultScreen from './module-result-screen.js';

export default (valueScreen) => {
  let screenName = ``;
  switch (valueScreen) {
    case `gameOne`:
      screenName = gameOne;
      break;
    case `gameTwo`:
      screenName = gameTwo;
      break;
    case `gameThree`:
      screenName = gameThree;
      break;
    default : screenName = resultScreen;
  }
  return screenName;
};
