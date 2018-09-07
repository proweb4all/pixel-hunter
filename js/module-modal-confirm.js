import {deleteElement, changeScreen} from './module-mangment-dom.js';
import welcome from './screens/module-welcome-screen.js';
import ModalConfirm from './views/module-modal-confirm-view.js';

export default () => {
  const modalConfirm = new ModalConfirm();
  modalConfirm.nextScreen = () => {
    changeScreen(welcome());
  };
  modalConfirm.closeModal = (elem) => {
    deleteElement(elem);
  };
  modalConfirm.closeEscModal = (evt, elem) => {
    if (evt.keyCode === modalConfirm.ESC_CODE) {
      modalConfirm.closeModal(elem);
    }
  };
  return modalConfirm.element;
};
