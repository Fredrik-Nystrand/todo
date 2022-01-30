import { todos, updateTodo } from './data-functions.js'

// Lyssna efter mus-event
/* OBS!: Detta skulle sannorlikt kunna göras helt via CSS men jag ville testa göra det 
 * med javascript istället för att lära mig de olika fördelar och nackdelar med båda metoderna*/
export const itemMouseEnter = (element) => {
  element.addEventListener("mouseenter", () => {
    element.classList.add("hover");
  })
}

export const itemMouseLeave = (element) => {
  element.addEventListener("mouseleave", () => {
    element.classList.remove("hover");
  })
}


// Uppdatera en todos "completed"-status när användaren klickar på ett element i listan.
export const selectItem = (parent, checkbox, todoData) => {

  // Lyssna efter ett on-change event då en checkbox inte alltid hinner reagera
  // på för snabba musklick, vilket kan leda till buggar.
  checkbox.addEventListener('change', () => {
    //console.log(checkbox.checked);
    const title = parent.querySelector('.todo-title');

    // Lägg till / ta bort, CSS klasser beroende på checkboxens status.
    if (!checkbox.checked) {
      parent.classList.remove('completed');
      title.classList.remove('slide_in');
      title.classList.add('slide_out');
    } else {
      parent.classList.add('completed');
      title.classList.remove('slide_out');
      title.classList.add('slide_in');
    }

    // Ge den valda todon samma "completed"-status som checkboxen.
    todoData.completed = checkbox.checked;
    // Uppdatera databasen och den lokala arrayen med den ändrade todon.
    updateTodo(todoData);

  })
}