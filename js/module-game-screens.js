import gameOne from './views/screens/module-game-1-screen.js';
import gameTwo from './views/screens/module-game-2-screen.js';
import gameThree from './views/screens/module-game-3-screen.js';

export default (valueScreen) => {
  let typeScreen = ``;
  switch (valueScreen) {
    case `gameOne`:
      typeScreen = gameOne;
      break;
    case `gameTwo`:
      typeScreen = gameTwo;
      break;
    case `gameThree`:
      typeScreen = gameThree;
      break;
  }
  return typeScreen;
};
