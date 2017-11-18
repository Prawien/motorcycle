//Canvas
let canvas = document.getElementById('canvas');
let ctx;
const TWO_PI = Math.PI * 2;

let time = 0;
const timeStep = (1/60);
let motor1;
let wheel1;
let wheel2;

//Main functions
function initCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  middleX = canvas.width / 2;
  middleY = canvas.height / 2;
  ctx = canvas.getContext('2d');

  motor1 = new Motorcycle(middleX, middleY);
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
  motor1.draw();
  //wheel1.update();
  //wheel2.update();
}

//Classes
class Motorcycle {
  constructor(x, y){
    this.oriX = x;
    this.oriY = y;
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
    wheel1 = new Wheel(this.x-90, this.y+7, 60);
    wheel2 = new Wheel(this.x+250, this.y+7, 60);
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
    wheel1.update();
    wheel2.update();
    
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

    this.reset();
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
  reset(){
    this.x = this.oriX;
    this.y = this.oriY;
  }
}

class Wheel {
  constructor(x, y, r){
    this.x = x;
    this.y = y;
    this.r = r;

    this.dotX = x;
    this.dotY = y;
    this.dotR = 5;
    this.angle = 0;
    this.speed = 2;

    this.delayX = 0;
    this.delayY = 0;

    this.draw();
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, TWO_PI);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.dotX, this.dotY, this.dotR, 0, TWO_PI);
    ctx.arc(this.delayX, this.delayY, this.dotR, 0, TWO_PI);
    ctx.fillStyle = 'lightgreen';
    ctx.fill();
  }
  update(){
    this.angle -= this.speed;
    this.dotX = (this.r - this.dotR*4) * Math.cos(this.angle * Math.PI / 180) + this.x;
    this.dotY = (this.r - this.dotR*4) * Math.sin(this.angle * Math.PI / 180) + this.y;
    this.delayX = (this.r - this.dotR*4) * Math.cos(this.angle-2 * Math.PI / 180) + this.x;
    this.delayY = (this.r - this.dotR*4) * Math.sin(this.angle-2 * Math.PI / 180) + this.y;
    this.draw();
  }
  line(x, y){
    this.x += x;
    this.y += y;
    ctx.lineTo(this.x, this.y);
  }
}
