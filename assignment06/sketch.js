//used code from simple color matching in the github

//BUGS: 
//add sound and html background and instructions!!
//add sound
//add perlin noise!
let capture;
let state = 0;

//colors
let r1 = 0;
let g1 = 0;
let b1 = 0;

let r2 = 255;
let g2 = 255;
let b2 = 255;

let currentColor = 1;
let threshold = 15;

//positions
let xPos1 = 0;
let xPos2 = 0;
let yPos1 = 0;
let yPos2 = 0;


let aCollected = 0;
let pieNum = 0;

//time 
let gTime = 20000;
let localgTime = localStorage.setItem('time', gTime);
let startTime;

//graphics + sound
let apple, basket, picker, state1BG, collect;

// car object
let apples = [];

function preload() {
  apple = loadImage('images/apple.png');
  basket = loadImage('images/basket.png');
  applePie = loadImage('images/applePie.png');
  picker = loadImage('images/picker.png');
  state1BG = loadImage('images/state1BG.jpg');

  collect = loadSound("sounds/collect.mp3");
}

function setup() {
  pixelDensity(1);
  let c = createCanvas(790, 512);
  c.parent('#canvasContainer');

  capture = createCapture({
    video: {
      mandatory: {
        minWidth: 640,
        minHeight: 512,
        maxWidth: 640,
        maxHeight: 512
      }
    }
  });
  capture.hide();

}

function draw() {
    if(state == 0){
        capture.loadPixels();
        if (capture.pixels.length > 0) {
        let bestLocations1 = [];
        let bestLocations2 = [];

        for (let i = 0; i < capture.pixels.length; i += 4) {

        let match1 = dist(r1, g1, b1, capture.pixels[i], capture.pixels[i + 1], capture.pixels[i + 2]);
        if (match1 < threshold) {
            bestLocations1.push(i);
        }
        let match2 = dist(r2, g2, b2, capture.pixels[i], capture.pixels[i + 1], capture.pixels[i + 2]);
        if (match2 < threshold) {
            bestLocations2.push(i);
        }
        }

        //const flippedVideo = ml5.flipImage(capture);

        imageMode(CORNER);
        image(capture, 0, 0);

        fill(70,10,10);
        rect(640,0, 790, 512);

        if (bestLocations1.length > 0) {
        let xSum = 0;
        let ySum = 0;
        for (let i = 0; i < bestLocations1.length; i++) {
            xSum += (bestLocations1[i] / 4) % 640;
            ySum += (bestLocations1[i] / 4) / 640;
        }
        xPos1 = xSum / bestLocations1.length;
        yPos1 = ySum / bestLocations1.length;
        }

        if (bestLocations2.length > 0) {
        let xSum = 0;
        let ySum = 0;
        for (let i = 0; i < bestLocations2.length; i++) {
            xSum += (bestLocations2[i] / 4) % 640;
            ySum += (bestLocations2[i] / 4) / 640;
        }
        xPos2 = xSum / bestLocations2.length;
        yPos2 = ySum / bestLocations2.length;
        }

        if (bestLocations1.length > 0 && bestLocations2.length > 0) {
            startTime = second();

            imageMode(CENTER);
            image(basket, xPos1, yPos1, 130,130);
            image(picker, xPos2, yPos2, 100,100);

            let d = yPos2 - 5;
            if(d<60 && frameCount % 30 == 0){
                for(let i=0; i<3; i++){
                    let temp = new Apple();
                    apples.push(temp);
                }
            }

            for (let i =0; i < apples.length; i++){
                apples[i].move();
                apples[i].display();
                apples[i].collision();

                if (apples[i].y > height) {
                    apples.splice(i, 1);
                    }
            }
        }
        imageMode(CENTER);
        if(aCollected>5 && aCollected<11){
            image(applePie, 715, 450,100,100);
        }else if(aCollected>10 && aCollected<16){
            image(applePie, 715, 450,100,100);
            image(applePie, 715, 330,100,100); 
        }else if(aCollected>15 && aCollected<21){
            image(applePie, 715, 450,100,100);
            image(applePie, 715, 330,100,100);
            image(applePie, 715, 200,100,100); 
        }else if(aCollected>21){
            image(applePie, 715, 450,100,100);
            image(applePie, 715, 330,100,100);
            image(applePie, 715, 200,100,100); 
            image(applePie, 715, 70,100,100); 
            state +=1; 
        }
        }
    }else{
        //if state == 1
        let timeElapsed = startTime;
        if(gTime > int(timeElapsed)){
            gTime = timeElapsed;
            localStorage.setItem('time',gTime);
        }
        imageMode(CORNER);
        image(state1BG,0,0, 640, 512);
        fill(255, 255, 255,150);
        rect(100,50,400,400);
        fill(0);
        textSize(22);
        text('You got all four apple pies!', width/4 - 70, 100); 
        text('Your time: '+timeElapsed, width/4 - 70, 200); //need a variable
        text('Overall Best Time: '+localStorage.getItem('time'), width/4 - 70, 250); //need a variable
        text('Click anywhere to play again!', width/4 - 70, 350); 
        if(mouseIsPressed){
            aCollected = 0;
            pieNum = 0;
            state = 0;
            console.log(state);
        }

    }
  }


function mousePressed() {
  let loc = int( (int(mouseX) + int(mouseY) * capture.width) * 4);

  if (currentColor == 1) {
    r1 = capture.pixels[loc];
    g1 = capture.pixels[loc + 1];
    b1 = capture.pixels[loc + 2];

    console.log("Color 1 - Looking for: R=" + r1 + "; G=" + g1 + "; B=" + b1);
    currentColor = 2;
  } else if (currentColor == 2) {
    r2 = capture.pixels[loc];
    g2 = capture.pixels[loc + 1];
    b2 = capture.pixels[loc + 2];

    console.log("Color 2 - Looking for: R=" + r2 + "; G=" + g2 + "; B=" + b2);
    currentColor = 1;
  }
}


function Apple() {
  this.x = random(640);
  this.y = random(-20,5);
  this.angle = random(-1,1);
  this.artwork = apple;
  this.noiseOffsetX = random(0,10);

  this.move = function() {
    this.y += 3;
    console.log(this.y)
    let xMovement = map(noise(this.noiseOffsetX), 0, 1, -3, 3); 
    this.x += xMovement;
    this.noiseOffsetX += 0.03;

  }

  this.display = function() {
    push();
    translate(this.x, this.y);
    rotate(radians(this.angle));
    imageMode(CENTER);
    image(this.artwork, 0, 0, 40, 40);
    pop();
    this.angle += random(1,2);
  }
  this.collision = function(){
    let baskAppleD = dist(this.x, this.y, xPos1, yPos1);
    if(baskAppleD<60){
        this.y = 800; 
        collect.play();
        aCollected += 1; 
        console.log('aCollected: '+aCollected)
    }
  }

}
