import {HEIGHT, WIDTH, BOMB_COUNT} from './consts.js';

const boardElement = document.querySelector('main');
const displayBombsElement = document.querySelector('.bombs');
const startBtnElement = document.querySelector('.start-btn');
const displayTimerElement = document.querySelector('.timer');
const gameOver = true;
let bombs = [];
let cells = [];

let closedCellsCount = WIDTH * HEIGHT;

function startClickHandler() {
    boardElement.innerHTML = '';
    startBtnElement.classList.remove('win');
    displayBombsElement.innerHTML = BOMB_COUNT;
    for (let x = 0; x < WIDTH; x++) {
        let cellElement = document.createElement('div');
        cellElement.setAttribute('class', 'column');

        for (let y = 0; y < HEIGHT; y++) {
            let fieldElement = document.createElement('div');
            fieldElement.setAttribute('class', 'field');

            cellElement.append(fieldElement);
        }
        boardElement.append(cellElement);
    }

    cells = [...boardElement.querySelectorAll('.field')];
    bombs = [...Array(cells.length).keys()]
    .sort(() => Math.random() - 0.5).slice(0, BOMB_COUNT);

    boardElement.addEventListener('click', boardClickHandler);
    boardElement.addEventListener('mousedown', boardMousdownHandler);
    boardElement.addEventListener('mouseup', boardMousupHandler);

    function boardMousdownHandler(evt) {
        if (!evt.target.classList.contains('field')) {
            return;
           }
        startBtnElement.classList.add('amaze');
    }

    function boardMousupHandler(evt) {
        if (!evt.target.classList.contains('field')) {
            return;
           }
        startBtnElement.classList.remove('amaze');
    }

    function boardClickHandler(evt) {
        if (!evt.target.classList.contains('field')) {
         return;
        }
        
        const index = cells.indexOf(evt.target);
        const row = Math.floor(index / WIDTH)
        const column = index % WIDTH;
        openField(row, column);
    }
} 

function isBomb(row, column) {
    if(!isInMargin(row, column)) return;

    const index = row * WIDTH + column;
    return bombs.includes(index);
}

function isInMargin(row, column){
    return row >= 0 && row < HEIGHT
    && column >= 0 && column < WIDTH;
}

function openField(row, column) {
    if (!isInMargin(row, column)) return;

    const index = row * WIDTH + column;
    const cell = cells[index];

    if (cell.getAttribute('disabled') === 'disabled') return;

    cell.setAttribute('disabled', 'disabled');

    if (isBomb(row, column)) {
         cell.classList.add('bomb');
         startBtnElement.classList.add('loose');
         cells.forEach((cell) => cell.setAttribute('disabled', 'disabled'))
      } else {
        cell.classList.add(getBombsCount(row, column).class);
      }  

    closedCellsCount--;

    if (closedCellsCount <= BOMB_COUNT) {
        startBtnElement.classList.add('win');
        return;
    }

    const bombsCount = getBombsCount(row, column).count;

    if (bombsCount === 0) {
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
               openField(row + y, column + x);
            }
        }
        return;
    }
}

function getBombsCount(row, column) {
    let bombsCount = 0;
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            if (isBomb(row + y, column + x)) {
                bombsCount ++;
            }
        }
    }
    console.log(bombsCount)
    return {
        count: bombsCount,
        class: `count-${bombsCount}`,
    }
}

startClickHandler();
startBtnElement.addEventListener('click', startClickHandler);