const boxes =document.querySelectorAll('.box');
const gameInfo=document.querySelector(".game-info");
const newGamebtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions=[
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,6]
];

//lets create fn to initialise game
function inItGame(){
  currentPlayer="X";
  gameGrid=["","","","","","","","",""];
  boxes.forEach((box,index)=>{
    box.innerText="";
    boxes[index].style.pointerEvents='all';
    //initialise css again
    box.classList=`box box${index+1}`;
  });
  newGamebtn.classList.remove("active");
  gameInfo.innerText=`Current Player -${currentPlayer}`;

}

inItGame();

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;//ui
        gameGrid[index]=currentPlayer;//inner logic
        boxes[index].style.pointerEvents="none";
        //swap turn
        swapTurn();
        //check koi jeeta to ni
        checkGameOver();

    }
}

function swapTurn(){
    if(currentPlayer=="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    //UI Update
    gameInfo.innerText=`Current Player -${currentPlayer}`;
}

function checkGameOver(){
    let answer="";
    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]]!==""||gameGrid[position[1]]!==""||gameGrid[position[2]]!=="")&&(gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])){
            //check if winner is x
            if(gameGrid[position[0]]==="X"){
                answer="X";
            }
            else{
                answer="O";
            }
            //disable pointrt
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            //now we kno x||O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
          
        }
    })
    if(answer!==""){
        gameInfo.innerText=`Winner Player-${answer}`;
        newGamebtn.classList.add("active");
        return;
    }
    //when no winner
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!==0){
            fillCount++;
        }
    });
    if(fillCount==9){
        gameInfo.innerHTML="Game Tied";
        newGamebtn.classList.add('active');
    }
}

newGamebtn.addEventListener("click",inItGame);