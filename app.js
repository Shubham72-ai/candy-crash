// this event listnere will ensure that after the loading the html this will create the DOM
document.addEventListener('DOMContentLoaded', () => {

const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
const width = 8;
const squres = [];
const candyColor = ['red','blue','green','yellow','orange','violet']
let score = 0;
// we need to create the board

const createBoard = () =>{
    for(let i= 0;i<width*width; i++){

        const squre = document.createElement('div'); // create element
       
        let randColor = Math.floor(Math.random() * candyColor.length);

        squre.style.backgroundColor = candyColor[randColor];

        squre.setAttribute('draggable', true);

        squre.setAttribute('id',i);

        grid.appendChild(squre); // pussing it inside the grid div

        squres.push(squre);
    }
}


createBoard();


// drag the candys 
let colorBeingDragged ;
let colorBeingReplaced;
let squireIdBeingDragged;
let squireIdBeingReplaced;



squres.forEach(squre => squre.addEventListener('dragstart',dragStart))
squres.forEach(squre => squre.addEventListener('dragend',dragEnd))
squres.forEach(squre => squre.addEventListener('dragover',dragOver))
squres.forEach(squre => squre.addEventListener('dragenter',dragEnter))
squres.forEach(squre => squre.addEventListener('dragleave',dragLeave))
squres.forEach(squre => squre.addEventListener('drop',dragDrop))




function dragStart(){
    console.log('dragging');
    console.log(this.id);
    colorBeingDragged = this.style.backgroundColor;
    squireIdBeingDragged = parseInt(this.id);

}


function dragOver(e){
    e.preventDefault();
    // console.log('dragging over');
    // console.log(this.id);
}

function dragEnter (e){
    // console.log('dragging enter');
    // console.log(this.id);
    e.preventDefault();
}

function dragLeave(){
    // console.log('dragging leave');
    // console.log(this.id);

}


function dragDrop() {
    console.log('dragged drop');
    colorBeingReplaced = this.style.backgroundColor;
    squireIdBeingReplaced = parseInt(this.id) ;
    this.style.backgroundColor = colorBeingDragged;
    squres[squireIdBeingDragged].style.backgroundColor = colorBeingReplaced;

}


function dragEnd() {
    // this is the game logic
    console.log('dragging end',squireIdBeingReplaced);
    // here i have to put the valid moves
    let validMoves =  [squireIdBeingDragged -1, 
        squireIdBeingDragged -width, 
        squireIdBeingDragged +1,
        squireIdBeingDragged +width];
    
    validMoves = validMoves.includes(squireIdBeingReplaced);
    
   

    if(squireIdBeingReplaced && validMoves) {
       // console.log('valid move')
        squireIdBeingReplaced = null;
    } else if(squireIdBeingReplaced && !validMoves) {
        
        //console.log('else if valid move')

        squres[squireIdBeingDragged].style.backgroundColor = colorBeingDragged;
        squres[squireIdBeingReplaced].style.backgroundColor = colorBeingReplaced;

    }else {
        //console.log('else valid move')

        squres[squireIdBeingDragged].style.backgroundColor = colorBeingDragged;
    }

    //*************checkRowForThree()

}

// check for matches


// drop candies ones some have been cleared
function moveDown() {
    for(let i =0; i<55; i++){
        if(squres[i + width].style.backgroundColor === ''){
            squres[i + width].style.backgroundColor = squres[i].style.backgroundColor;
            squres[i].style.backgroundColor = '';
            const firstRow = [0,1,2,3,4,5,6,7];
            const isFirstRow = firstRow.includes(i);

            if(isFirstRow && squres[i].style.backgroundColor === ''){
                let randColor = Math.floor(Math.random() * candyColor.length);
                squres[i].style.backgroundColor = candyColor[randColor];
            }
        }
    }
}

moveDown()

// check  4row matches
function checkRowForFour() {
    for(let i=0; i<60; i++){
        let rowOfFour = [i, i+1, i+2, i+3];
        let decidedColor = squres[i].style.backgroundColor;
        const isBlank =  squres[i].style.backgroundColor === '';
        const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,38,37,39,45,46,47,53,54,55]

        if(notValid.includes(i)) continue;

        if(rowOfFour.every(index => squres[index].style.backgroundColor === decidedColor && !isBlank)){
            score +=4;
            scoreDisplay.innerHTML = score;
            rowOfFour.forEach(index => {
                squres[index].style.backgroundColor = '';
            })
        }
    }
}




// check for 4columns
function checkColumnsForFour() {
    for(let i=0; i<47; i++){
        let columsOfFour = [i, i+width, i+width*2, i+width*3];
        let decidedColor = squres[i].style.backgroundColor;
        const isBlank =  squres[i].style.backgroundColor === '';

        if(columsOfFour.every(index => squres[index].style.backgroundColor === decidedColor && !isBlank)){
            score +=3;
            scoreDisplay.innerHTML = score;
            columsOfFour.forEach(index => {
                squres[index].style.backgroundColor = '';
            })
        }
    }
}





// check  3row matches
function checkRowForThree() {
    for(let i=0; i<61; i++){
        let rowOfThree = [i, i+1, i+2];
        let decidedColor = squres[i].style.backgroundColor;
        const isBlank =  squres[i].style.backgroundColor === '';
        const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]

        if(notValid.includes(i)) continue;

        if(rowOfThree.every(index => squres[index].style.backgroundColor === decidedColor && !isBlank)){
            score +=3;
            scoreDisplay.innerHTML = score;

            rowOfThree.forEach(index => {
                squres[index].style.backgroundColor = '';
            })
        }
    }
}




// check for 3columns
function checkColumnsForThree() {
    for(let i=0; i<47; i++){
        let columsOfThree = [i, i+width, i+width*2];
        let decidedColor = squres[i].style.backgroundColor;
        const isBlank =  squres[i].style.backgroundColor === '';

        if(columsOfThree.every(index => squres[index].style.backgroundColor === decidedColor && !isBlank)){
            score +=3;
            scoreDisplay.innerHTML = score;

            columsOfThree.forEach(index => {
                squres[index].style.backgroundColor = '';
            })
        }
    }
}

checkRowForFour()
checkColumnsForFour()
checkRowForThree()
checkColumnsForThree()


window.setInterval(function(){
    checkRowForFour()
    checkColumnsForFour()
    checkRowForThree()
    checkColumnsForThree()
    moveDown()
},100)



















});