//used 1 grace day
//the level mode and the html text change depending 
//on window size, they are in the correct location in the browser
let state = 0;
let globalTime = 4000;
//let best = 0;
let easy = 0;
let med = 0;
let hard = 0;
//localStorage.setItem('Best',best.toString());
localStorage.setItem('easy',easy.toString());
localStorage.setItem('med',med.toString());
localStorage.setItem('hard',hard.toString());
let tryAgain;
let level; 
let levelEl;

let point = 0;

    let c1;
    let c2;
    let c3;
    let c4;
    let c5;
    let c6;
    let c7;
    let c8;
    let c9;
    let c10;
    let f1;
    let f2;
    let f3;
    let f4; 
    let f5;
    let character;


let originalY;

function preload() {
    pantry = loadImage('images/pantry.png');
    jungle = loadImage('images/jungle1.png');
    cheetos = loadImage('images/Cheetos.png');
    crumbs = loadImage('images/cheetoPile.png');
    cheetah_r = loadImage('images/cheetah_rigth.png');
    cheetah_l  = loadImage('images/cheetah_left.png');
    fire_image  = loadImage('images/fire2.gif');
    
    collect = loadSound("sounds/collect.mp3");
    danger = loadSound("sounds/danger.mp3");
    start = loadSound("sounds/start.mp3");
    dead = loadSound("sounds/dead.mp3");
  }
  
  function setup() {
    let canvas = createCanvas(500,600);
    canvas.id('canvas'); 

    level = document.getElementById('level').value; 
    levelEl = document.getElementById('level');
    tryAgain = document.getElementById('tryAgain');
    console.log("setup");
    console.log(tryAgain);

    c1= new cheeto(180,130);
    c2= new cheeto(300,130);
    c3= new cheeto(170,248);
    c4= new cheeto(240,248);
    c5= new cheeto(300,248);
    c6= new cheeto(320,360);
    c7= new cheeto(260,360);
    c8 = new cheeto(random(20,400),(random(280,500)),1,150);
    c9 = new cheeto(random(20,400),(random(280,500)),100,200);
    c10 = new cheeto(random(20,400),(random(280,500)),200, 400);

    f1 = new fire();
    f2 = new fire();
    f3 = new fire();
    f4 = new fire();
    f5 = new fire();

    character = new char();

    tryAgain.addEventListener('click',function(){
        tryAgain.classList.add('hidden'); 
        globalTime = 4000;
        point = 0;
        state = 1;
        console.log('button click');
        character.reset();
        level = document.getElementById('level').value;
        console.log('try level: '+level);
    })
  
  }

  class cheeto {

    constructor(x, y, minFramesStay, maxFramesStay) {
  
      this.x = x;
      this.y = y;
      //let originalX = x;
      this.originalY = this.y;
      print(originalY)

      this.width = 65;
      this.height = 65;
      this.graphic = cheetos;

      //state
      this.cState = 0;
      this.framesStay = int(random(minFramesStay, maxFramesStay));
      this.framesIn = 0;

    }

    display() {
        imageMode(CENTER);
        if(this.cState==0 || state == 0){
            this.graphic = cheetos;
            image(this.graphic,this.x, this.y,this.width,this.height);
        }else{
            this.graphic = crumbs;
            image(this.graphic,this.x, this.y,this.width,this.height);
        }
        this.framesIn += 1;
        if (this.framesIn >= this.framesStay) {
            if (this.cState == 0) {
              this.cState = 1;
            }
            else {
              this.cState = 0;
            }
            this.framesIn = 0;
            this.framesStay = int(random(100,200));
        
        }
        this.framesStay = int(random(100,200));

      }

    move(currentX,currentY){

        let d = dist(currentX, currentY,this.x,this.y);
        if(d<20){
        this.width=80;
        this.height=80;
        this.y = this.originalY - 15;
        }else{
            this.width=65;
            this.height=65;
            this.y = this.originalY;
        }
    }
    isClicked() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        return d < 70;
    }
    
    collect(cx,cy){
        if (this.cState == 0) {

            let d = dist(this.x,this.y,cx,cy);
            if(d<35){
                collect.play();
                this.x = random(10,400);
                this.y = random(250,500);
                point += 1;
            }   
        }
    };
};

    class char {

        // our 'constructor' function - this function runs one time when
        // we build a new 'Ball' object
        constructor() {
            this.x = 200;
            this.y = 550;
            this.size = 80;
            this.graphic = cheetah_r;

        }
        display(){
            image(this.graphic,this.x, this.y,this.size,this.size);
        }
        move(){
            if (this.x>40 && keyIsDown(LEFT_ARROW)){
                this.x -= 3;
                this.graphic = cheetah_l;
                if(this.x <40){
                    this.x = 40;
                }
            }
            if (keyIsDown(RIGHT_ARROW)){
                this.x += 3;
                this.graphic = cheetah_r;
                if(this.x >460){
                    this.x = 460;
                }

            }
            if (keyIsDown(UP_ARROW)){
                this.y -= 3;
                if(this.y <250){
                    this.y = 250;
                }
            }
            if (keyIsDown(DOWN_ARROW)){
                this.y += 3;
                if(this.y>550){
                    this.y = 550;
                }
            }

        }
        positionX(){
            return this.x
        }
        positionY(){
            return this.y
        }
        reset(){
            this.x = 200;
            this.y = 550;
            this.size = 80;
            this.graphic = cheetah_r;
        }
    }
    class fire{
        constructor(){
            this.x = random(20,400);
            this.y = random(280,500);
            this.graphic = fire_image;
            this.w = 50;
            this.h = 50;
        }
        display(){
            image(this.graphic,this.x, this.y,this.w,this.h)
        }
        move(){
            //doesn't move just need to change location if too close to cheeto
        }
        collision(cx,cy){
            let d = dist(this.x,this.y,cx,cy);
            if(d<90){
                //play sound
                danger.play();
                if(d<35){
                    //end game
                    danger.stop();
                    globalTime = 0;
                }
            }else{
                danger.stop();
            }

        }

    };

  
  function draw(){
    if(state==1){
        console.log(state);
        console.log('level'+level);
        console.log('time:'+globalTime);

    }
    if(state == 0){

        imageMode(CORNER);
        image(pantry,-50,0);

        level = document.getElementById('level').value;
        tryAgain.classList.add('hidden');
        print('level: ',level);


        c1.display();
        c2.display();
        c3.display();
        c4.display();
        c5.display();
        c6.display();
        c7.display();
        c1.move(mouseX,mouseY);
        c2.move(mouseX,mouseY);
        c3.move(mouseX,mouseY);
        c4.move(mouseX,mouseY);
        c5.move(mouseX,mouseY);
        c6.move(mouseX,mouseY);
        c7.move(mouseX,mouseY);
        c1.isClicked();
        c2.isClicked();
        c3.isClicked();
        c4.isClicked();
        c5.isClicked();
        c6.isClicked();
        c7.isClicked();
        if (mouseIsPressed) {
            if (c1.isClicked() || c2.isClicked() || c3.isClicked() || c4.isClicked() || c5.isClicked() || c6.isClicked() || c7.isClicked()) {
                state = 1;
                start.play();
            }
        }

    }
    if(state==1){
        //if(tryAgain.classList.contains('hidden')=='false'){
            //tryAgain.classList.add('hidden');
        //}
        //if(levelEl.classList.contains('hidden')=='false'){
            //levelEl.classList.add('hidden');
        //}
        levelEl.classList.add('hidden');
        imageMode(CORNER);
        image(jungle,0,-80,800,800);
        console.log('316'+globalTime)

        globalTime = globalTime - 1;
        fill(0); 
        textSize(15);
        text('Time: '+globalTime,20,20);
        text('Points: '+point,20,40);

        if(level =='e'){
            console.log('325'+globalTime);
            c8.display();
            c8.collect(character.positionX(),character.positionY());
            c9.display();
            c9.collect(character.positionX(),character.positionY());
            c10.display();
            c10.collect(character.positionX(),character.positionY());
            f1.display()
            f1.collision(character.positionX(),character.positionY());
            character.display();
            character.move();

            console.log(globalTime);
            if(globalTime<=0){
                console.log('time=0');
                globalTime = 0;
                state = 2;
                dead.play();
                easy = parseInt(localStorage.getItem('easy'));
                if(easy<=point){
                    easy = point;
                    localStorage.setItem('easy', easy.toString());
                }

            }
   
        }else if(level == 'm'){
            c8.display();
            c8.collect(character.positionX(),character.positionY());
            c9.display();
            c9.collect(character.positionX(),character.positionY());
            f1.display()
            f1.collision(character.positionX(),character.positionY());
            f2.display()
            f2.collision(character.positionX(),character.positionY());
            f3.display()
            f3.collision(character.positionX(),character.positionY());
            character.display();
            character.move();

            //level.classList.add('hidden');


            if(globalTime<=0){
                globalTime = 0;
                state = 2;
                dead.play();
                med = parseInt(localStorage.getItem('med'));
                if(med<=point){
                    med = point;
                    localStorage.setItem('med', med.toString());
                }
            }
        }else{
            c8.display();
            c8.collect(character.positionX(),character.positionY());
            f1.display()
            f1.collision(character.positionX(),character.positionY());
            f2.display()
            f2.collision(character.positionX(),character.positionY());
            f3.display()
            f3.collision(character.positionX(),character.positionY());
            f4.display()
            f4.collision(character.positionX(),character.positionY());
            f5.display()
            f5.collision(character.positionX(),character.positionY());
            character.display();
            character.move();

            //level.classList.add('hidden');


            if(globalTime<=0){
                globalTime = 0;
                state = 2;
                dead.play();
                hard = parseInt(localStorage.getItem('hard'));
                if(hard<=point){
                    hard = point;
                    localStorage.setItem('hard', hard.toString());
                }
            }

        }
    }
    if(state ==2){
        levelEl.classList.remove('hidden');
        tryAgain.classList.remove('hidden');

        background(238, 0, 0);
        fill(255);
        textSize(35);
        text('Game Over', 160,250);
        textSize(15);
        text('Score: '+point,220,320);

        if(level=='e'){
            if(easy <= point){
                text('New high score! ',200,345)
            }else{
                //text('Current score: '+point,200,330)
                text('Easy level high score = '+ easy,170,370)
            }
        }else if(level=='m'){
            if(med <= point){
                text('New high score! ',200,345)
            }else{
                //text('Current score: '+point,200,330)
                text('Medium level high score = '+ med,170,370)
            }
        }else{
            if(hard <= point){
                text('New high score! ',200,345)
            }else{
                //text('Current score: '+point,200,330)
                text('Hard level high score = '+ hard,170,370)
            }
        }

    }

  }
