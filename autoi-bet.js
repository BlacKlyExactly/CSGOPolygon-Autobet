const betInput = document.querySelector("#roulette_amount");

const balls = document.querySelector(
  "#select_roulette > div.rolling > div.jackpot > ul"
);

const betRedButton = document.querySelector(
  "#select_roulette > div.rounds > div.round.round_red > div.round_button > div > ul > li:nth-child(1) > span"
);

const betGreenButton = document.querySelector(
  "#select_roulette > div.rounds > div.round.round_green > div.round_button > button"
);

const betBlackButton = document.querySelector(
  "#select_roulette > div.rounds > div.round.round_black > div.round_button > div > ul > li:nth-child(1) > span"
);

const panel = document.querySelector(".leftSide");

document.querySelector(".games")?.remove();

const scriptStates = {
  [true]: "<span class='on auto-bet__state'>ON</span>",
  [false]: "<span class='off auto-bet__state'>OFF</span>",
};

const colors = {
  dark: "<span class='auto-bet__last-color dark'>Czarny</span>",
  red: "<span class='auto-bet__last-color red'>Czerwony</span>",
  green: "<span class='auto-bet__last-color green'>Zielony</span>",
};

const panelHTML = `
    <style>
        button{
            height: 40px;
            width: 46%;
            margin-right: 10px;
            background: none;
            font-weight: 500;
            font-size: 16px;
            padding: 0 16px;
            cursor: pointer;
            transition: all .3s ease;
            border-radius: 10px;
            line-height: 36px;
            text-transform: uppercase;
        }

        .green_inline{
            border: 2px solid #7DC48A !important;
            color: #7DC48A;
        }

        .auto-bet{
            position: relative;
            background: #222225;
            padding: 30px;
            border-radius: 10px;
        }

        h2{
            width: 100%;
            color: white;
            font-size: 26px;
            text-transform: uppercase;
            position: relative;
            display: inline-block;
            margin: 0 0 40px 0;
        }

        .data{
            color: white;
            margin-bottom: 30px;
        }

        .data > p {
            margin-bottom: 15px;
        }

        .auto-bet__start-bet{
            font-weight: 700;
            color: white;
            margin-bottom: 30px;
        }

        .auto-bet__start-bet input{
            width: calc(100% - 30px);
            height: 38px;
            background: #2F2F34;
            border-radius: 10px;
            color: white;
            padding: 0 10px;
        }

        label{
            width: 100%;
        }

        .on{
          color: #7DC48A;
        }

        .off{
          color: #D4594C;
        }

        .dark{
          color: black;
        }

        .red{
          color: #D4594C;
        }

        .green{
          color: #7DC48A;
        }
    </style>
    <div class="auto-bet">
        <h2>Auto bet: ${scriptStates[false]}</h2>
        <div class="auto-bet__start-bet">
            <label>
                <p>Bet startowy</p> <br>
                <input type="number" class="auto-bet__start-bet-input">
            </label>
        </div>
        <div class="data">
            <p>Ostatni kolor: <span class="auto-bet__last-color">${
              colors[balls.lastChild.children[0].classList[0]]
            }</span></p>
            <p>Aktualny bet: <span class="auto-bet__current-bet"></span></p>
        </div>
        <button class="green_inline auto-bet__start">Start</button>
        <button class="red_inline auto-bet__stop">Stop</button>
    </div>
`;

panel.innerHTML = panelHTML + panel.innerHTML;

const startBetInput = document.querySelector(".auto-bet__start-bet-input");
const startButton = document.querySelector(".auto-bet__start");
const stopButton = document.querySelector(".auto-bet__stop");
const lastColorPanel = document.querySelector(".auto-bet__last-color");
const currentBetPanel = document.querySelector(".auto-bet__current-bet");
const state = document.querySelector(".auto-bet__state");

const betButtons = {
  red: betRedButton,
  dark: betBlackButton,
  green: betGreenButton,
};

let lastColor = balls.lastChild.children[0].classList[0];
let selectedColor = balls.lastChild.children[0].classList[0];
let bet = 10;
let isStarted = false;
let isRolling = false;
let beted = false;

const doBet = () => {
  if (!betInput || !isStarted) return;

  betInput.value = bet.toString();
  betButtons[selectedColor].click();
  beted = true;
};

const changeState = (newState) => {
  if (!startBetInput.value && newState) return;

  bet = parseInt(startBetInput.value) || "";

  isStarted = newState;
  state.innerHTML = scriptStates[newState];
  currentBetPanel.innerText = bet;

  startBetInput.value = "0";

  !isRolling && doBet();
};

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (!mutation.addedNodes.length) return;

    lastColor = mutation.addedNodes[0].childNodes[0].classList[0];
    lastColorPanel.innerHTML = colors[lastColor];

    if (lastColor !== selectedColor) {
      isStarted && beted && (bet *= 2);
      console.log(beted);
      currentBetPanel.innerText = bet;
    }

    isStarted && (selectedColor = lastColor);
    beted = false;

    setTimeout(() => doBet(), 2000);
  });
});

balls && observer.observe(balls, { childList: true });

startButton.addEventListener("click", () => changeState(true));
stopButton.addEventListener("click", () => changeState(false));

setTimeout(() => {
  const progress = document.querySelector(
    "#select_roulette > div.rolling > div.progress > span"
  );

  isRolling = progress.innerText === "***ROLLING***";
}, 100);
