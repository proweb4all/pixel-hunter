import Header from './views/module-header-view.js';

export default (state) => {
  const header = new Header(state);
  return header.element;
};
