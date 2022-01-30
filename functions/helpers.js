import { todos } from './data-functions.js'

// Kolla om listan innehåller några klarmarkerade todos
export const checkForCompleted = () => {
  return todos.some(todo => todo.completed === true)
}

// Visa en varning med ett meddelande
export const showWarning = (element, message) => {
  // Lägg till relevanta css-klasser och attribut
  element.classList.add('error');
  element.setAttribute('data-error', message);
  element.classList.add('error-icon');
};

// Ta bort en varning
export const removeWarning = (element) => {
  // Ta bort relevanta css-klasser och attribut
  element.classList.remove('error-icon', 'error');
  delete element.dataset.error;
};

// Validera input för att se till att den inte är tom.
export const validateInput = (text, element) => {
  // Ta bort tidiagare varningar för att undvika eventuella buggar
  if (element.classList.contains('error')) removeWarning(element);

  // Kolla om den angivna texten är tom
  if (text == '') {
    showWarning(element, 'Please write a todo-description');
    return false
  };

  // Om allt är OK så tar vi bort eventuella varningar.
  if (element.classList.contains('error')) removeWarning(element);
  return true;
}