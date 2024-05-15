//images  
let bg;
let fg;
let treasure;
//background cycle
let b1 =5;
let b2 = 1000;

//treasure
let t1x = -20;
let t1y;
let t2x = 600;
let t2y;
let left;
let right;
let txspeed;
let tyspeed;
let count = 0;
let angle;
//foreground cycle
let f1 =5;
let f2 = 1000;

let paddle;
let xpad = 200;

let xball = 250;
let yball = 32;
let xspeed = 0;
let yspeed = 0;
let lost = true;

var boing;
var collect;
var loss;

function preload() {
  bg = loadImage('images/background.png');
  clear = loadImage('images/clear.png');
  fg = loadImage('images/foreground.png');
  treasure = loadImage('images/treasureCoin.png');
  //boing = loadSound("sounds/boing.mp3");
  //collect = loadSound("sounds/collect.mp3");
  //loss = loadSound("sounds/loss.mp3");
}

function setup() {
  let canvas = createCanvas(displayWidth,displayHeight);
  canvas.id('canvas');
  canvas.class('hiddenFull');

  //buffer = createGraphics(width, height);

  angleMode(DEGREES);
}

function draw(){


//paddle
  fill(180);
  noStroke();
  paddle = rect(xpad,590,100,10);
  if(keyIsDown(65)&& xpad >=5){
    xpad -=3;
  }
  if(keyIsDown(68)&& xpad <=405){
    xpad +=3;
  }

//ball
   //color
   let r = map(xball, 0, 500, 0, 255);
   let g = map(yball, 0, 600, 0, 255);
   let b = map(xspeed, 0, 4, 0, 255);
   fill(r,g,b);

  //bounce + position
  ball = ellipse(xball,yball,50,50);
  xball += xspeed;
  if(xball <= 30 || xball >= 480){
    xspeed *= -1;
    xspeed *= 1.05;
    boing.play();
  }
  yball += yspeed;
  if(yball <= 30){
    yspeed *= -1;
    xspeed *= 1.05;
    boing.play();
  }
  if(yball >= 565 && xpad<=xball && xball<= (xpad+100)){
    boing.play();
    yspeed *= -1;
    xspeed *= 1.05;
    if(xpad<=xball && xball<= (xpad+50)){
      xspeed = map(xball, xpad, xpad+50, xspeed*2.5, xspeed*0.5);
    }else{
      xspeed = map(xball, xpad+50, xpad+100, xspeed*0.5, xspeed*2.5);
    }
  
  }
  if(yball > 640){
    //boing.stop();
    lost = true;
    loss.play();
    yball = 640;
    //yball = 700;

    if(lost == true){
      xball = 250;
      yball = 32;
      xspeed = 0;
      yspeed = 0;
    }
  }

  if(xspeed >= 7){
    xspeed = 7;
  }


  //treasure
  imageMode(CENTER)
  left = image(treasure, t1x, t1y);
  right = image(treasure, t2x, t2y);
  txspeed = random(3,5)

  t1x += txspeed;
  t2x -= txspeed;


  if(t1y>=600 || t1x>=550){
    t1y = random(100,400);
    t1x = -100;
  }
  if(t2y>=600 || t2x<=-70){
    t2y = random(100,400);
    t2x = 600;
  }
  //treasure collection and points
  var distT1 = dist(t1x, t1y, xball, yball);
  var distT2 = dist(t2x, t2y, xball, yball);

  if(distT1<50){
    t1y = random(100,400);
    t1x = -100;
    count += 1;
    collect.play();
  }
  if(distT2<50){
    t2y = random(100,400);
    t2x = 600;
    count += 1;
    collect.play();
  }
  console.log(count);



  fill(255);
  text("Points: " + count, 20, 30);

  //borders
  stroke(180);
  strokeWeight(10);
  line(0,0,0,600);
  line(0,0,510,0);
  line(510,0,510,600);

}
function mousePressed(){
  if(lost==true){
    boing.stop();
    lost = false;

    xspeed = random(1,3);
    yspeed = random(1,3);

    t1x = -100;
    t2x = 600;
    t1y = random(100,400);
    t2y = random(100,400);
    txspeed = 1;
    count = 0;

  }
}
