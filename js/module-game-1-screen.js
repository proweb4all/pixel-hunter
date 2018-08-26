/** =========================================
 * импорт модулей
 */
// import {changeScreen, renderTemplate} from './util.js';
// import gameTwo from './module-game-2-screen.js';
import header from './module-header.js';
import {INITIAL_GAME} from './game.js';
import {changeScreen, renderTemplate, setScreen, demoData} from './util.js';
import returnScreenGame from './module-game-screens';
// import arrayDemoData from './data-game.js';
/** =========================================
 * обьявление констант
 */
const GAME_ONE_SCREEN = `
  <section class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
    </ul>
  </section>
`;
/** =========================================
 * обьявление фукнции
 */
/** при выборе 2 ответов в форме, переключение экрана
 * @param {Event} evt
 */
const changeFormHandler = (evt) => {
  let array = Array.from(evt.currentTarget.elements)
              .map((item) => item.checked)
              .filter(function (item) {
                return !!item;
              });

  if (array.length === 2) {
    // changeScreen(header(INITIAL_GAME), gameTwo());
    changeScreen(header(INITIAL_GAME), returnScreenGame(setScreen(demoData))());
  }
};
/** =========================================
 * экспорт
 * @return {HTMLElement} element
 */
export default () => {
  /**
   *  работа с данными
   */
  const element = renderTemplate(GAME_ONE_SCREEN);
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
