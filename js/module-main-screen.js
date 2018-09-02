import {managentDom} from './module-mangment-dom.js';
import welcomeScreen from './module-welcome-screen.js';

const MAIN_SCREEN = `
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>
`;

/** изменение sreen по клику и css анимация исчезновения/появления
*
*/
const clickBtnHandler = () => {
  managentDom.changeScreen(welcomeScreen());
};
/** =========================================
* экспорт
* @return {HTMLElement} element
*/
export default () => {
  const element = managentDom.renderTemplate(MAIN_SCREEN);
  const btnIntroAsterisk = element.querySelector(`.intro__asterisk`);

  btnIntroAsterisk.addEventListener(`click`, clickBtnHandler);

  return element;
};
