class TodoItem { 
    constructor(name, id){
        this.name = name;
        this.id = id;
        
    }
}
let x = 0; 
let i = 0;


let todoItems = [];


window.onload = function() {

   
let Todoitem1 = new TodoItem("Göra klart inlämningsuppgiften",x++);
let Todoitem2 = new TodoItem("Hämta barnen",x++);
let Todoitem3 = new TodoItem("Diska",x++);

todoItems.push(Todoitem1);
todoItems.push(Todoitem2);
todoItems.push(Todoitem3);
    let buttonSort = document.getElementById("btn_sort");
    buttonSort.addEventListener("click",handleSortClick);
    let buttonAdd = document.getElementById("input_confirm");
    buttonAdd.addEventListener("click",handleInputClick);
    let buttonUndo = document.getElementById("delete_regret");
    buttonUndo.addEventListener("click",handleUndoClick);
    
    
    
 
    creator();






}

    
// Klickfunktion för add knappen, gör ett objekt av användar input, lägger det sist i array
// och skapar en ny div osv åt den
function handleInputClick(){
    let todoListClear = document.getElementById("todo_list");
    let inputTodoItem = document.getElementById("input_todo_item");
    let usrInput = inputTodoItem.value;
   
    if (usrInput !== "") {
        
        let usrTodo = new TodoItem(usrInput,x++);
        todoItems.push(usrTodo);
        todoListClear.innerText = "";
        creator();
        inputTodoItem.value = "" ;
        
       
    }
   
    
}

//klickfunktiuon åt botrttagning, jämför todoitem som man klickar på id med index i listan om dem stämmer
// så tas den bort

function handleClick(todoItem) {
 let todoListClear = document.getElementById("todo_list");

    for (let i = 0; i < todoItems.length; i++) {
        if (todoItems[i].id == todoItem.id){
           let latestDeleted =  todoItems.splice(i,1); 
            
          
           sessionStorage.setItem("latestDeletedObj",JSON.stringify(latestDeleted))
            
         
           todoListClear.innerText = "";
           creator();           
        }
    
        
    }
}

       
function handleUndoClick() {
    
    let todoListClear = document.getElementById("todo_list");
    let getObjSS = JSON.parse(sessionStorage.latestDeletedObj)
    
    let regretItem = new TodoItem(getObjSS[i].name, getObjSS[i].id);
 
    todoItems.push(regretItem);
   
     
    
  
    todoListClear.innerText = "";
    creator();
    sessionStorage.clear();
  
   
}       
  





function creator(){
       
    for (let i = 0; i < todoItems.length; i++) {

        //Skapar divs
        let todoDiv = document.createElement("div");
        todoDiv.className = "todo_div"
        let todoLiItems = document.createElement("li");
        todoLiItems.className = "todo_li_items";
        let todoSpan = document.createElement("span");
       
        todoSpan.addEventListener("click", () => {
            if (todoSpan.className == "toggle") {
                todoSpan.classList.remove("toggle")
            }
            else { todoSpan.classList.add("toggle"
            )}

        });
        todoSpan.innerText = todoItems[i].name;
        
        
        //Skapa knappar
        let todoDelButton = document.createElement("button");
        todoDelButton.type = "button";
        todoDelButton.className = "fas fa-times btn";
        todoDelButton.addEventListener("click",() => {handleClick(todoItems[i])
            //todoList.removeChild(todoDiv); 
            
          
         }); 
        
        
       
        //Fäster
        let todoList = document.getElementById("todo_list")
        todoList.appendChild(todoDiv);
        todoDiv.appendChild(todoLiItems);
        todoLiItems.appendChild(todoSpan);
        todoLiItems.appendChild(todoDelButton);

   
      
      
    
    
}
}



function handleSortClick(){
    
    function compare( a,b ){
        if (a.name < b.name){
            return -1;
        }
        if (a.name > b.name){
            return 1;
        }
        return 0;
    }
    todoItems.sort(compare);
    let todoListClear = document.getElementById("todo_list");
    todoListClear.innerText = "";
    creator();
}
