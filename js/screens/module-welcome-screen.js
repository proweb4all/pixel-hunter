import {changeScreen} from '../module-mangment-dom.js';
import WelcomeScreen from '../views/screens/module-welcome-screen-view.js';
import rulesScreen from './module-rules-screen.js';

export default () => {
  const welcomeScreen = new WelcomeScreen();

  welcomeScreen.nextScreen = () => {
    changeScreen(rulesScreen());
  };

  return welcomeScreen.element;
};
