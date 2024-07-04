let inputDir = {x:0,y:0};
const foodSound = new Audio('../music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3')
const moveSound = new Audio('../music/move.mp3')
const backmusicSound = new Audio('../music/music.mp3')

lastPintTime = 0;
let snakearr = [
    {x:13,y:15}
]
let food = {x:6,y:7}
let score = 0;

let speed = 5;


function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPintTime)/1000 < 1/speed){
        return;
    }
    lastPintTime = ctime;
    gameEngine();
    
}

function isCollide(snake){
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }       
    }

    if(snake[0].x>=18 || snake[0].x <= 0 || snake[0].y>=18 || snake[0].y <= 0){
        return true;
    }

}

function gameEngine(){
    backmusicSound.play()

    if(isCollide(snakearr)){
        gameOverSound.play();
        backmusicSound.pause();
        inputDir = {x:0,y:1}
        alert("Game Over , Press any key to restart !");
        snakearr = [{x:13,y:15}]
        backmusicSound.play()
        score = 0 ;

    }

    if(snakearr[0].y===food.y && snakearr[0].x === food.x){
        foodSound.play()
        snakearr.unshift({x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y});
        score +=1;
        scoreBox.innerHTML = "Score: " + score;
        let a = 2;
        let b = 16; 
        food = {x:Math.round(a + (b-a)*Math.random()),y:Math.round(a + (b-a)*Math.random())}
    }

    for (let i = snakearr.length-2; i >=0; i--) {
        snakearr[i+1]={...snakearr[i]};
        
    }
    snakearr[0].x += inputDir.x
    snakearr[0].y += inputDir.y
 

    board.innerHTML = "";
    snakearr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if(index===0){
            snakeElement.classList.add('head')
        }else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:1}
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break
        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
});

