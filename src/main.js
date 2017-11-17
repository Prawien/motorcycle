//Canvas
let canvas = document.getElementById('canvas');
let ctx;

//Drawing variables
let curX = 0;
let curY = 0;

function initCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  middleX = canvas.width / 2;
  middleY = canvas.height / 2;
  ctx = canvas.getContext('2d');

  drawMotorcycle();
}

function drawMotorcycle() {
  drawHull();
  drawFrontWheel();
}

//Draw methods
function drawHull(){
  // Hull
  ctx.beginPath();
  move(middleX-100, middleY);
  //Wheelcover(back)
  line(175, 0);
  line(0, -25);
  line(75, -50);
  line(-15, -5);
  line(-75, 15);
  //Tail
  line(5, -20);
  line(125, -50);
  line(-125, -5);
  line(-10, 25);
  //Seat
  line(-70, 5);
  line(-30, -30);
  line(-70, 5);
  line(-25, 15);
  //Front
  line(-10, 0);
  line(25, -50);
  line(-20, 5);
  line(-75, 100);
  //Wheelcover(front)
  line(50, 0);
  line(70, 65);
  ctx.closePath();

  ctx.fillStyle = 'purple';
  ctx.fill();
  ctx.stroke();
}

function drawFrontWheel(){
  //Connection to Hull
  ctx.beginPath();
  move(-37, -35);
  line(-50, 45);
  line(-5, -5);
  line(50, -45);
  ctx.closePath();
  ctx.stroke();

  //Wheel
  ctx.beginPath();
  move(-50, 45);
  ctx.arc(curX, curY, 60, 0, 2*Math.PI);
  ctx.stroke();

}

//Functional methods
function move(x, y){
  curX += x;
  curY += y;
  ctx.moveTo(curX, curY);
}

function line(x, y){
  curX += x;
  curY += y;
  ctx.lineTo(curX, curY);
}

//Method calls
initCanvas();