const inputText = document.getElementById('input-text');
const inputCheckbox = document.getElementById('input-checkbox');
const form = document.querySelector('.main__form');
const todoList = document.querySelector('.todolist');
const itemsAll = document.getElementById('itemsAll');
const itemsComplet = document.getElementById('itemsComplet');
const btnAll = document.querySelector('.btn-all');
const btnActive = document.querySelector('.btn-active');
const btnCompleted= document.querySelector('.btn-completed');

const dataStorage = JSON.parse(localStorage.getItem('tasks'));
let tasks = [...dataStorage];

let tasksCompleted;
let tasksNotCompleted;

function Task(name, state){
    this.name = name;
    this.state = state;
}

form.addEventListener('submit', handlerSubmit);

btnAll.addEventListener('click', ()=>{
    createTask(tasks)
})

btnActive.addEventListener('click',()=>{
    createTask(tasksNotCompleted)
})

btnCompleted.addEventListener('click',()=>{
    createTask(tasksCompleted)
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
        if(tasks[i].name == e.target.parentElement.parentElement.childNodes[1].innerHTML){
            tasks.splice(i, 1);
            createTask(tasks);
            filterTasks();
            recordToStorage(tasks)
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
        btnDelete.addEventListener('click', deleteTask);
        inputCheckbox.addEventListener('change', changeAllTasks);

        filterTasks();
    }
    
}

function recordToStorage(data){
    localStorage.setItem('tasks', JSON.stringify(data))
}

createTask(tasks)
    



