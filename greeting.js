const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

// 중복되는 상수를 따로 선언한다.
const USER_LS = "currentUser";
const SHOWING_CN = "showing";

// 이름을 저장하는 함수
function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

// form태그의 이벤트리스너 함수
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

// showing태그를 생성하고, 이벤트리스너를 생성한다.
function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

// form태그를 지우고, Hello ~ 문구를 출력한다.
function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}
// LocalStorage에 이름이 있으면, 이름을 불러온다.
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
      askForName();
    } else {
      paintGreeting(currentUser);
    }
}
// initializer 
function init(){
    loadName();
}

init();

init();
