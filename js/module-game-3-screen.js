/** =========================================
 * импорт модулей
 */
import {changeScreen, renderTemplate} from './util.js';
import resultScreen from './module-result-screen.js';
import {setEventForBtnBack} from './module-back-btn.js';
/** =========================================
 * обьявление констант
 */
const GAME_THREE_SCREEN = `
  <header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
    <div class="game__timer">NN</div>
    <div class="game__lives">
      <img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
    </div>
  </header>
  <section class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="http://placehold.it/304x455" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 3" width="304" height="455">
      </div>
    </form>
    <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--unknown"></li>
    </ul>
  </section>
`;
/** =========================================
 * обьявление переменных
 */
let form;
/** =========================================
 * обьявление фукнции
 */
/** при выборе ответа в форме, переключение экрана
 * @param {Event} evt
 */
const clickFormHandler = (evt) => {
  let target = evt.target;

  while (target !== form) {
    if (target.tagName === `IMG`) {
      changeScreen(resultScreen);
      return;
    }
    target = target.parentElement;
  }
};
/** =========================================
 * экспорт
 * @return {Function} element
 */
export default () => {
  const element = renderTemplate(GAME_THREE_SCREEN);
  /** =========================================
  * работа с DOM
  */
  form = element.querySelector(`.game__content`);
  form.addEventListener(`click`, clickFormHandler);

  setEventForBtnBack(element);

  return element;
};
