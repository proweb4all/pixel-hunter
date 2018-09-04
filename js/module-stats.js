import {renderTemplate} from './module-mangment-dom.js';

const statsTemplate = (listItems) => `<ul class="stats">
        ${listItems}
      </ul>
    </section>
`;

export default (listItems) => {
  const element = renderTemplate(statsTemplate(listItems));

  return element;
};
