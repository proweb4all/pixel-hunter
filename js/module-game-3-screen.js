/** =========================================
 * импорт модулей
 */
// import {changeScreen, renderTemplate} from './util.js';
// import resultScreen from './module-result-screen.js';
import header from './module-header.js';
import {INITIAL_GAME} from './game.js';
import {changeScreen, renderTemplate, setScreen, demoData} from './util.js';
import returnScreenGame from './module-game-screens';
// import arrayDemoData from './data-game.js';
/** =========================================
 * обьявление констант
 */
const GAME_THREE_SCREEN = `
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
/** =========================================
 * обьявление фукнции
 */
/** при выборе ответа в форме, переключение экрана
 *
 */
const clickFormHandler = () => {
  // changeScreen(resultScreen());
  changeScreen(header(INITIAL_GAME), returnScreenGame(setScreen(demoData))());
};
/** =========================================
 * экспорт
 * @return {HTMLElement} element
 */
export default () => {
  /**
   *  работа с данными
   */
  const element = renderTemplate(GAME_THREE_SCREEN);
  /**
   *  обьявление переменных
   */
  const imgs = element.querySelectorAll(`.game__content img`);
  /** =========================================
   * работа с DOM
   */
  imgs.forEach((item) => {
    item.addEventListener(`click`, clickFormHandler);
  });

  return element;
};
