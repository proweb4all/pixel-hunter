import {changeScreen} from '../module-mangment-dom.js';
import MainScreenView from '../views/screens/module-main-screen-view.js';
import welcomeScreen from './module-welcome-screen.js';

export default () => {
  const mainScreenView = new MainScreenView();

  mainScreenView.nextScreen = () => {
    changeScreen(welcomeScreen());
  };

  return mainScreenView.element;
};
