import {renderTemplate, changeScreen} from '../../module-mangment-dom.js';
import welcomeScreen from './module-welcome-screen.js';
import AbstractView from '../../clases/abstract-view.js';

class MainScreen extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <section class="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>
    `;
  }

  render() {
    return renderTemplate(this.template);
  }

  bind() {
    const btnIntroAsterisk = this.element.querySelector(`.intro__asterisk`);

    /**
     * изменение sсreen по клику
     */
    const clickBtnHandler = () => {
      changeScreen(welcomeScreen());
    };

    btnIntroAsterisk.addEventListener(`click`, clickBtnHandler);
  }
}

export default () => {
  const mainScreen = new MainScreen();

  return mainScreen.element;
};
