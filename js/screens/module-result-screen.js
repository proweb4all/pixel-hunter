import {setEventForBtnBack} from '../module-back-btn.js';
import {renderTemplate} from '../module-mangment-dom.js';
import AbstractView from '../clases/abstract-view.js';

class ResultScreen extends AbstractView {
  constructor(objUserStat, statsAnswersStr) {
    super();
    this._objUserStat = objUserStat;
    this._statsAnswersStr = statsAnswersStr;
  }

  createTemplate(obj) {
    let slowPoint;
    if (obj.slowPoints) {
      slowPoint = obj.slowPoints.points === 0 ? 0 : `-` + obj.slowPoints.points;
    } else {
      slowPoint = ``;
    }
    let normalPoints;
    if (obj.normalPoints) {
      normalPoints = obj.normalPoints.points !== undefined ? obj.normalPoints.points : ``;
    } else {
      normalPoints = ``;
    }

    let html = ``;
    const htmlHeader = `<header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
  </header>
  <section class="result">
    <h2 class="result__title">${obj.points > 0 ? `Победа!` : `Проиграл!`}</h2>`;

    const HTML_TABLE_POINTS = `<table class="result__table">
    <tr>
      <td class="result__number">1.</td>
      <td colspan="2">
        <ul class="stats">
          ${this._statsAnswersStr}
        </ul>
      </td>
      <td class="result__points">× 100</td>
      <td class="result__total">${normalPoints}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${obj.fastPoints ? obj.fastPoints.items : ``}<span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× 150</td>
      <td class="result__total">${obj.fastPoints ? obj.fastPoints.points : ``}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${obj.livesPoints ? obj.livesPoints.items : ``}<span class="stats__result stats__result--alive"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${obj.livesPoints ? obj.livesPoints.points : ``}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${obj.slowPoints ? obj.slowPoints.items : obj.slowPoints}<span class="stats__result stats__result--slow"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${slowPoint}</td>
    </tr>
    <tr>
      <td colspan="5" class="result__total  result__total--final">${obj.points}</td>
    </tr>
  </table>`;

    const HTML_TABLE_FAIL = `<table class="result__table">
    <tr>
      <td class="result__number">2.</td>
      <td>
        <ul class="stats">
          ${this._statsAnswersStr}
        </ul>
      </td>
      <td class="result__total"></td>
      <td class="result__total  result__total--final">fail</td>
    </tr>
  </table>`;

    if (obj.points === -1) {
      html = htmlHeader + HTML_TABLE_FAIL;
    }
    if (obj.points > 0) {
      html = htmlHeader + HTML_TABLE_POINTS;
    }


    html += `</section>`;
    return html;
  }

  get template() {
    return this.createTemplate(this._objUserStat);
  }

  render() {
    return renderTemplate(this.template);
  }

  // get element() {
  //   if (this._element) {
  //     return this._element;
  //   }
  //   this._element = this.render();
  //   this.bind(this._element);
  //   return this._element;
  // }

  bind() {
    const element = this.render();

    setEventForBtnBack(element);

    return element;
  }
}

export default (objUserStat, statsAnswersStr) => {
  return new ResultScreen(objUserStat, statsAnswersStr).bind();
};

// /** результаты игры
// * @param {Object} obj
// * @param {String} statsAnswersStr
// * @return {String} html
// */
// const template = (obj, statsAnswersStr) => {
//   let slowPoint;
//   if (obj.slowPoints) {
//     slowPoint = obj.slowPoints.points === 0 ? 0 : `-` + obj.slowPoints.points;
//   } else {
//     slowPoint = ``;
//   }
//   let normalPoints;
//   if (obj.normalPoints) {
//     normalPoints = obj.normalPoints.points !== undefined ? obj.normalPoints.points : ``;
//   } else {
//     normalPoints = ``;
//   }


//   let html = ``;
//   const htmlHeader = `<header class="header">
//     <button class="back">
//       <span class="visually-hidden">Вернуться к началу</span>
//       <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
//         <use xlink:href="img/sprite.svg#arrow-left"></use>
//       </svg>
//       <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
//         <use xlink:href="img/sprite.svg#logo-small"></use>
//       </svg>
//     </button>
//   </header>
//   <section class="result">
//     <h2 class="result__title">${obj.points > 0 ? `Победа!` : `Проиграл!`}</h2>`;

//   const HTML_TABLE_POINTS = `<table class="result__table">
//     <tr>
//       <td class="result__number">1.</td>
//       <td colspan="2">
//         <ul class="stats">
//           ${statsAnswersStr}
//         </ul>
//       </td>
//       <td class="result__points">× 100</td>
//       <td class="result__total">${normalPoints}</td>
//     </tr>
//     <tr>
//       <td></td>
//       <td class="result__extra">Бонус за скорость:</td>
//       <td class="result__extra">${obj.fastPoints ? obj.fastPoints.items : ``}<span class="stats__result stats__result--fast"></span></td>
//       <td class="result__points">× 150</td>
//       <td class="result__total">${obj.fastPoints ? obj.fastPoints.points : ``}</td>
//     </tr>
//     <tr>
//       <td></td>
//       <td class="result__extra">Бонус за жизни:</td>
//       <td class="result__extra">${obj.livesPoints ? obj.livesPoints.items : ``}<span class="stats__result stats__result--alive"></span></td>
//       <td class="result__points">× 50</td>
//       <td class="result__total">${obj.livesPoints ? obj.livesPoints.points : ``}</td>
//     </tr>
//     <tr>
//       <td></td>
//       <td class="result__extra">Штраф за медлительность:</td>
//       <td class="result__extra">${obj.slowPoints ? obj.slowPoints.items : obj.slowPoints}<span class="stats__result stats__result--slow"></span></td>
//       <td class="result__points">× 50</td>
//       <td class="result__total">${slowPoint}</td>
//     </tr>
//     <tr>
//       <td colspan="5" class="result__total  result__total--final">${obj.points}</td>
//     </tr>
//   </table>`;

//   const HTML_TABLE_FAIL = `<table class="result__table">
//     <tr>
//       <td class="result__number">2.</td>
//       <td>
//         <ul class="stats">
//           ${statsAnswersStr}
//         </ul>
//       </td>
//       <td class="result__total"></td>
//       <td class="result__total  result__total--final">fail</td>
//     </tr>
//   </table>`;

//   if (obj.points === -1) {
//     html = htmlHeader + HTML_TABLE_FAIL;
//   }
//   if (obj.points > 0) {
//     html = htmlHeader + HTML_TABLE_POINTS;
//   }


//   html += `</section>`;
//   return html;
// };
// /** =========================================
//  * экспорт
//  * @param {Object} objUserStat
//  * @param {String} statsAnswersStr
//  * @return {HTMLElement} element
//  */
// export default (objUserStat, statsAnswersStr) => {
//   const element = renderTemplate(template(objUserStat, statsAnswersStr));

//   setEventForBtnBack(element);

//   return element;
// };
