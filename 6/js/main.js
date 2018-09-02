(function () {
  'use strict';

  const mainElement = document.querySelector(`#main`);

  /**
  * рендеринг template
  * @param {String} strHtml
  * @return {HTMLElement} fragment
  */
  const renderTemplate = (strHtml) => {
    const wrapperTemplate = document.createElement(`template`);
    wrapperTemplate.innerHTML = strHtml;
    return wrapperTemplate.content;
  };
  /**
  * вставка данных из template
  * @param {HTMLElement} elements
  */
  const changeScreen = (...elements) => {
    mainElement.innerHTML = ``;
    elements.forEach((element) => {
      mainElement.appendChild(element);
    });
  };
  /**
  * вставка данных из template "модального окна"
  * @param {HTMLElement} element
  */
  const addModal = (element) => {
    mainElement.appendChild(element);
  };
  /**
  * удаление HTMLElement
  * @param {HTMLElement} element
  */
  const deleteElement = (element) => {
    mainElement.removeChild(element);
  };

  const managentDom = {
    renderTemplate,
    changeScreen,
    addModal,
    deleteElement
  };

  const MODAL_CONFIRM = `
  <section class="modal">
    <form class="modal__inner">
      <button class="modal__close" type="button">
        <span class="visually-hidden">Закрыть</span>
      </button>
      <h2 class="modal__title">Подтверждение</h2>
      <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
      <div class="modal__button-wrapper">
        <button class="modal__btn">Ок</button>
        <button class="modal__btn">Отмена</button>
      </div>
    </form>
  </section>
`;
  const ESC_CODE = 27;
  let objectHandler;

  /**
  * удаление "модального окна"
  * @param {Event} evt
  * @param {HTMLElement} elem
  */
  const clickCloseHandler = (evt, elem) => {
    evt.preventDefault();

    managentDom.deleteElement(elem);
    document.removeEventListener(`keydown`, objectHandler);
  };

  const clickCancelHandler = clickCloseHandler;
  /**
  * удаление "модального окна" по клавише ESC
  * @param {Event} evt
  * @param {HTMLElement} elem
  */
  const escCloseHandler = (evt, elem) => {
    if (evt.keyCode === ESC_CODE) {
      clickCloseHandler(evt, elem);
    }
  };
  /**
  * смена screen после подтверждения
  * @param {Event} evt
  */
  const confirmHandler = () => {
    managentDom.changeScreen(welcome());
  };
  /** =========================================
  * экспорт
  * @return {HTMLElement} element
  */
  var modalConfirm = () => {
    const element = managentDom.renderTemplate(MODAL_CONFIRM);
    const modal = element.querySelector(`.modal`);
    const modalBtnClose = element.querySelector(`.modal__close`);
    const modalBtnOk = element.querySelectorAll(`.modal__btn`)[0];
    const modalBtnCancel = element.querySelectorAll(`.modal__btn`)[1];

    modalBtnClose.addEventListener(`click`, (evt) => {
      clickCloseHandler(evt, modal);
    });
    modalBtnOk.addEventListener(`click`, confirmHandler);
    modalBtnCancel.addEventListener(`click`, (evt) => {
      clickCancelHandler(evt, modal);
    });

    objectHandler = {
      handleEvent(evt) {
        escCloseHandler(evt, modal);
      }
    };
    document.addEventListener(`keydown`, objectHandler);

    return element;
  };

  /**
   * добавляет модальное окно с подтверждением
   */
  const clickHandler = () => {
    managentDom.addModal(modalConfirm());
  };
  /** поиск кнопки назад на экране и установка события
   * @param {HTMLElement} searchElementInWrap
   */
  const setEventForBtnBack = (searchElementInWrap) => {
    const btnBack = searchElementInWrap.querySelector(`.back`);
    btnBack.addEventListener(`click`, clickHandler);
  };

  var dataGame = [
    {
      type: `gameOne`,
      images: [
        {src: `https://k42.kn3.net/CF42609C8.jpg`, imageType: `photo`},
        {src: `https://k42.kn3.net/D2F0370D6.jpg`, imageType: `photo`}
      ]
    },
    {
      type: `gameTwo`,
      images: [
        {src: `https://k32.kn3.net/5C7060EC5.jpg`, imageType: `photo`},
      ]
    },
    {
      type: `gameThree`,
      images: [
        {src: `https://k42.kn3.net/CF42609C8.jpg`, imageType: `photo`},
        {src: `https://k42.kn3.net/D2F0370D6.jpg`, imageType: `photo`},
        {src: `https://i.imgur.com/5PlNnsy.jpg`, imageType: `paint`}
      ]
    },
    {
      type: `gameOne`,
      images: [
        {src: `https://k42.kn3.net/CF42609C8.jpg`, imageType: `photo`},
        {src: `https://k42.kn3.net/D2F0370D6.jpg`, imageType: `photo`}
      ]
    },
    {
      type: `gameTwo`,
      images: [
        {src: `https://k32.kn3.net/5C7060EC5.jpg`, imageType: `photo`},
      ]
    },
    {
      type: `gameThree`,
      images: [
        {src: `https://k42.kn3.net/CF42609C8.jpg`, imageType: `photo`},
        {src: `https://k42.kn3.net/D2F0370D6.jpg`, imageType: `photo`},
        {src: `https://i.imgur.com/5PlNnsy.jpg`, imageType: `paint`}
      ]
    },
    {
      type: `gameOne`,
      images: [
        {src: `https://k42.kn3.net/CF42609C8.jpg`, imageType: `photo`},
        {src: `https://k42.kn3.net/D2F0370D6.jpg`, imageType: `photo`}
      ]
    },
    {
      type: `gameTwo`,
      images: [
        {src: `https://k32.kn3.net/5C7060EC5.jpg`, imageType: `photo`},
      ]
    },
    {
      type: `gameThree`,
      images: [
        {src: `https://k42.kn3.net/CF42609C8.jpg`, imageType: `photo`},
        {src: `https://k42.kn3.net/D2F0370D6.jpg`, imageType: `photo`},
        {src: `https://i.imgur.com/5PlNnsy.jpg`, imageType: `paint`}
      ]
    },
    {
      type: `gameThree`,
      images: [
        {src: `https://k42.kn3.net/CF42609C8.jpg`, imageType: `photo`},
        {src: `https://k42.kn3.net/D2F0370D6.jpg`, imageType: `photo`},
        {src: `https://i.imgur.com/5PlNnsy.jpg`, imageType: `paint`}
      ]
    },
  ];

  /** =========================================
   * возврашает шаблон с данными
   * @param {Array} arrImages
   * @param {String} statsPictureStr
   * @return {String}
   */
  const template = (arrImages, statsPictureStr) => {
    let html = ``;
    arrImages.forEach((item, index) => {
      html += `<div class="game__option">
                  <img src="${item.src}" data-type="${item.imageType}" alt="Option ${index}" width="468" height="458">
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
      <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
      <form class="game__content">
      ${html}
      </form>
      <ul class="stats">
        ${statsPictureStr}
      </ul>
    </section>
  `;
  };

  /** при выборе 2 ответов в форме, переключение экрана
   * @param {Event} evt
   * @param {Object} state
   */
  const changeFormHandler = (evt, state) => {
    const selectUserAnswer = Array.from(evt.currentTarget.elements)
                                  .map((item) => item.checked && item.value)
                                  .filter(function (item) {
                                    return !!item;
                                  });
    const correctAnswer = Array.from(evt.currentTarget.querySelectorAll(`img`))
                                .map((item) => item.getAttribute(`data-type`));

    if (selectUserAnswer.length === correctAnswer.length) {
      const sameArrays = selectUserAnswer.every((item, index) => {
        return item === correctAnswer[index];
      });

      const newState = managmentGame.pushUserAnswer(sameArrays, state);
      managmentGame.controlGameScreens(newState, dataGame);
    }
  };
  /** =========================================
   * экспорт
   * @param {Object} state
   * @param {Array} arrImages
   * @param {String} statsPictureStr
   * @return {HTMLElement} element
   */
  var gameOne = (state, arrImages, statsPictureStr) => {
    const element = managentDom.renderTemplate(template(arrImages, statsPictureStr));
    const form = element.querySelector(`.game__content`);

    form.addEventListener(`change`, (evt) => {
      changeFormHandler(evt, state);
    });

    return element;
  };

  /** =========================================
   * возврашает шаблон с данными
   * @param {Array} arrImages
   * @param {String} statsPictureStr
   * @return {String}
   */
  const template$1 = (arrImages, statsPictureStr) => {
    let html = ``;
    arrImages.forEach((item, index) => {
      html += `<div class="game__option">
                  <img src="${item.src}" data-type="${item.imageType}" alt="Option ${index}" width="468" height="458">
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
        ${statsPictureStr}
      </ul>
    </section>
  `;
  };

  /** при выборе ответа в форме, переключение экрана
   * @param {Event} evt
   * @param {Object} state
   */
  const changeFormHandler$1 = (evt, state) => {
    const targetInput = evt.target;
    const currentTarget = evt.currentTarget;
    const selectUserAnswer = targetInput.value;
    const correctAnswer = currentTarget.querySelector(`img`).getAttribute(`data-type`);

    const newState = managmentGame.pushUserAnswer(correctAnswer === selectUserAnswer, state);
    managmentGame.controlGameScreens(newState, dataGame);
  };
  /** =========================================
   * экспорт
   * @param {Object} state
   * @param {Array} arrImages
   * @param {String} statsPictureStr
   * @return {HTMLElement} element
   */
  var gameTwo = (state, arrImages, statsPictureStr) => {
    const element = managentDom.renderTemplate(template$1(arrImages, statsPictureStr));
    const form = element.querySelector(`.game__content`);

    form.addEventListener(`change`, (evt) => {
      changeFormHandler$1(evt, state);
    });

    return element;
  };

  const CORRECT_ANSWER = `paint`;

  /** =========================================
   * возврашает шаблон с данными
   * @param {Array} arrImages
   * @param {String} statsPictureStr
   * @return {String}
   */
  const template$2 = (arrImages, statsPictureStr) => {
    let htmlImages = ``;
    arrImages.forEach((item, index) => {
      htmlImages += `<div class="game__option">
              <img src="${item.src}" data-type="${item.imageType}" alt="Option ${index}" width="304" height="455">
            </div>`;
    });
    return `
    <section class="game">
      <p class="game__task">Найдите рисунок среди изображений</p>
      <form class="game__content game__content--triple">
        ${htmlImages}
      </form>
      <ul class="stats">
        ${statsPictureStr}
      </ul>
    </section>
  `;
  };
  /** при выборе ответа в форме, переключение экрана
   * @param {Event} evt
   * @param {Object} state
   */
  const clickFormHandler = (evt, state) => {
    const target = evt.target;
    const selectUserAnswer = target.getAttribute(`data-type`);

    const newState = managmentGame.pushUserAnswer(CORRECT_ANSWER === selectUserAnswer, state);
    managmentGame.controlGameScreens(newState, dataGame);
  };
  /** =========================================
   * экспорт
   * @param {Object} state
   * @param {Array} arrImages
   * @param {String} statsPictureStr
   * @return {HTMLElement} element
   */
  var gameThree = (state, arrImages, statsPictureStr) => {
    const element = managentDom.renderTemplate(template$2(arrImages, statsPictureStr));
    const imgs = element.querySelectorAll(`.game__content img`);

    imgs.forEach((item) => {
      item.addEventListener(`click`, (evt) => {
        clickFormHandler(evt, state);
      });
    });

    return element;
  };

  var returnScreenGame = (valueScreen) => {
    let typeScreen = ``;
    switch (valueScreen) {
      case `gameOne`:
        typeScreen = gameOne;
        break;
      case `gameTwo`:
        typeScreen = gameTwo;
        break;
      case `gameThree`:
        typeScreen = gameThree;
        break;
    }
    return typeScreen;
  };

  const headerTemplate = (state) => `<header class="header">
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
    ${new Array(3 - state.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`).join(``)}
    ${new Array(state.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`).join(``)}
  </div>
  </header>
`;

  var header = (state) => {
    const element = managentDom.renderTemplate(headerTemplate(state));

    // const gameTimer = element.querySelector(`.game__timer`);

    setEventForBtnBack(element);
    // managmentGame.startTime(gameTimer);

    return element;
  };

  /** результаты игры
  * @param {Object} obj
  * @param {String} statsPictureStr
  * @return {String} html
  */
  const template$3 = (obj, statsPictureStr) => {
    let slowPoint;
    if (obj.slowPoints) {
      slowPoint = obj.slowPoints.points === 0 ? 0 : `-` + obj.slowPoints.points;
    } else {
      slowPoint = ``;
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
          ${statsPictureStr}
        </ul>
      </td>
      <td class="result__points">× 100</td>
      <td class="result__total">900</td>
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
          ${statsPictureStr}
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
  };
  /** =========================================
   * экспорт
   * @param {Object} objUserStat
   * @param {String} statsPictureStr
   * @return {HTMLElement} element
   */
  var resultScreen = (objUserStat, statsPictureStr) => {
    const element = managentDom.renderTemplate(template$3(objUserStat, statsPictureStr));

    setEventForBtnBack(element);

    return element;
  };

  /** =========================================
  * обьявление переменных
  */
  const INITIAL_GAME = Object.freeze({
    lives: 3,
    level: 0,
    time: 0,
    points: 0
  });
  const MIN_ANSWER = 10;
  const FAST_TIME = 10;
  const NORMAL_TIME_VALUE_ONE = 10;
  const NORMAL_TIME_VALUE_TWO = 20;
  const SLOW_TIME = 20;
  const WRONG_TEXT = `<li class="stats__result stats__result--wrong"></li>`;
  const SLOW_TEXT = `<li class="stats__result stats__result--slow"></li>`;
  const FAST_TEXT = `<li class="stats__result stats__result--fast"></li>`;
  const CORRECT_TEXT = `<li class="stats__result stats__result--correct"></li>`;
  const UNKNOWN_TEXT = `<li class="stats__result stats__result--unknown"></li>`;
  const POINT_ADD = 100;
  const POINT_BONUS = 50;
  const POINT_FINE = 50;
  const POINT_BONUS_LIVES = 50;
  let timeText;
  let userStat = {
    name: ``,
    answers: []
  };

  /**
  * возврашает функцию устанавливаюшую игровой экран или экран результатов
  * @param {Object} state
  * @param {Array} array
  * @param {String} statsPictureStr
  * @return {Function}
  */
  const setGame = (state, array, statsPictureStr) => {
    let index = state.level;

    return returnScreenGame(array[index].type)(changeLevel(state), array[index].images, statsPictureStr);
  };
  /**
  * записываем ответ пользователя
  * @param {Boolean} value
  * @param {Object} state
  * @return {Object}
  */
  const pushUserAnswer = function (value, state) {
    if (value) {
      userStat.answers.push({answer: true, elapsedTime: timeText});
      return state;
    } else {
      userStat.answers.push({answer: false, elapsedTime: timeText});
      return setLives(state);
    }
  };
  /** Управление жизнями игрока
  * @param {Object} startData
  * @return {Object}
  */
  const setLives = (startData) => {
    const tempObj = {
      lives: startData.lives - 1
    };
    return Object.assign({}, startData, tempObj);
  };
  /** Переключение уровней
  * @param {Object} startData
  * @return {Object}
  */
  const changeLevel = (startData) => {
    const tempObj = {
      level: startData.level + 1
    };
    return Object.assign({}, startData, tempObj);
  };
  // /** запись текста времени
  // * @param {HTMLElement} element
  // * @param {String} text
  // */
  // const setTextTime = (element, text) => {
  //   if (text < 10) {
  //     text = `0` + text;
  //   }
  //   element.innerHTML = text;
  // };
  /** создание графики ответов
  * @return {String} answersList
  */
  const createStatsPicture = () => {
    let answersList = new Array(10);

    let answersListTime = userStat.answers.map((item) => {
      return item;
    });

    if (answersListTime.length === 0) {
      answersListTime = new Array(10).fill(undefined);
    }

    for (let i = 0; i < answersList.length; i++) {
      if (answersListTime[i] === undefined) {
        answersList[i] = UNKNOWN_TEXT;
      }
      if (answersListTime[i]) {
        if (answersListTime[i].elapsedTime < FAST_TIME) {
          answersList[i] = FAST_TEXT;
        }
        if (answersListTime[i].elapsedTime > SLOW_TIME) {
          answersList[i] = SLOW_TEXT;
        }
        if (answersListTime[i].elapsedTime >= NORMAL_TIME_VALUE_ONE && answersListTime[i].elapsedTime <= NORMAL_TIME_VALUE_TWO || answersListTime[i].elapsedTime === undefined) {
          answersList[i] = CORRECT_TEXT;
        }
        if (answersListTime[i].answer === false) {
          answersList[i] = WRONG_TEXT;
        }
      }
    }

    answersList = answersList.join(``);
    return answersList;
  };
  // /** Счетчик времени
  // * @param {HTMLElement} timerElement
  // * @return {Number} timeText
  // */
  // const startTime = (timerElement) => {
  //   let date = Date.now();

  //   setInterval(() => {
  //     let now = Date.now();
  //     timeText = Math.round((now - date) / 1000);
  //     setTextTime(timerElement, timeText);
  //   }, 20);
  //   return timeText;
  // };
  /**
  * управление игровыми экранами
  * @param {Object} state
  * @param {Array} questions
  */
  const controlGameScreens = (state = Object.assign({}, INITIAL_GAME), questions) => {
    let statsPictureStr = createStatsPicture();
    if (state.level === 0) {
      userStat.answers.length = 0;
      statsPictureStr = createStatsPicture();
    }
    if (state.lives === 0 || state.level >= questions.length) {
      const resulltUserStat = countingPoints(userStat.answers, state);
      managentDom.changeScreen(resultScreen(resulltUserStat, statsPictureStr));
      return;
    }

    managentDom.changeScreen(header(state), setGame(state, questions, statsPictureStr));
  };
  /** Подсчет очков при окончании игры
  * @param {Array} arrayUserAnswers
  * @param {Object} startData
  * @return {Object} newData
  */
  const countingPoints = (arrayUserAnswers, startData) => {
    const newData = Object.assign({}, startData);

    if (arrayUserAnswers.length < MIN_ANSWER) {
      newData.points = -1;
      return newData;
    }
    newData.fastPoints = {
      points: 0,
      items: 0
    };
    newData.slowPoints = {
      points: 0,
      items: 0
    };
    newData.livesPoints = {
      points: 0,
      items: 0
    };

    arrayUserAnswers.forEach((item) => {
      if (item.answer && item.elapsedTime < FAST_TIME) {
        newData.fastPoints.points = newData.fastPoints.points + POINT_ADD + POINT_BONUS;
        newData.fastPoints.items += 1;
      } else if (item.answer && item.elapsedTime >= NORMAL_TIME_VALUE_ONE && item.elapsedTime <= NORMAL_TIME_VALUE_TWO) {
        newData.points = newData.points + POINT_ADD;
      } else if (item.answer && item.elapsedTime > SLOW_TIME) {
        newData.slowPoints.points = newData.slowPoints.points + POINT_ADD - POINT_FINE;
        newData.slowPoints.items += 1;
      }
    });

    newData.livesPoints.points = newData.livesPoints.points + startData.lives * POINT_BONUS_LIVES;
    newData.livesPoints.items = startData.lives;
    newData.points = newData.points + newData.fastPoints.points + newData.slowPoints.points + newData.livesPoints.points;

    return newData;
  };
  /** =========================================
  * экспорт
  */
  const managmentGame = {
    controlGameScreens,
    pushUserAnswer
  };

  const RULES_SCREEN = `
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
  </header>
  <section class="rules">
    <h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
      <li>Угадай 10 раз для каждого изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
      <li>Фотографиями или рисунками могут быть оба изображения.</li>
      <li>На каждую попытку отводится 30 секунд.</li>
      <li>Ошибиться можно не более 3 раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </section>
`;

  /** функция управляет состоянием disabled кнопки формы btnRulesForm в зависимости от значения инпута в форме
  * @param {Event} evt
  * @param {HTMLElement} btnForm
  */
  const changeNameHandler = (evt, btnForm) => {
    const targetValue = evt.target.value;
    btnForm.disabled = !targetValue;
  };
  /** изменение sreen при отправке формы
  * @param {Event} evt
  * @param {HTMLElement} inputElem
  */
  const submitFormHandler = (evt, inputElem) => {
    evt.preventDefault();
    // как записать имя игрока?
    if (inputElem.value) ;

    managmentGame.controlGameScreens(undefined, dataGame);
  };
  /** =========================================
  * экспорт
  * @return {HTMLElement} element
  */
  var rulesScreen = () => {
    const element = managentDom.renderTemplate(RULES_SCREEN);
    const name = element.querySelector(`.rules__input`);
    const rulesForm = element.querySelector(`.rules__form`);
    const btnRulesForm = element.querySelector(`.rules__button`);

    name.addEventListener(`input`, (evt) => {
      changeNameHandler(evt, btnRulesForm);
    });
    rulesForm.addEventListener(`submit`, (evt) => {
      submitFormHandler(evt, name);
    });

    setEventForBtnBack(element);

    return element;
  };

  const WELCOME_SCREEN = `
  <section class="greeting central--blur">
    <img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">
    <div class="greeting__asterisk asterisk"><span class="visually-hidden">Я просто красивая звёздочка</span>*</div>
    <div class="greeting__challenge">
      <h3 class="greeting__challenge-title">Лучшие художники-фотореалисты бросают тебе вызов!</h3>
      <p class="greeting__challenge-text">Правила игры просты:</p>
      <ul class="greeting__challenge-list">
        <li>Нужно отличить рисунок от фотографии и сделать выбор.</li>
        <li>Задача кажется тривиальной, но не думай, что все так просто.</li>
        <li>Фотореализм обманчив и коварен.</li>
        <li>Помни, главное — смотреть очень внимательно.</li>
      </ul>
    </div>
    <button class="greeting__continue" type="button">
      <span class="visually-hidden">Продолжить</span>
      <svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-right"></use>
      </svg>
    </button>
  </section>
`;

  /** изменение sreen при клике
  *
  */
  const clickBtnHandler = () => {
    managentDom.changeScreen(rulesScreen());
  };
  /** =========================================
  * экспорт
  * @return {HTMLElement} element
  */
  var welcome = () => {
    const element = managentDom.renderTemplate(WELCOME_SCREEN);
    const btnGreetingContinue = element.querySelector(`.greeting__continue`);

    btnGreetingContinue.addEventListener(`click`, clickBtnHandler);

    return element;
  };

  const MAIN_SCREEN = `
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>
`;

  /** изменение sreen по клику и css анимация исчезновения/появления
  *
  */
  const clickBtnHandler$1 = () => {
    managentDom.changeScreen(welcome());
  };
  /** =========================================
  * экспорт
  * @return {HTMLElement} element
  */
  var mainScreen = () => {
    const element = managentDom.renderTemplate(MAIN_SCREEN);
    const btnIntroAsterisk = element.querySelector(`.intro__asterisk`);

    btnIntroAsterisk.addEventListener(`click`, clickBtnHandler$1);

    return element;
  };

  managentDom.changeScreen(mainScreen());

}());

//# sourceMappingURL=main.js.map
