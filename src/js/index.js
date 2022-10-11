//Modal
const openModal = document.getElementById("open-modal")
const closeModal = document.querySelector("#btn-close")

const modal = document.querySelector(".modal")
const modalEdit = document.querySelector(".modal-edit")

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
        
        taskList.forEach((value, index1)=>{

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
                    Completed(index1, false)     
                }else
                {
                    todoContent.setAttribute("id", "checked")   
                    Completed(index1, true)     
                }
            })

            let todoIcons = document.createElement("div")
            let icon

            listIcons.forEach((value, index2)=>{
                icon = document.createElement("i")
                icon.setAttribute("class", value)
                if(index2 == 0){
                    icon.addEventListener("click",() =>{
                        window.alert("Desenvolvimento")
                        //EditTask(index1)
                    })
                }else{
                    icon.addEventListener("click", ()=>{
                        DeletTask(index1)
                    })
                }
                todoIcons.appendChild(icon)
            })

            todoContent.innerHTML = `<h1>${value["taskValue"]}</h1>`
            todo.appendChild(checkBox)

            if(taskList[index1]["completed"] == false){
                todo.appendChild(todoContent)
            }else
            {
                todoContent.setAttribute("id", "checked")
                todo.appendChild(todoContent)
                checkBox.checked = true
            }

            todo.appendChild(todoIcons)
            todoMain.appendChild(todo)
        });
    }
}


function Completed(position, bool)
{
    taskList = JSON.parse(localStorage.getItem("Todos"))
    taskList[position]["completed"] = bool
    localStorage.clear()
    localStorage.setItem("Todos", JSON.stringify(taskList))
}

function EditTask(position)
{
    taskList = JSON.parse(localStorage.getItem("Todos"))
    taskList[position]["taskValue"] = inputValue.value
    inputValue.value = ""
    localStorage.clear()
    localStorage.setItem("Todos", JSON.stringify(taskList))
}

function DeletTask(position)
{
    taskList = JSON.parse(localStorage.getItem("Todos"))
    taskList.splice(position, 1)
    localStorage.clear()
    localStorage.setItem("Todos", JSON.stringify(taskList))
    document.location.reload(true);
}