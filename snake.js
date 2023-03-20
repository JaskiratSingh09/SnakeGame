let inputdir = { x: 0, y: 0 };
const foodsound = new Audio('food.mp3');
const gameoversound = new Audio('gameover.mp3');
const movesound = new Audio('move.mp3');
const musicsound = new Audio('music.mp3');
let lastptime = 0;
let speed = 8;
let score=0;
let snakeArr = [
    { x: 13, y: 15 }
];
let food = { x: 5, y: 5 };

//Game Function-2;

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastptime) / 1000 < 1 / speed) {
        return;
    }
    lastptime = ctime;
    gameEngine();
}

//game Ending Condition
function colide(snake){
    //colide with itself 
    for(let i=1;snake.length>i;i++){
        if(snake[i].x==snake[0].x && snake[i].y==snake[0].y)
        return true;
    }
    //collide into  wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)
       return true;
}


//main 
function gameEngine() {
    board = document.getElementById('board');
    //When Snake Crash
    if (colide(snakeArr)){ 
        gameoversound.play()
        musicsound.pause();
        inputdir={x:0,y:0};
        score=0;
        temp.innerHTML="Score:"+score;
        alert("Enter Any key to start");
        snakeArr=[{x:13,y:15}];
        musicsound.play();
    }

//When Snake Eat
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        score++;
        temp.innerHTML="Score:"+score;
        foodsound.play();
        snakeArr.unshift({x:snakeArr[0].x+inputdir.x,y:snakeArr[0].y+inputdir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }

    //Moving a snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputdir.x;
    snakeArr[0].y += inputdir.y;

    //displaying Snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0)
            snakeElement.classList.add('head');
        else if(index==snakeArr.length-1)
            snakeElement.classList.add('b');
        else
            snakeElement.classList.add('bb');
         board.appendChild(snakeElement);

    })
    //displaying the food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}
//Event Listner
window.addEventListener("keydown", e => {
    inputdir = { x: 0, y: 1};
    movesound.play();
    switch(e.key){
        case "ArrowUp":
            inputdir.x=0;
            inputdir.y=-1;
            break;
        case "ArrowDown":
            inputdir.x=0;
            inputdir.y=1;
            break;
        case "ArrowLeft":
            inputdir.x=-1;
            inputdir.y=0;
            break;
        case "ArrowRight":
            inputdir.x=1;
            inputdir.y=0;
            break;
        default:
            break;
          
        }
})
window.requestAnimationFrame(main);