const clockContainer = document.querySelector(".js-clock"), 
    clockTitle = clockContainer.querySelector("h1")

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    // 시간을 보여주되, 시간, 분, 초가 10보다 작으면 앞에 0을 붙여서 보여주기
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds}`;
}

function init(){
    getTime();
    //1초마다 현재시간 나오게해주기 1000 ==> 1초
    setInterval(getTime, 1000);
}

init()
