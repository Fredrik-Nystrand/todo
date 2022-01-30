import { checkForCompleted } from './helpers.js'
import { btnRemove } from '../util/selectors.js';

// Visa radera-knappen
export const showDeleteButton = () => {
  if (btnRemove.classList.contains('visible')) return;

  if (checkForCompleted()) {
    btnRemove.classList.add('visible');
  }
}

// Göm radera-knappen
export const hideDeleteButton = () => {
  if (!btnRemove.classList.contains('visible')) return;

  if (!checkForCompleted()) {
    btnRemove.classList.remove('visible');
  }
}

// Toggla radera-knappen
export const toggleDeleteButton = () => {
  if (checkForCompleted()) {
    if (btnRemove.classList.contains('visible')) return;
    btnRemove.classList.add('visible');
  } else {
    if (!btnRemove.classList.contains('visible')) return;
    btnRemove.classList.remove('visible');
  }
}

// Inaktivera radera-knappen
export const disableDeleteButton = () => {
  if (btnRemove.classList.contains('disabled')) return;
  btnRemove.classList.add('disabled');
}

// Aktiera radera knappen
export const enableDeleteButton = () => {
  if (!btnRemove.classList.contains('disabled')) return;
  btnRemove.classList.remove('disabled');
}

// Ta bort ett eller flera element från listan
export const removeElements = (todosArray) => {
  todosArray.forEach(todo => {
    document.querySelector(`#id-${todo.id}`).remove();
  })
}