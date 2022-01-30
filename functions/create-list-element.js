import { itemMouseEnter, itemMouseLeave, selectItem } from './utility-events.js';

const output = document.querySelector("#todoList");


// Skapar elementen för den visuella listan
export default async function createListElement(objectData) {

  // Vänta med att skapa elementen tills att todon är skapad på databasen
  const data = await objectData;
  // Skapa li och lägg till i ul
  let listItem = document.createElement('li');
  listItem.classList.add('todo', data.completed ? 'completed' : 'todo');
  listItem.id = `id-${data.id}`;
  output.insertAdjacentElement('afterbegin', listItem);

  // Skapa label och lägg till i li
  let label = document.createElement('label');
  label.classList.add('checkbox-container');
  listItem.appendChild(label);

  // Skapa checkbox
  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = data.completed;
  checkbox.classList.add('checkbox');
  label.appendChild(checkbox);

  // Skapa title
  let title = document.createElement('span');
  title.classList.add('todo-title');
  title.innerText = data.title
  label.appendChild(title);


  // Lägg till lyssnare för diverse events
  itemMouseEnter(listItem);
  itemMouseLeave(listItem);
  selectItem(listItem, checkbox, data);
}