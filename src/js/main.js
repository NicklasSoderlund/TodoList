let todoListContainer = document.getElementById("Todo-list");
let finishedTasksContainer = document.getElementById("finished-tasks");
let moveTo = 0;

import { Todo } from "./models/todo"

let todoList = [
    new Todo ("Clean bedroom", "Vaccuum floor", "Make the bed", "Clean the drawer", false),
    new Todo ("Clean garage", "Pressure wash the car", "Clean up the workbench", "Fix broken lawnmower", false),
    new Todo ("Go shopping", "Buy milk", "Buy onions", "Buy ground beef", false),
    new Todo ("Feed the pets", "Feed the dog", "Feed the cat", "Feed the goldfish", false),
    new Todo ("Do homework", "Math", "English", "Science", false)
];

if(localStorage.getItem("todoList") === null) {
    localStorage.setItem("todoList", JSON.stringify(todoList));
} 

let currentTodoList =  localStorage.getItem("todoList");

todoList = JSON.parse(currentTodoList);


function refreshList() {
    todoListContainer.innerHTML = "";
    finishedTasksContainer.innerHTML ="";

    for (let i=0; i<todoList.length; i++) {

        if(todoList[i].finishedToggle === false) {
        let newUl = document.createElement("ul");
        let whatTodo = document.createElement("li");
        let firstLi = document.createElement("li");
        let secondLi = document.createElement("li");
        let thirdLi = document.createElement("li");
    
        let index = [i];
        let uniqueId = "todoObject" + i;
        newUl.setAttribute("id", uniqueId);
        newUl.setAttribute("class", "todoObject")
        whatTodo.setAttribute("id", "whatToDo");
    
        whatTodo.innerHTML = todoList[i].whatTodo;
        firstLi.innerHTML = todoList[i].firstThing;
        secondLi.innerHTML = todoList[i].secondThing;
        thirdLi.innerHTML = todoList[i].thirdThing;

        newUl.appendChild(whatTodo);
        newUl.appendChild(firstLi);
        newUl.appendChild(secondLi);
        newUl.appendChild(thirdLi);
        
      
        let markAsFinished = document.createElement("li");
        markAsFinished.setAttribute("class", "markAsFinished")
        markAsFinished.innerHTML = "Click to mark as finished";
     
        markAsFinished.addEventListener("click", () => {
            finishedTasksContainer.innerHTML = "";
            console.log([index]);
            todoList[i].finishedToggle = true;
            console.log(todoList[i]);

            let currentObject = todoList[i];
            let currentObjectIndex = todoList.indexOf(currentObject);
            todoList.push(todoList.splice(currentObjectIndex, 1)[0]);
        
              refreshList();
           
            
        });
        
        newUl.appendChild(markAsFinished);
        
        todoListContainer.appendChild(newUl);

        let arrowUl = document.createElement("ul")
        let arrowLeftLi = document.createElement("li")
        let arrowRightLi = document.createElement("li")
        arrowLeftLi.innerHTML = "<";
        arrowRightLi.innerHTML = ">";

        arrowLeftLi.addEventListener("click", () => {
            let currentObject = todoList[i];
            let currentObjectIndex = todoList.indexOf(currentObject);
              
            //Bug Fix
            if(currentObjectIndex === 0) {
               return false;

            } 
            else {
            moveTo = currentObjectIndex - 1;
            todoList.splice(currentObjectIndex, 1);
            todoList.splice(moveTo, 0, currentObject);
            refreshList();  
        }   

     }); 
        arrowRightLi.addEventListener("click", () => {
            
            let currentObject = todoList[i];
            let currentObjectIndex = todoList.indexOf(currentObject);

            let toTheRight = currentObjectIndex + 1;

            if(todoList[toTheRight].finishedToggle === true) {
                return;
            }


            moveTo = currentObjectIndex +1;
            todoList.splice(currentObjectIndex, 1,);
            todoList.splice(moveTo, 0, currentObject);
            refreshList();           
            
        }); 

        arrowUl.appendChild(arrowLeftLi);
        arrowUl.appendChild(arrowRightLi);
        arrowUl.setAttribute("id", "arrows");
        newUl.appendChild(arrowUl);
    }
    }
    
    localStorage.setItem("todoList",JSON.stringify(todoList));

 for(let i=0; i<todoList.length; i++) {

    

  if(todoList[i].finishedToggle === true) {
                

    let finishedTaskUl = document.createElement("ul");
    let finishedWhatTodo = document.createElement("li");
    let finishedFirstLi = document.createElement("li");
    let finishedSecondLi = document.createElement("li");
    let finishedThirdLi = document.createElement("li");

    let index = [i]; 
    let uniqueId = "finishedTodoObject" + index;
    finishedTaskUl.setAttribute("id", uniqueId);
    finishedTaskUl.setAttribute("class", "finishedTodoObject")
    finishedWhatTodo.setAttribute("id", "finishedWhatToDo");

    finishedWhatTodo.innerHTML = todoList[i].whatTodo;
    finishedFirstLi.innerHTML = todoList[i].firstThing;
    finishedSecondLi.innerHTML = todoList[i].secondThing;
    finishedThirdLi.innerHTML = todoList[i].thirdThing;

    finishedTaskUl.appendChild(finishedWhatTodo);
    finishedTaskUl.appendChild(finishedFirstLi);
    finishedTaskUl.appendChild(finishedSecondLi);
    finishedTaskUl.appendChild(finishedThirdLi);
    
    let buttonsLi = document.createElement("li");
    let undoTaskButton = document.createElement("button");
    let deleteTaskButton = document.createElement("button");
    undoTaskButton.setAttribute("id", "undoButton");
    deleteTaskButton.setAttribute("id", "deleteButton");
    undoTaskButton.innerHTML = "Undo Task";
    deleteTaskButton.innerHTML = "Delete Task";
    buttonsLi.classList.add("no-list");
    

    undoTaskButton.addEventListener("click", () => {
        todoList[i].finishedToggle = false;    
        refreshList(); 
     
    })


    deleteTaskButton.addEventListener("click", () => {
        let currentObject = todoList[i];
        let currentObjectIndex = todoList.indexOf(currentObject);

        todoList.splice(currentObjectIndex, 1,);
        deleteTaskButton.closest("ul").remove();
        refreshList();
       
    })
    buttonsLi.appendChild(undoTaskButton);
    buttonsLi.appendChild(deleteTaskButton);
    finishedTaskUl.appendChild(buttonsLi);

    finishedTasksContainer.appendChild(finishedTaskUl);

   }
  }
localStorage.setItem("todoList",JSON.stringify(todoList));
}
refreshList();

