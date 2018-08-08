'use strict';
/** =========================================
 * обьявление констант
 */
const ARROW_LEFT_KEY_CODE = 37;
const ARROW_RIGHT_KEY_CODE = 39;
const ARROW_BTNS_INNER_HTML = `
<style>
.arrows__wrap {
  position: absolute;
  top: 95px;
  left: 50%;
  margin-left: -56px;
  z-index: 1;
}
.arrows__btn {
  background: none;
  border: 2px solid black;
  padding: 5px 20px;
}
</style>
<button class="arrows__btn"><-</button>
<button class="arrows__btn">-></button>
`;
/** =========================================
 * обьявление переменных
 */
const mainElement = document.querySelector(`#main`);
const body = document.querySelector(`body`);
let current = 0;
/** =========================================
 * обьявление фукнции
 */
/**
 * вставка данных из template
 * @param {Node} element
 */
const selectSlide = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element.cloneNode(true));
};
/**
 * передает номер нужного tepmlate
 * @param {Number} index
 */
const select = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  selectSlide(screens[current]);
};
/**
 * переключение следующего слайда от текушего
 */
const nextSlider = () => {
  select(current + 1);
};
/**
 * переключение предыдушего слайда от текушего
 */
const prevSlider = () => {
  select(current - 1);
};
/**
 * переключение слайдов через клавиши клавиатуры (стрелки: влево и вправо)
 * @param {Event} evt
 */
const onKeyHandler = (evt) => {
  switch (evt.keyCode) {
    case ARROW_LEFT_KEY_CODE:
      prevSlider();
      break;
    case ARROW_RIGHT_KEY_CODE:
      nextSlider();
      break;
  }
};
/** =========================================
 * работа с данными
 */
const screens = Array.from(document.querySelectorAll(`template`)).map((item) => item.content);
select(0);
/** =========================================
 * работа с DOM
 */
document.addEventListener(`keydown`, onKeyHandler);

const arrowBtnsWrap = document.createElement(`div`);
arrowBtnsWrap.classList.add(`arrows__wrap`);
arrowBtnsWrap.innerHTML = ARROW_BTNS_INNER_HTML;
body.appendChild(arrowBtnsWrap);

const arrowBtnLeft = arrowBtnsWrap.querySelectorAll(`button`)[0];
const arrowBtnRight = arrowBtnsWrap.querySelectorAll(`button`)[1];

arrowBtnLeft.addEventListener(`click`, prevSlider);
arrowBtnRight.addEventListener(`click`, nextSlider);
