import {HEIGHT, WIDTH, BOMB_COUNT} from './consts.js';

const boardElement = document.querySelector('main');
const displayBombsElement = document.querySelector('.bombs');
const displayStartBtnElement = document.querySelector('.start-btn');
const displayTimerElement = document.querySelector('.timer');
const gameOver = true;

function createGameView() {
    

    boardElement.innerHTML = '';
    displayBombsElement.innerHTML = BOMB_COUNT;
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

    const cells = [...boardElement.querySelectorAll('.field')];
    console.log(cells)
    const bombs = [...Array(cells.length).keys()]
    .sort(() => Math.random() - 0.5).slice(0, BOMB_COUNT);
    console.log(bombs)

    boardElement.addEventListener('click', (evt) => {
        if (!evt.target.classList.contains('field')) {
         return;
        }
        
        const index = cells.indexOf(evt.target);
        console.log(index)
        bombs.includes(index) ? evt.target.classList.add('bomb') : '';
    });

} 


createGameView();
displayStartBtnElement.addEventListener('click', createGameView);