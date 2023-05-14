var dx = 2, dy = -2;       /* displacement at every dt */
var x, y;         /* ball location */
var score = 0;    /* # of walls you have cleaned */
var tries = 0;    /* # of tries to clean the wall */
var started = false;  /* false means ready to kick the ball */
var ball, court, paddle, brick, msg;
var court_height, court_width, paddle_left;
let dt;
var bricks = new Array(4);  // rows of bricks
var colors = ["red","blue","yellow","green"];
var level = document.getElementById("level")
var x1,y1;

// get an element by id
function id ( s ) { return document.getElementById(s); }

// convert a string with px to an integer, eg "30px" -> 30 */
function pixels ( pix ) {
    pix = pix.replace("px", "");
    num = Number(pix);
    //console.log(num);
    return num;
}

function drawBall(){
    ball.style.left = x+"px";
    ball.style.top = y+"px";
}

//  place the ball on top of the paddle 
function readyToKick () {
    x = pixels(paddle.style.left)+paddle.width/2.0-ball.width/2.0;
    y = pixels(paddle.style.top)-2*ball.height;
    // x1 = x
     y1 = y
    drawBall()
}



// paddle follows the mouse movement left-right 
function movePaddle (e) {
    var ox = e.pageX-court.getBoundingClientRect().left;
    paddle.style.left = (ox < 0) ? "0px"
                            : ((ox > court_width-paddle.width)
                               ? court_width-paddle.width+"px"
                               : ox+"px");
    if (!started)
        readyToKick();
    paddle_left = paddle.style.left

}

function initialize () {
    court = id("court");
    ball = id("ball");
    paddle = id("paddle");
    wall = id("wall");
    msg = id("messages");
    brick = id("red");
    court_height = pixels(court.style.height);
    court_width = pixels(court.style.width);
    for (i=0; i<4; i++) {
        // each row has 20 bricks
        bricks[i] = new Array(20);
        var b = id(colors[i]);
        for (j=0; j<20; j++) {
            var x = b.cloneNode(true);
            bricks[i][j] = x;
            wall.appendChild(x);
        }
        b.style.visibility = "hidden";
    }
    started = false;
 }

// true if the ball at (x,y) hits the brick[i][j] 
function hits_a_brick ( x, y, i, j ) {
    var top = i*brick.height - 450;
    var left = j*brick.width;
    return (x >= left && x <= left+brick.width
            && y >= top && y <= top+brick.height);
}

document.addEventListener("onclick", moveBall)

function moveBall() {
    x -= dx
    y += dy
    // console.log("x",  x)
    // console.log("y",  y)

    started = true;
    drawBall()
    collision(x , y , court_height=-480, court_width= 790)

}

function collision(x , y , court_height, court_width){
    for(i=0;i<=4;i++){
        for(j=0;j<=20;j++){
            hit = hits_a_brick(x, y, i, j)
            // if(hit == true){
            // }
            // console.log(hit);
        }
    }
    
    
    x1 = pixels(paddle.style.left)+paddle.width/2.0-ball.width/2.0;
    // console.log(x1,y1);

    if (x >= x1- 39 && x <= x1+50 && y == y1){
        dy = -dy
    }

    if (x >= court_width ||  y <= court_height || x<=0){
        deflect()
    }

 
    // console.log(y)
    if (y >= -29 ){
         console.log(y)
        //deflect()
        tries ++
        x=x1,y=y1
        // clearInterval(dt)
        document.removeEventListener('click', moveBall)
        return
        
    }

}
// console.log(dx)
// console.log(dy)

function deflect(){

    // console.log("dx",  dx,"dy", dy)
    if (dx === 2 && dy === 2){
        dy = -2
        return
    }
    if (dx === 2 && dy === -2){
        dx = -2
        return
    }
    if (dx === 2 && dy === -2){
        dy = +2
        return
    }
    if (dx === -2 && dy === -2){
        dy = +2
        return
    }
    if (dx === -2 && dy === 2){
        dx = +2 
        return
        
    }
    if (dx === -2 && dy === 2){
        dy = -2 
        return
    }

}

function startGame () {
    // document.addEventListener("onclick", moveBall)
    if (level === 1){
        dt = window.setInterval(moveBall, 10)
    }
    else if (level === 2){
        dt = window.setInterval(moveBall, 20)
    }
    else if (level === 3){
        dt = window.setInterval(moveBall, 30)
    }
    else {
        dt = window.setInterval(moveBall, 40)
    }

}


