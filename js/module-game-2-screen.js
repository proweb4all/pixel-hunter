/** =========================================
 * импорт модулей
 */
// import {changeScreen, renderTemplate} from './util.js';
// import gameThree from './module-game-3-screen.js';
import header from './module-header.js';
import {INITIAL_GAME} from './game.js';
import {changeScreen, renderTemplate, setScreen} from './util.js';
import returnScreenGame from './module-game-screens';
import arrayDemoData from './data-game.js';
/** =========================================
 * обьявление констант
 */
const GAME_TWO_SCREEN = `
  <section class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
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
 * обьявление фукнции
 */
/** при выборе ответа в форме, переключение экрана
 *
 */
const changeFormHandler = () => {
  // changeScreen(header(INITIAL_GAME), gameThree());
  changeScreen(header(INITIAL_GAME), returnScreenGame(setScreen(arrayDemoData))());
};
/** =========================================
* экспорт
* @return {HTMLElement} element
*/
export default () => {
  /**
   *  работа с данными
   */
  const element = renderTemplate(GAME_TWO_SCREEN);
  /**
   *  обьявление переменных
   */
  const form = element.querySelector(`.game__content`);
  /** =========================================
   * работа с DOM
   */
  form.addEventListener(`change`, changeFormHandler);

  return element;
};
