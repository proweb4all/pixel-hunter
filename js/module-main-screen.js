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
/** =========================================
* обьявление фукнции
*/
/** изменение sreen по клику и css анимация исчезновения/появления
*
*/
const clickBtnHandler = () => {
  changeScreen(welcomeScreen());
};
/** =========================================
* экспорт
* @return {HTMLElement} element
*/
export default () => {
  /**
   *  работа с данными
   */
  const element = renderTemplate(MAIN_SCREEN);
  /**
   *  обьявление переменных
   */
  const btnIntroAsterisk = element.querySelector(`.intro__asterisk`);
  /** =========================================
  * работа с DOM
  */
  btnIntroAsterisk.addEventListener(`click`, clickBtnHandler);

  return element;
};
