//Canvas
let canvas = document.getElementById('canvas');
let ctx;
const TWO_PI = Math.PI * 2;

let time = 0;
const timeStep = (1/60);
let wheel1;
let wheel2;

//Main functions
function initCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  middleX = canvas.width / 2;
  middleY = canvas.height / 2;
  ctx = canvas.getContext('2d');

  new Motorcycle(middleX, middleY);
}

window.requestAnimFrame = (function(){ 
  return  window.requestAnimationFrame   ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function(callback){
      window.setTimeout(callback, 1000);
    };
})();

window.onload = function(){
  initCanvas();
  loop();
}

function loop(){
  update();
  time += timeStep;
  requestAnimFrame(loop);
}

function update(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  wheel1.update();
  //wheel2.update();
}

//Classes
class Motorcycle {
  constructor(x, y){
    this.x = x;
    this.y = y;

    this.hullLines = [
      //Wheelcover(back)
      [175, 0],
      [0, -25],
      [75, -50],
      [-15, -5],
      [-75, 15],
      //Tail
      [5, -20],
      [125, -50],
      [-125, -5],
      [-10, 25],
      //Seat
      [-70, 5],
      [-30, -30],
      [-70, 5],
      [-25, 15],
      //Front
      [-10, 0],
      [25, -50],
      [-20, 5],
      [-75, 100],
      //Wheelcover(front)
      [50, 0],
      [70, 65],
    ];
    this.wheelcon1 = [
      [-50, 45],
      [-5, -5],
      [50, -45]
    ]

    this.draw();
  }

  draw(){
    // Hull
    ctx.beginPath();
    for(let i = 0;i < this.hullLines.length;i++){
      this.line(this.hullLines[i][0], this.hullLines[i][1]);
    }
    ctx.closePath();
    ctx.fillStyle = 'purple';
    ctx.fill();
    ctx.stroke();

    //Connection to Hull 1
    ctx.beginPath();
    this.move(-37, -35);
    this.line(-50, 45);
    this.line(-5, -5);
    this.line(50, -45);
    ctx.closePath();
    ctx.fillStyle = 'gray';
    ctx.fill();
    ctx.stroke();
    //Wheel 1
    ctx.beginPath();
    this.move(-48, 47);
    wheel1 = new Wheel(this.x, this.y, 60);
    
    //Connection to Hull 2
    ctx.beginPath();
    this.move(295, -52);
    this.line(50, 45);
    this.line(-5, 5);
    this.line(-50, -45);
    ctx.closePath();
    ctx.fillStyle = 'gray';
    ctx.fill();
    ctx.stroke();
  };
  move(x, y){
    this.x += x;
    this.y += y;
    ctx.moveTo(this.x, this.y);
  };
  line(x, y){
    this.x += x;
    this.y += y;
    ctx.lineTo(this.x, this.y);
  };
}

class Wheel {
  constructor(x, y, r){
    this.x = x;
    this.y = y;
    this.r = r;
    this.draw(x, y, r);
  }
  draw(x = this.x, y = this.y, r = this.r, step = 0){
    //1
    ctx.beginPath();
    ctx.arc(x, y, r, 0, (TWO_PI/6)+step);
    this.line(0, 0);
    ctx.closePath();
    ctx.stroke();
    //2
    ctx.beginPath();
    ctx.arc(x, y, r, 0, ((TWO_PI/6)*2)+step);
    this.line(0, 0);
    ctx.closePath();
    ctx.stroke();
    //3
    ctx.beginPath();
    ctx.arc(x, y, r, 0, ((TWO_PI/6)*3)+step);
    this.line(0, 0);
    ctx.closePath();
    ctx.stroke();
    //4
    ctx.beginPath();
    ctx.arc(x, y, r, 0, ((TWO_PI/6)*4)+step);
    this.line(0, 0);
    ctx.closePath();
    ctx.stroke();
    //5
    ctx.beginPath();
    ctx.arc(x, y, r, 0, ((TWO_PI/6)*5)+step);
    this.line(0, 0);
    ctx.closePath();
    ctx.stroke();
    //6
    ctx.beginPath();
    ctx.arc(x, y, r, 0, (TWO_PI+step));
    this.line(0, 0);
    ctx.closePath();
    ctx.stroke();
  }
  update(){
    this.draw(this.x, this.y, this.r, time);
  }
  line(x, y){
    this.x += x;
    this.y += y;
    ctx.lineTo(this.x, this.y);
  }
}
