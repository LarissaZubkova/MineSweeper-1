import {HEIGHT, WIDTH, BOMB_COUNT} from './consts.js';

const boardElement = document.querySelector('main');
console.log(boardElement)
const displayMinesElement = document.querySelector('.mines');
const displayStartBtnElement = document.querySelector('.start-btn');
const displayTimerElement = document.querySelector('.timer');

const createGameView = () => {
    boardElement.innerHTML = '';
    displayMinesElement.innerHTML = BOMB_COUNT;
    for (let x = 0; x < WIDTH; x++) {
        let cellElement = document.createElement('div');
        cellElement.setAttribute('class', 'cell');

        for (let y = 0; y < HEIGHT; y++) {
            let fieldElement = document.createElement('div');
            fieldElement.setAttribute('id', x+'_'+y);
            fieldElement.setAttribute('class', 'field');

            cellElement.append(fieldElement);
        }
        boardElement.append(cellElement);
    }
} 
createGameView();
displayStartBtnElement.addEventListener('click', createGameView);