let finishedTasksUl = document.getElementById("finished-tasks");

let finishedTasksHeader = document.createElement("h3");
finishedTasksHeader.innerHTML = "FINISHED TASKS:";

document.body.insertBefore(finishedTasksHeader, finishedTasksUl);

let myForm = document.createElement("div");

let WhatToDoLabel = document.createElement("label");
WhatToDoLabel.innerHTML = "New task:";
let WhatToDoInput = document.createElement("input");
WhatToDoInput.setAttribute("id", "whatToDoInput");

let firstBulletPointLabel = document.createElement("label");
firstBulletPointLabel.innerHTML = "Bulletpoint 1:";
let secondBulletPointLabel = document.createElement("label");
secondBulletPointLabel.innerHTML = "Bulletpoint 2:";
let thirdBulletPointLabel = document.createElement("label");
thirdBulletPointLabel.innerHTML = "Bulletpoint 3:";

let firstBulletPointInput = document.createElement("input");
let secondBulletPointInput = document.createElement("input");
let thirdBulletPointInput = document.createElement("input");
firstBulletPointInput.setAttribute("id", "firstBp");
secondBulletPointInput.setAttribute("id", "secondBp");
thirdBulletPointInput.setAttribute("id", "thirdBp");

let theButton = document.createElement("button");
theButton.innerHTML = "Create Todo";
theButton.addEventListener("click", addTodo);

myForm.appendChild(WhatToDoLabel);
myForm.appendChild(WhatToDoInput);
myForm.appendChild(firstBulletPointLabel);
myForm.appendChild(firstBulletPointInput);
myForm.appendChild(secondBulletPointLabel);
myForm.appendChild(secondBulletPointInput);
myForm.appendChild(thirdBulletPointLabel);
myForm.appendChild(thirdBulletPointInput);
myForm.appendChild(theButton);

document.body.insertBefore(myForm, finishedTasksUl.nextSibling);

  let whatToDoValueInput = document.getElementById("whatToDoInput");
  let firstBp = document.getElementById("firstBp");
  let secondBp = document.getElementById("secondBp");
  let thirdBp = document.getElementById("thirdBp");

 function addTodo() {

   let newTodo =   new Todo (whatToDoValueInput.value, firstBp.value, secondBp.value, thirdBp.value, false);
    todoList.push(newTodo);
    
    refreshList();
    clearinput();

}

function clearinput() {
   whatToDoValueInput.value = "";
   firstBp.value = "";
   secondBp.value = "";
   thirdBp.value = "";
}





