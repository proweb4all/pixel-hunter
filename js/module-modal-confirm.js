import {deleteElement, changeScreen} from './module-mangment-dom.js';
import welcome from './screens/module-welcome-screen.js';
import ModalConfirm from './views/module-modal-confirm-view.js';

//  так или как внизу?
// const ESC_CODE = 27;

export default () => {
  const modalConfirm = new ModalConfirm();
  modalConfirm.nextScreen = () => {
    changeScreen(welcome());
  };
  modalConfirm.closeModal = (elem) => {
    deleteElement(elem);
  };
  modalConfirm.closeEscModal = (evt, elem) => {
    if (evt.keyCode === modalConfirm._ESC_CODE) {
      modalConfirm.closeModal(elem);
    }
  };
  return modalConfirm.element;
};
