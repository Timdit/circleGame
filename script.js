const startBtn = document.querySelector('.start'),
    screens = document.querySelectorAll('.screen'),
    timeList = document.querySelector('.time-list'),
    timeEl = document.querySelector('#time'),
    board = document.querySelector('.board')



let time = 0,
    score = 0;

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up')
})


/* делегирование событий */
timeList.addEventListener('click', (e) => {
    // console.log(e.target.classList.contains('time-btn'));

    if (e.target.classList.contains('time-btn')) {
        screens[1].classList.add('up')
        let elAttr = e.target.getAttribute('data-time');
        // console.log(elAttr);
        time = Number(elAttr);
        startGame()
    }
})



function decreaseTime() {
    if (time === 0) {
        timeEl.parentNode.classList.add('hide')
        board.innerHTML = `Ваш счёт: ${score}`;
    } else {
        let currentTime = --time;

        if (currentTime < 10) {
            currentTime = `0${currentTime}`
        }

        timeEl.innerHTML = `00:${currentTime}`
    }
}

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle()
}


function createRandomCircle() {
    const circle = document.createElement('div')

    circle.classList.add('circle')

    circle.style = `
        width: 30px;
        height: 30px;
    `

    circle.style.top = `${randomNumber(0, 450)}px`;
    circle.style.right = `${randomNumber(0, 450)}px`;
    circle.style.background = randColor();

    board.appendChild(circle);
}


board.addEventListener('click', (e) => {
    if (e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createRandomCircle()
    }
})

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randColor() {
    let r = Math.floor(Math.random() * 256),
        g = Math.floor(Math.random() * 256),
        b = Math.floor(Math.random() * 256);
        return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}