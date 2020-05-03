const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList")

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event){
    //console.dir을 이용해서 부모노드 이름을 찾아볼수있음.
    //console.log(event.target.parentNode)
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    // filter는 array의 모든 아이탬을 통해 함수를 실행시키고, true인 아이템만을 가지고 새로운 array을 만듬
    const cleanToDos = toDos.filter(function(toDo){
        //li.id가 string이어서 int로 변환
        return toDo.id !== parseInt(li.id);
    });
    //toDos를 const로 정의하면 변경이 안되기 때문에, 변수정의를 let으로 바꿔줌.
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo)
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : toDos.length + 1
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        //console.log(loadedToDos)
        const parsedToDos = JSON.parse(loadedToDos)
        //console.log(parsedToDos)
        //function을 안에다가 넣을 수 있음. forEach는 array안 item들에게 함수를 각각 적용하는것
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();
