const container = document.querySelector('#container');
const menuButton = document.querySelector('.main_menu svg');
const menuDisplay = document.querySelector('.menu_display');
const closeBtn = document.querySelector('.closeBtn');
const head = document.querySelector('head');
const darkMode = document.querySelector('.dark_mode');
const levelUpDisplay = document.querySelector('#levelUp');
const btnLevelOk = document.querySelector('.levelUpOk');
const expTotalDisplay = document.querySelector('.expTotalDisplay');

menuButton.addEventListener('click', () => {
    if (!menuDisplay.classList.contains('view')) {
        menuDisplay.classList.add('view')
    } else {
        menuDisplay.classList.remove('view')
    }
})

closeBtn.addEventListener('click', () => {
    menuDisplay.classList.add('view')
})

darkMode.addEventListener('click', (e) => {
    if (!darkMode.classList.contains('op')) {
        darkMode.classList.add('op')
        head.innerHTML += `
        <style>
            :root{
                --green-pattern: #4CD62B;
                --body-back: #181818; 
                --purple-light: #5965E0;
                --purple-dark: #5965E0;
                --red: #e70c30;
                --black: #f2f2f2;
                --gray-light: #d9d9d9d9;
                --gray-dark: #4b4b4b;
                --gray-display: #e1e1e1e1;
                --white: #fff;
                --box-shadow-1: 0px 5px 10px 1px rgba(0, 0, 0, .3);
                --box-shadow-2: 0px 5px 15px 1px rgba(255, 255, 255, .3);
            }
        </style>
        `
    } else {
        darkMode.classList.remove('op')
        head.innerHTML += `
        <style>
            :root{
                --green-pattern: #4CD62B;
                --body-back: #fff; 
                --purple-light: #5965E0;
                --purple-dark: #27308f;
                --red: #e70c30;
                --black: #181818;
                --gray-light: #d9d9d9d9;
                --gray-dark: #777777;
                --gray-display: #e1e1e1e1;
                --white: #fff;
                --box-shadow-1: 0px 5px 10px 1px rgba(0, 0, 0, .3);
                --box-shadow-2: 0px 5px 15px 1px rgba(0, 0, 0, .3);
            }
        </style>
    `
    }
    e.preventDefault();
})

btnLevelOk.addEventListener('click', (e) => {
    if (!levelUpDisplay.classList.contains('view')) {
        levelUpDisplay.classList.add('view')
    }
    e.preventDefault()
})

const time = document.querySelector('.timerHero');
const init = document.querySelector('#init');
const initBtn = document.querySelector('#init a');

const pontsDisplay = document.querySelector('.ponts');

function timer() {
    let ponts = 0;
    let pontsAux;
    let timer;
    let expTotal = 0;
    const minut = (25) - 1;
    const second = 60;

    if(typeof minut == 'number'){
        if(minut < 10) time.innerText = `0${minut + 1}:00`
        else if(minut>10) time.innerText = `${minut+1}:00`
        else time.innerText = `${minut + 1}:00`;
    }else time.innerHTML = '--:--';

    if (minut < 10) { time.innerText = `0${minut + 1}:00` }

    async function goTime() {
        let seconds = second;
        let minuts = minut;

        timer = setInterval(async () => {
            if (minuts !== -1) {
                seconds--;
                if (seconds === 0) {
                    minuts--;
                    seconds = second - 1 // 60 for 59
                }// if seconds == 0

                if (seconds < 10 & minuts < 10) {
                    time.innerText = `0${minuts}:0${seconds}`
                }
                else if (seconds < 10) { time.innerText = `${minuts}:0${seconds}` }
                else if (minuts < 10) { time.innerText = `0${minuts}:${seconds}` }
                else time.innerText = `${minuts}:${seconds}`;
                container.classList.remove('hide')
            } else {
                time.innerText = `00:00`;
                levelUpDisplay.classList.remove('view')
                let audio = new Audio('../mp3/ping.mp3')
                audio.play();
                ponts += 20;
                expTotal = ponts
                expTotalDisplay.innerText = `Exp. total : ${expTotal}xp`;

                if(ponts === 100){
                    pontsAux = 100
                    ponts = 0;
                }
                //
                console.log(ponts+'  '+pontsAux)
                pontsDisplay.style.width = `${ponts}%`
                //
                clearInterval(timer)
            }// if minuts !== 0
        }, 1000)

        if(pontsAux === 100){
            pontsAux = 0; 
            pontsDisplay.style.width = `${0}%`
        }
    }

    init.addEventListener('click', (e) => {
        if (!init.classList.contains('pause')) {
            init.classList.add('pause')
            initBtn.innerText = 'Reniciar tarefa'
            clearInterval(timer);
            goTime()
        } else {
            validate = false
            clearInterval(timer);
            init.classList.remove('pause')
            initBtn.innerText = 'Iniciar tarefa'
            if (minut < 10) time.innerText = `0${minut + 1}:00`
            else time.innerText = `${minut + 1}:00`
            return;
        }
        e.preventDefault();
    })
}
timer();