/** =========================================
 * импорт модулей
 */
import {changeScreen, renderTemplate} from './util.js';
import welcomeScreen from './module-welcome-screen.js';
/** =========================================
 * обьявление констант
 */
const MAIN_SCREEN = `
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>
`;
const TIME_CHANGE_SCREEN = 500;
const TIME_CHANGE_CSS_OPACITY = 1000;
/** =========================================
* обьявление фукнции
*/
/** изменение sreen по клику и css анимация исчезновения/появления
*
*/
const clickBtnHandler = () => {
  const content = document.querySelector(`.central__content`);
  content.style.transition = `opacity 0.5s linear`;
  content.style.opacity = 0;

  setTimeout(() => {
    changeScreen(welcomeScreen);
  }, TIME_CHANGE_SCREEN);

  setTimeout(() => {
    content.style.opacity = 1;
  }, TIME_CHANGE_CSS_OPACITY);
};
/** =========================================
* экспорт
* @return {Function} element
*/
export default () => {
  const element = renderTemplate(MAIN_SCREEN);
  /** =========================================
  * работа с DOM
  */
  const btnIntroAsterisk = element.querySelector(`.intro__asterisk`);
  btnIntroAsterisk.addEventListener(`click`, clickBtnHandler);

  return element;
};
