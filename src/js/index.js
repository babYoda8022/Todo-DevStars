//Modal
const openModal = document.getElementById("open-modal")
const closeModal = document.querySelector("#btn-close")
const modal = document.querySelector(".modal")
const fundoModal = document.querySelector(".fundo-modal")

openModal.addEventListener("click", ()=>{
    modal.removeAttribute("id")
    fundoModal.removeAttribute("id")
})

closeModal.addEventListener("click", ()=>{
    modal.setAttribute("id", "modal-close")
    fundoModal.setAttribute("id", "modal-close")
})


//Create task
const createTask = document.querySelector("#create-task")
const inputValue = document.querySelector("#task");
var taskList = []


createTask.addEventListener("click", ()=>{
    if (!inputValue.value) 
    {
        window.alert("Cannot create empty task")
    } else 
    {
        if (localStorage.Todos) 
        {
            taskList = JSON.parse(localStorage.getItem("Todos"))
        }

        const task = {
            "id": taskList == "" ? 0 : taskList.length - 1 + 1,
            "taskValue": inputValue.value,
            "completed": false
        }

        taskList.push(task)
        localStorage.setItem("Todos", JSON.stringify(taskList))
        inputValue.value = ""
        document.location.reload(true);
    }
})

//Functionalites
let todoMain = document.querySelector(".todo-main")
const listIcons = ['bx bx-edit-alt', 'bx bx-comment-x'];

function Todos(){
    if(localStorage.Todos)
    {
        taskList = JSON.parse(localStorage.getItem("Todos"))
        
        taskList.forEach((value, index)=>{

            let todo = document.createElement("div")  
            todo.setAttribute("class", "box-todos")

            let checkBox = document.createElement("input")
            checkBox.type = "checkbox"

            let todoContent = document.createElement("div")
            todoContent.setAttribute("class", "todo-content")

            checkBox.addEventListener("click", ()=>{
                if(!checkBox.checked)
                {
                    todoContent.removeAttribute("id")
                }else
                {
                    todoContent.setAttribute("id", "checked")        
                }
            })

            let todoIcons = document.createElement("div")
            let icon

            listIcons.forEach((value, index)=>{
                icon = document.createElement("i")
                icon.setAttribute("class", value)
                todoIcons.appendChild(icon)
            })

            todoContent.innerHTML = `<h1>${value["taskValue"]}</h1>`

            todo.appendChild(checkBox)
            todo.appendChild(todoContent)
            todo.appendChild(todoIcons)
            todoMain.appendChild(todo)
        });
    }
}