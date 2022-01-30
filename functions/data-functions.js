import { toggleDeleteButton, disableDeleteButton, enableDeleteButton } from './design-functions.js';

// Bestäm hur många todos som skall hämtas
const nrToGet = 10;

// Hämta todos från databasen
export const getTodos = async() => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/?_limit=${nrToGet}`);

  if (await !res.ok) {
    console.log("Could not fetch data");
    return
  }

  const data = await res.json()
    //console.log(data);
  return data;
}


export let todos = await getTodos(nrToGet);

// Skapa en ny todo
export const createTodo = async({ id, title, completed }) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      id,
      title,
      completed,
    })
  })

  if (await !res.ok) {
    console.log("That id could not be found");
    return
  }

  const data = await res.json()
    // Tillfälligt id mellan 100-200 bara för att inte få något error från 
    // databasen vid uppdatering av todo
  data.id = Math.floor(100 + Math.random() * 100);
  todos.push(data);
  return data;
}

// Uppdatera todo
export const updateTodo = async({ id, title, completed }) => {
  // Av-aktivera radera-knappen tilfälligt så att inte användaren kan ta bort 
  // element från DOM innan databasen har svarat.
  disableDeleteButton();

  // skicka uppdatering
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      id,
      title,
      completed,
    })
  })

  if (await !res.ok) {
    console.log("That id could not be found");
    return
  }

  const data = await res.json()

  const indexOfOldTodo = todos.findIndex(todo => todo.id === data.id);

  todos[indexOfOldTodo] = await data;
  //console.log(todos);

  //Aktivera radera-knappen igen 
  enableDeleteButton();

  // Lägg till / Ta bort, radera knappen beroende på om det finns klarmarkerade todos i listan.
  toggleDeleteButton();
}

// Ta bort en todo
export const removeTodo = async(id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE',
  })

  if (await !res.ok) {
    console.log("Something went wrong");
    return;
  } else {
    console.log(`Removed todo with id ${id}`);
  }
}

// Ta bort flera todos
export const removeMultipleTodos = (todosToRemove) => {
  todosToRemove.forEach(todo => {
    removeTodo(todo.id);
  })
}

// Uppdatera den lokala arrayen
export const updateArray = newArray => {
  todos = newArray;
}