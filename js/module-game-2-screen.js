/** =========================================
 * импорт модулей
 */
import header from './module-header.js';
import {INITIAL_GAME} from './game.js';
import {changeScreen, renderTemplate, setGame, demoData} from './util.js';
/** =========================================
 * обьявление констант
 */
const GAME_TWO_SCREEN = (arr) => {
  let html = ``;
  arr.forEach((item, index) => {
    html += `<div class="game__option">
                  <img src="${item.src}" data-type="${item.isTypeImg}" alt="Option ${index}" width="468" height="458">
                  <label class="game__answer game__answer--photo">
                    <input class="visually-hidden" name="question${index}" type="radio" value="photo">
                    <span>Фото</span>
                  </label>
                  <label class="game__answer game__answer--paint">
                    <input class="visually-hidden" name="question${index}" type="radio" value="paint">
                    <span>Рисунок</span>
                  </label>
                </div>`;
  });
  return `
    <section class="game">
      <p class="game__task">Угадай, фото или рисунок?</p>
      <form class="game__content  game__content--wide">
        ${html}
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
  `
};
/** =========================================
 * обьявление фукнции
 */
/** при выборе ответа в форме, переключение экрана
 *
 */
const changeFormHandler = () => {
  changeScreen(header(INITIAL_GAME), setGame(demoData));
};
/** =========================================
* экспорт
* @return {HTMLElement} element
*/
export default (arr) => {
  /**
   *  работа с данными
   */
  const element = renderTemplate(GAME_TWO_SCREEN(arr));
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
