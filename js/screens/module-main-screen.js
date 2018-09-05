import {renderTemplate, changeScreen} from '../module-mangment-dom.js';
import welcomeScreen from './module-welcome-screen.js';
import AbstractView from '../clases/abstract-view.js';

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
  return new MainScreen();
};

// const MAIN_SCREEN = `
//   <section class="intro">
//     <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
//     <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
//   </section>
// `;

// /** изменение sreen по клику и css анимация исчезновения/появления
// *
// */
// const clickBtnHandler = () => {
//   changeScreen(welcomeScreen());
// };
// /** =========================================
// * экспорт
// * @return {HTMLElement} element
// */
// export default () => {
//   const element = renderTemplate(MAIN_SCREEN);
//   const btnIntroAsterisk = element.querySelector(`.intro__asterisk`);

//   btnIntroAsterisk.addEventListener(`click`, clickBtnHandler);

//   return element;
// };
