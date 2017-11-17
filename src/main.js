//Canvas
let canvas = document.getElementById('canvas');
let ctx;

//Drawing variables
let currentX = 0;
let currentY = 0;

function initCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  middleX = canvas.width / 2;
  middleY = canvas.height / 2;
  ctx = canvas.getContext('2d');

  drawMotorcycle();
}

function drawMotorcycle() {
  // Hull
  move(middleX-100, middleY);
  ctx.beginPath();
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
  line(50, 20);
  line(20, 45);
  ctx.closePath();

  ctx.fillStyle = 'purple';
  ctx.fill();

  ctx.stroke();

  // Front wheel
  //ctx.arc(canvas.x, canvas.y, 50, 0, 2*Math.PI);
  //ctx.stroke();
}

//Draw methods

//Functional methods
function move(x, y){
  currentX = x;
  currentY = y;
  ctx.moveTo(currentX, currentY);
}

function line(x, y){
  currentX += x;
  currentY += y;
  ctx.lineTo(currentX, currentY);
}

//Method calls
initCanvas();