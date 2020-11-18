class TodoItem {
  constructor(name, id, toggle) {
    this.name = name;
    this.id = id;
    this.toggle = toggle;
  }
}

let objectId = 1;
let i = 0;
let toggleId = 0;
let todoItems = [];

window.onload = function () {
  let Todoitem1 = new TodoItem(
    "Göra klart inlämningsuppgiften",
    (objectId += 2),
    toggleId
  );
  let Todoitem2 = new TodoItem("Hämta barnen", (objectId += 2), toggleId);
  let Todoitem3 = new TodoItem("Diska", (objectId += 2), toggleId);
  setTimeout(timeAlert, 4000);
  todoItems.push(Todoitem1);
  todoItems.push(Todoitem2);
  todoItems.push(Todoitem3);
  let buttonSort = document.getElementById("btn_sort");
  buttonSort.addEventListener("click", handleSortClick);
  let buttonAdd = document.getElementById("input_confirm");
  buttonAdd.addEventListener("click", handleInputClick);
  let buttonUndo = document.getElementById("delete_regret");
  buttonUndo.addEventListener("click", handleUndoClick);

  listCreator();
};

// Klickfunktion för addering av nya todoitems, gör ett objekt av användarinput, lägger det sist i array
// och skapar en ny div osv åt den
function handleInputClick() {
  let todoListClear = document.getElementById("todo_list");
  let inputTodoItem = document.getElementById("input_todo_item");
  let usrInput = inputTodoItem.value;

  if (usrInput !== "") {
    let usrTodo = new TodoItem(usrInput, (objectId += 2), toggleId);
    todoItems.push(usrTodo);
    todoListClear.innerText = "";
    listCreator();
    inputTodoItem.value = "";
  }
}

//klickfunktiuon åt borttagning, jämför todoitem som man klickar på id med index i listan om dem stämmer
// så tas den bort. Det borttagna item förvaras sedan i sessionStorage

function handleClick(todoItem) {
  let todoListClear = document.getElementById("todo_list");

  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id == todoItem.id) {
      let latestDeleted = todoItems.splice(i, 1);

      sessionStorage.setItem("latestDeletedObj", JSON.stringify(latestDeleted));

      todoListClear.innerText = "";
      listCreator();
    }
  }
}

//Hämtar det senast borttagna objektet från sessionStorage, återskapar ett nytt objekt av det, och lägger det sist i listan
function handleUndoClick() {
  let todoListClear = document.getElementById("todo_list");
  let getObjSS = JSON.parse(sessionStorage.latestDeletedObj);

  let regretItem = new TodoItem(getObjSS[i].name, getObjSS[i].id, toggleId);
  console.log(getObjSS[i].id);
  todoItems.push(regretItem);

  todoListClear.innerText = "";
  listCreator();
  sessionStorage.clear();
}

//Funktionen som renderar html, denna kallas i alla andra funktioner, varje gång en ändring i listan gjorts.
//Innehåller också funktionalitet för att stryka över objekt i listan när man klickar på span
function listCreator() {
  for (let i = 0; i < todoItems.length; i++) {
    let todoDiv = document.createElement("div");
    todoDiv.className = "todo_div";
    let todoLiItems = document.createElement("li");
    todoLiItems.className = "todo_li_items";
    let todoSpan = document.createElement("span");

    if (todoItems[i].toggle % 2 !== 0) {
      todoSpan.classList.add("toggle");
    } else {
      todoSpan.classList.remove("toggle");
    }

    todoSpan.addEventListener("click", () => {
      let todoListClear = document.getElementById("todo_list");
      todoItems[i].toggle += todoItems[i].id;
      console.log(todoItems[i].toggle);
      todoListClear.innerText = "";
      listCreator();
    });
    todoSpan.innerText = todoItems[i].name;

    //Skapa knappar
    let todoDelButton = document.createElement("button");
    todoDelButton.type = "button";
    todoDelButton.className = "fas fa-times btn";
    todoDelButton.addEventListener("click", () => {
      handleClick(todoItems[i]);
    });

    //Fäster
    let todoList = document.getElementById("todo_list");
    todoList.appendChild(todoDiv);
    todoDiv.appendChild(todoLiItems);
    todoLiItems.appendChild(todoSpan);
    todoLiItems.appendChild(todoDelButton);
  }
}

//Funktion för sortering i alfabetisk ordning, ignorerar om det är versaler eller gemener
function handleSortClick() {
  todoItems.sort(function (a, b) {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
  let todoListClear = document.getElementById("todo_list");
  todoListClear.innerText = "";
  listCreator();
}

//Funktion som körs efter 4 sekunder första gången man besöker sidan, och sen aldrig igen
function timeAlert() {
  let alertCheck = localStorage.getItem("alertCheck");
  if (alertCheck == undefined) {
    alert(
      "Psst... You know you can cross todo items out by clicking them, right?"
    );
    localStorage.setItem("alertCheck", "alertCheck");
  }
}
