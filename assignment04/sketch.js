let temp;
let arrows = [];
let robos = [];
let nextRobotFrame = 150;
let arrowsImg = []
function preload(){
    arrowsImg[0] = loadImage('images/arrow_down.png');
    arrowsImg[1] = loadImage('images/arrow_left.png');
    arrowsImg[2] = loadImage('images/arrow_up.png');
    arrowsImg[3] = loadImage('images/arrow_right.png');
  }
function setup(){
  let c = createCanvas(800,600);
  c.parent('#canvas_container');
  //arrow grid 
  for (let j = 0; j < 7; j++){
    let h = 70 +((1/8)*height)*j;
    for (let i = 0; i < 7; i++){
      let w = 90 +((1/8)*width)*i;
      arrows.push(new Arrow(w, h));
    }
  }
  
}
function draw(){
  background(128);
  for (let i = 0; i < arrows.length; i++){
    arrows[i].display();
    arrows[i].checkClick();

  }

  if (frameCount === nextRobotFrame) {
    robos.push(new Robot(0, height / 2, "right"));
    nextRobotFrame += 150; // Set the delay 
  }

  for (let i = 0; i < robos.length; i++) {
    let cleanup = robos[i].display();
    robos[i].move();
    if (cleanup) {
      robos.splice(i, 1);
      i--;
    }
  }
  
}
class Arrow{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.arrow_idx = floor(random(0,4));
    this.graphic = arrowsImg[this.arrow_idx];
    this.lastIndex = this.arrow_idx;
    this.arrowDirect;
  }
  display(){
    imageMode(CENTER);
    image(this.graphic, this.x,this.y, 50,50);
    if(this.lastIndex==0){
      this.arrowDirect = 'down';
    }else if(this.lastIndex==1){
      this.arrowDirect = 'left';
    }else if(this.lastIndex==2){
      this.arrowDirect = 'up';
    }else{
      this.arrowDirect = 'right';
    }
    //console.log(this.arrowDirect);
  }
  checkClick(){
    let d = dist(mouseX,mouseY, this.x,this.y);
    if(d < 50){
      if(mouseIsPressed){
        if(this.arrow_idx<3){
          this.arrow_idx = (this.lastIndex + 1);
        }else{
          this.arrow_idx = 0;
        }
          //console.log(this.arrow_idx)
          this.lastIndex = this.arrow_idx;
          this.graphic = arrowsImg[this.arrow_idx];
          mouseIsPressed = false;
    }
    }
  }
  posX(){
    return this.x;
  }
  posY(){
    return this.y;
  }
  dir(){
    return this.arrowDirect;
  }
}
class Robot {
    constructor(x,y,direction){
        this.originalX= x;
        this.originalY= y;
        this.x = x;
        this.y = y;
        this.head;
        this.body;
        this.eyes;

        this.direction = direction;
        this.speed = 1; 

        this.sizeH = random(25,50);
        this.sizeE = this.sizeH*0.6;
        this.sizeB = random(50,75);
        this.bodyX = this.originalX-(0.5*this.sizeB);
        this.bodyY = this.originalY;
        this.headX = this.originalX-(0.5*this.sizeH);
        this.headY = this.originalY-this.sizeH;
        this.colorB= color(random(255),random(255),random(255));
        this.colorH= color(random(255),random(255),random(255));
        this.eyeType = (random(0,1));
        this.eyesX = this.originalX-(0.5*this.sizeE);
        this.eyesY = (this.originalY-this.sizeH)+(0.25*this.sizeH);
        this.eyes1X =  this.originalX+(0.25*this.sizeE);

        //thruster opacity 
        this.a = 220;
        this.b = 3;
    }
    display(){
      //thruster opacity cycle
      this.a += this.b;

        if (this.a > 255 || this.a < 50) {
          this.b *= -1;
        }
      let thruster;
      noStroke();
      fill(255,255,0,this.a);
      if(this.direction == "right"){
        thruster = ellipse(this.bodyX, this.bodyY +(0.5*this.sizeB), 30,30)
      }
      if(this.direction == "left"){
        thruster = ellipse(this.bodyX +this.sizeB, this.bodyY +(0.5*this.sizeB), 30,30)
      }
      if(this.direction == "up"){
        thruster = ellipse(this.bodyX +(this.sizeB*0.5), this.bodyY + this.sizeB, 30,30)
      }
      if(this.direction == "down"){
        thruster = ellipse(this.bodyX +(this.sizeB*0.5), this.bodyY -this.sizeH, 30,30)
      }
      
        noStroke();
        fill(this.colorB);
        this.body = rect(this.bodyX, this.bodyY,this.sizeB,this.sizeB);
        fill(this.colorH);
        this.head = rect(this.headX,this.headY,this.sizeH,this.sizeH);
        //let eyeType = (random(0,1))
        noStroke();
        //this.colorH = fill(255)
        fill(255);
        if(round(this.eyeType)==0){
            this.eyes = rect(this.eyesX ,this.eyesY,this.sizeE,this.sizeE*0.4);
        }else{
            this.eyes = rect(this.eyesX,this.eyesY,this.sizeE*0.25,this.sizeE*0.4);
            this.eyes1 = rect(this.eyes1X,this.eyesY,this.sizeE*0.25,this.sizeE*0.4);
        }
        //console.log('body'+this.body);
        //console.log('head'+this.head);
        //for cleanup purposes 
        if (this.x<0||this.x>800||this.y<0 || this.y >600) {
          return true;
        }
        else {
          return false;
        }
    }
    move(){
      this.checkArrows();

      if(this.direction == "right"){
        //console.log(this.x);
        this.x += this.speed;
        this.bodyX += this.speed;
        this.headX += this.speed;
        this.eyesX += this.speed;
        this.eyes1X += this.speed;
      }
      if(this.direction == "left"){
        //console.log(this.x);
        this.x -= this.speed;
        this.bodyX -= this.speed;
        this.headX -= this.speed;
        this.eyesX -= this.speed;
        this.eyes1X -= this.speed;
      }
      if(this.direction == "up"){
        //console.log(this.x);
        this.y -= this.speed;
        this.bodyY -= this.speed;
        this.headY -= this.speed;
        this.eyesY -= this.speed;
        //this.eyes1X += this.speed;
      }
      if(this.direction == "down"){
        //console.log(this.x);
        this.y += this.speed;
        this.bodyY += this.speed;
        this.headY += this.speed;
        this.eyesY += this.speed;
        //this.eyes1X += this.speed;
      }

    }
  checkArrows(){
    for(let i=0;i<arrows.length;i++){
      let d = dist(this.x,this.y,arrows[i].posX(),arrows[i].posY())
      if(d<40){
        let arrow_direction = arrows[i].dir();
        this.direction = arrow_direction 
      }

    }

  }
}
