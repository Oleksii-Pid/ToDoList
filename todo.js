const inputText = document.getElementById('input-text');
const inputCheckbox = document.getElementById('input-checkbox');
const form = document.querySelector('.main__form');
const todoList = document.querySelector('.todolist');
const itemsAll = document.getElementById('itemsAll');
const itemsComplet = document.getElementById('itemsComplet');
const buttonGroup = document.querySelector('.button-group');

let dataStorage = JSON.parse(localStorage.getItem('tasks'));

let tasks;
let tasksCompleted;
let tasksNotCompleted;

if(!dataStorage){
    tasks = [];
}else{
    tasks=[...dataStorage]
}

function Task(name, state){
    this.name = name;
    this.state = state;
}

form.addEventListener('submit', handlerSubmit);

buttonGroup.addEventListener('click', (e)=>{
    if(e.target.closest('.btn-all')){
        createTask(tasks)
    }else 
    if(e.target.closest('.btn-active')){
        createTask(tasksNotCompleted)
    }else
    if(e.target.closest('.btn-completed')){
        createTask(tasksCompleted) 
    }
    
})

function changeAllTasks(e){
    if(e.target.checked){
        for(i=0; i < tasks.length; i++){
            tasks[i].state = true;
        }
    }else{
        for(i=0; i<tasks.length; i++){
            tasks[i].state = false;
        }
    }
    createTask(tasks);
    recordToStorage(tasks)
}

function taskChange(e){
    if(e.target.checked){
        for(i=0; i<tasks.length; i++){
            if(tasks[i].name == e.target.parentElement.childNodes[1].innerHTML){
                tasks[i].state = true;
                tasks.push(...tasks.splice(i, 1));
                createTask(tasks);
                recordToStorage(tasks)
            }
        }
        for(i=0; i<tasks.length; i++){
            if(!tasks[i].state){
                inputCheckbox.checked = false;
            }}
    
    }else{
        for(i=0; i<tasks.length; i++){
            if(tasks[i].name == e.target.parentElement.childNodes[1].innerHTML){
                tasks[i].state = false;
                tasks.unshift(...tasks.splice(i, 1));
                createTask(tasks);
                recordToStorage(tasks)
            }
        }
        for(i=0; i<tasks.length; i++){
            if(!tasks[i].state){
                inputCheckbox.checked = false;
            }}
    }       
}
function deleteTask(e){
    for(i=0; i<tasks.length; i++){
        if(tasks[i].name == e.currentTarget.childNodes[1].innerHTML){
            if(e.target.closest('button')){
                tasks.splice(i, 1);
                recordToStorage(tasks)
                createTask(tasks);
                filterTasks();
            }
            
        }
    }  

}

function filterTasks(){
    tasksNotCompleted = tasks.filter(task=>!task.state);
    tasksCompleted = tasks.filter(task=>task.state);

    itemsAll.innerHTML = `${tasks.length}`;
    itemsComplet.innerHTML = `${tasksCompleted.length}`;
}

function handlerSubmit(event){
    event.preventDefault();
    if(inputText.value){
        const task = new Task(inputText.value, false);
        tasks.unshift(task);      
        recordToStorage(tasks);
        createTask(tasks);
        inputText.value = '';
    }
}

function createTask(arr){
    todoList.innerHTML='';
    
    for(i=0; i<arr.length; i++){
        const task = document.createElement('li');
        todoList.appendChild(task);
        task.classList.add('task');

        const inputCheck = document.createElement('input');
        inputCheck.type = 'checkbox';
        task.appendChild(inputCheck);

        const taskText = document.createElement('span');
        task.appendChild(taskText);
        taskText.innerHTML = `${arr[i].name}`;

        const btnDelete = document.createElement('button');
        const imgCross = document.createElement('img');
        imgCross.classList.add('cross');
        imgCross.src = "cross.png";
        btnDelete.appendChild(imgCross);
        btnDelete.classList.add('delBtn');
        task.appendChild(btnDelete);

        if(arr[i].state){
            task.classList.add('checked');
            taskText.style = "text-decoration: line-through";
            inputCheck.checked = true;
        }

        inputCheck.addEventListener('change', taskChange);
        task.addEventListener('click', deleteTask);
        inputCheckbox.addEventListener('change', changeAllTasks);

        filterTasks();
    }
    
}

function recordToStorage(data){
    localStorage.setItem('tasks', JSON.stringify(data))
}

createTask(tasks)




