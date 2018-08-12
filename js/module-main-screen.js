/** =========================================
 * импорт модулей
 */
import {changeScreen, renderTemplate} from './util.js';
import welcomeScreen from './module-welcome-screen.js';
/** =========================================
 * обьявление констант
 */
const mainScreen = `
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>
`;
const timeChangeScreen = 500;
const timeChangeCssOpacity = 1000;
/** =========================================
 * обьявление переменных
 */
let btnIntroAsterisk;
let content;
/** =========================================
* обьявление фукнции
*/
/** изменение sreen по клику и css анимация исчезновения/появления
*
*/
const clickBtnHandler = () => {
  content.style.transition = `opacity 0.5s linear`;
  content.style.opacity = 0;

  setTimeout(() => {
    changeScreen(welcomeScreen);
  }, timeChangeScreen);

  setTimeout(() => {
    content.style.opacity = 1;
  }, timeChangeCssOpacity);
};
/** =========================================
 * работа с данными
 */
const element = renderTemplate(mainScreen);
/** =========================================
 * работа с DOM
 */
btnIntroAsterisk = element.querySelector(`.intro__asterisk`);
content = document.querySelector(`.central__content`);
btnIntroAsterisk.addEventListener(`click`, clickBtnHandler);
/** =========================================
 * экспорт
 */
export default element;
