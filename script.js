import { checkForCompleted, validateInput } from './functions/helpers.js'
import { todos, updateArray, removeMultipleTodos, createTodo } from './functions/data-functions.js';
import createListElement from './functions/create-list-element.js'
import { showDeleteButton, hideDeleteButton, removeElements } from './functions/design-functions.js';
import { form, btnRemove } from './util/selectors.js';


/* Jag har testat att dela upp koden i olika filer för att träna på det.
Namngivningen och uppdelningen är inte den mest logiska och ett flertal 
filer skulle defintivt kunna slås ihop i*/


// Skapa en lista med element som representerar varje todo
todos.forEach(todo => createListElement(todo))
  // Visa radera-knappen om någon todo är markerad färdig
if (checkForCompleted()) showDeleteButton();



// Lyssna efter submit från formuläret
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = form.querySelector('input');

  // Kolla om angiven input är OK, annars avbryter vi
  if (!validateInput(input.value, input.parentNode)) return;

  // Spara användarens input ett nytt todo-objekt
  const newTodo = {
    title: input.value,
    completed: false
  }

  // Skapa en ny todo
  const createdTodo = createTodo(newTodo);

  // Skapa ett nytt element för den nya todon
  createListElement(createdTodo);

  form.reset();

})



// Ta bort alla klarmarkerade todos
btnRemove.addEventListener("click", () => {
  // kolla om listan innehåller klarmarkerade todos, annars avbryt
  if (!checkForCompleted()) return;
  // Kolla om knappen är aktiverad, annars avbryt
  if (btnRemove.classList.contains('disabled')) return;

  // Filtrera listan och spara det todos som skall raderas i en ny array
  const todosToRemove = todos.filter(todo => todo.completed === true);

  // Filtrera listan och spara de todos som inte skall readras i en ny array
  const todosLeft = todos.filter(todo => todo.completed !== true)

  // Ta bort alla klarmarkerade todos från databasen samt den lokala arrayen
  removeMultipleTodos(todosToRemove);
  // Ta bort alla klarmarkerade element från listan
  removeElements(todosToRemove);
  // Uppdatera den lokala arrayen
  updateArray(todosLeft);

  // Dölj radera-knappen då listan nu är tömd
  hideDeleteButton();

  //console.log(todos);
})