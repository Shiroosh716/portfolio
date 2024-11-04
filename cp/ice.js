

//implement functionality to each tile. 
let timode=0;

let levelTrack = 1;

let infoArray = [];
let ctrVar = 0;

//let gameObj;
let gameObj = {
    allPossibleBadges: [
        {name: "coin1Stamp", songTitle: "song1.wav", visualizerHTML: "visualizer1.html"}, 
        {name: "AllCoinBagsStamp", songTitle: "song2.wav", visualizerHTML: "visualizer1.html"}, 
        {name: "IceBonus", songTitle: "song3.wav", visualizerHTML: "visualizer2.html"}, 
        {name: "allElements", songTitle: "song4.wav", visualizerHTML: "visualizer2.html"},
        {name: "OneElement", songTitle: "song5.wav", visualizerHTML: "visualizer3.html"}, 
        {name: "puffle30", songTitle: "song6.wav", visualizerHTML: "visualizer3.html"}, 
        {name: "pizzaFiasco", songTitle: "song7.wav", visualizerHTML: "visualizer4.html"}, 
        {name: "pizzaMaster", songTitle: "song8.wav", visualizerHTML: "visualizer4.html"}, 

    ],
    badgesEarned: []
    }


function preload(){
    //iceBG
    //each type of tile

    //change to red fire puffle
    t1=loadImage("images/t1.png");
    t2=loadImage("images/t2.png");
    t3=loadImage("images/t3.png");
    t4=loadImage("images/t4.png");
    t5=loadImage("images/t5.png");
    t6=loadImage("images/t6.png");
    t7=loadImage("images/t7.png");
    t8=loadImage("images/t8.png");
    t9=loadImage("images/t9.png");
    t10=loadImage("images/t10.png");
    t11=loadImage("images/water.gif");
    t12=loadImage("images/t12.png");
    redPuffle=loadImage("images/redPuffle.gif");
    endPuffle = loadImage("images/endPuffle.gif");
    bg=loadImage("images/thinIceBG.png");
    font1 = loadFont('fonts/yokelvision.otf');
    start1 = loadImage("images/startscreen.png");
    endScreen = loadImage("images/endScreen.png");
    infoArray.push( loadImage('images/instruct1.png') );
    infoArray.push( loadImage('images/instruct2.png') );
    infoArray.push( loadImage('images/instruct3.png') );
    coin1Stamp = loadImage('images/coin1Stamp.png');
    allCoinBagsStamp = loadImage('images/AllCoinBagsStamp.png');
    iceBonus = loadImage('images/IceBonus.png');
    iceSound=loadSound("sounds/thinIce.mp3");

}

let tileSize = 26;

//player change to puffle
let tiPlayer, bg;

//images
let t1,t2,t3,t4,t5,t6,t7,t8,t9,t10;
let redPuffle, font1;

let solid;
let singleTile

let countT1 = 0;
let T1Gone = 0;
let allTGone = 0;
let solved = 0;
let points = 0;
let moneyBag = 0;
let unlock = false;

let countDown =0;

let up= false;
let down= false;
let left= false;
let right= false;



let level = [];
level = level1;


//puffle
let redPX, redPY;

//trying t6
let t6PositionX;
let t6PositionY;
let movable;
let prevPos;
let downPressed = false;
let upPressed = false;
let leftPressed = false;
let rightPressed = false;

let contst = true;
let allconst = true;
let meltcont = true;
let newStampFunctionExecuted = true;
let testStamp;
let textText;
let stGraphic;

let soundPlay = false;


function setup(){
    var canvas = createCanvas(800,500);
    canvas.parent("#canvas");
    noStroke();


    


    //if local storage has a game obj then...
    if (window.localStorage.getItem('gameObj')) {
        let temp = window.localStorage.getItem('gameObj') ;
        gameObj = JSON.parse(temp);
        console.log(gameObj);
    }

    console.log(gameObj);

    buffer1 = createGraphics(800,500);
    buffer1.image(bg,0,0,800,500)
    image(buffer1, -10, -10);

    tiPlayer = new Char(498,265);
    Countt1s();
}
function draw(){
    if(timode == 0){
        image(start1,105,-15,570,490);
    }else if(timode == 1){
        image(infoArray[ctrVar],105,-15,570,490);
        if(mouseIsPressed==true){
        }

    }else if(timode == 2){
        textFont(font1);
        textSize(30);
        drawLevel();
        tiPlayer.display()
        tiPlayer.move()
        
    }else{
        fill(43, 110, 180);
        textFont(font1);
        textSize(15);
        image(endScreen,135,0,500,450);
        text(allTGone, 350,158);
        text(solved, 550,50);
        text(moneyBag, 550,75);
        text(points, 550,312);
        text(int(points/10), 550,335); 
        
    }
    image(buffer1, -10, -10);
    
     //BADGES
     if(moneyBag == 1 && contst == true){
        contst = false;
        let checkTest = checkStampAndUpdate('coin1Stamp');
        if(checkTest){
            textText = 'money bag collected';
            testStamp = coin1Stamp;
            newStampFunctionExecuted = false;
        }
    }
    if(moneyBag == 8 && allconst == true){
        //All money badge
        allconst = false;
        let checkTest = checkStampAndUpdate('AllCoinBagsStamp');
        if(checkTest){
            textText = 'all money collected';
            testStamp = allCoinBagsStamp;
            newStampFunctionExecuted = false;
        }
    }
    if(allTGone == 250 && meltcont == true){
        //new stamp
        //completely melted 480 ice
        meltcont = false;
        let checkTest = checkStampAndUpdate('IceBonus');
        if(checkTest){
            textText = '250 ice melted';
            testStamp = iceBonus;
            newStampFunctionExecuted = false;
        }
    }
    if(newStampFunctionExecuted == false){
        console.log(testStamp);
        console.log(textText);
        newStamp(testStamp, textText);
        }
}
function getTile(x,y) {
    x = int( (x-135 + 26)/tileSize);
    y = int( (y-5)/tileSize);
    //console.log("tile at ", x, y, "is", level[y][x]);
    return level[y][x];
}
  function isSolid(singleTile) {
    if (singleTile == 't2' || singleTile == 't3' || singleTile == 't4'|| singleTile == 't9' || singleTile == 't11') {
      return true;
    }else{
        return false;
    }
}

  function drawLevel() {
    imageMode(CORNER);
    for(let y = 0; y < level.length; y++){
        for (let x = 0; x < level[y].length; x++) {
            singleTile = level[y][x]
            if(level[y][x]=='t1'){
                image(t1, 135 + x*tileSize, 5+ y*tileSize, tileSize, tileSize);
            }else if(level[y][x]=='t2'){
                image(t2, 135 + x*tileSize, 5+ y*tileSize, tileSize, tileSize);
            }else if(level[y][x]=='t3'){
                image(t3, 135 + x*tileSize, 5+ y*tileSize, tileSize, tileSize);
            }else if(level[y][x]=='t4'){
                image(t4, 135 + x*tileSize, 5+ y*tileSize, tileSize, tileSize);
            }else if(level[y][x]=='t5'){
                image(t5, 135 + x*tileSize, 5+ y*tileSize, tileSize, tileSize);
            }else if(level[y][x]=='t6'){
                t6PositionX = x;
                t6PositionY = y;
                image(t6, 135 + x*tileSize, 5+ y*tileSize, tileSize, tileSize);
            }else if(level[y][x]=='t7'){
                image(t7, 135 + x*tileSize, 5+ y*tileSize, tileSize, tileSize);
            }else if(level[y][x]=='t8'){
                image(t8, 135 + x*tileSize, 5+ y*tileSize, tileSize, tileSize);
            }else if(level[y][x]=='t9'&& unlock == false){
                image(t9, 135 + x*tileSize, 5+ y*tileSize, tileSize, tileSize);
            }else if(level[y][x]=='t9'&& unlock == true){
                image(t1, 135 + x*tileSize, 5+ y*tileSize, tileSize, tileSize);
            }else if(level[y][x]=='t10'){
                image(t10, 135 + x*tileSize, 5+ y*tileSize, tileSize, tileSize);
            }else if(level[y][x]=='t11'){
                image(t11, 135 + x*tileSize, 5+ y*tileSize, tileSize, tileSize);
            }else if(level[y][x]=='t12'){
                image(t12, 135 + x*tileSize, 5+ y*tileSize, tileSize, tileSize);
            }else{
                /* console.log('no') */
            }

            /*
            if(down == true){
                y=y+1;
                level[y][x]= 't6';
                down = false;
            }
            if(left == true){
                x=x-1;
                level[y][x]= 't6';
                left = false;
            }
            if(right == true){
                x=x+1;
                level[y][x]= 't6';
                right = false;
            }*/
        }
    }
    //score output
    if(T1Gone == countT1){
        solved = solved + 1;
    }
    fill(0,50,150)
    text('Level '+levelTrack,150,28);
    text(T1Gone +'/'+countT1,340,28);
    text('Solved '+solved,490,28);
    text('Points '+points,490,440);
}


class Char {
    constructor(x,y) {
      this.x = x;
      this.y = y;

      this.prevX = this.x;
      this.prevY = this.y;

      this.graphic = redPuffle;
    }
  
    display() {
      // simplay display a tile as the player (you can change this to your own graphic if you want, or to an animated sequence)
      imageMode(CORNER);
      image(this.graphic, this.x-10, this.y-14, tileSize + 20,tileSize+ 20);
    }

  
    move() {
      // set up sensor positions
      this.sensorLeft = this.x-2;
      this.sensorRight = this.x+tileSize+2;
      this.sensorTop = this.y-2;
      this.sensorBottom = this.y+tileSize+2;
      this.middleX = this.x+tileSize/2;
      this.middleY = this.y+tileSize/2;

      let pos = getTile(this.x,this.y);
      /* e */
      //if t5 change levels
      if(pos == 't5'){
        nextLevel();
        Countt1s();
      }
      if(pos == 't10'){
        unlock = true;
      }
      if(pos!='t6'){
        prevPos = pos;
      }
      if(pos=='t6'){
        t6move()
        }
        if(pos=='t8'||pos=='t11'){
            this.graphic = endPuffle;
            setTimeout(() => {
                //state
                timode = 3;
              }, "1500");
            }

    if (keyIsDown(LEFT_ARROW)&& keyPressed()) {
        //ellipse(this.sensorLeft, this.middleY,5,5);
        left = true;
        up = false;
        down = false;
        right = false;
        // check tile to the left

        let id = getTile(this.sensorLeft - 26,this.middleY);
        if ( isSolid(id) === false && (countDown % 10 == 0 || countDown == 0)|| (id == 't9' && unlock == true)) {
            this.x = this.x - tileSize;
        }
        countDown +=1;
        }
    
    if (keyIsDown(RIGHT_ARROW)&& keyPressed()) {
        //pse(this.sensorRight, this.middleY,5,5)
        right = true;
        up = false;
        down = false;
        left = false;
        // check tile to the left
        let id = getTile(this.sensorRight - 26,this.middleY)
        if ( isSolid(id) === false && (countDown % 10 == 0 || countDown == 0)|| (id == 't9' && unlock == true)) {
            this.x = this.x + tileSize;
        }
        countDown +=1;
        }
    
    if (keyIsDown(UP_ARROW)&& keyPressed()) {
        //ellipse(this.middleX, this.sensorTop,5,5);
        up = true;
        down = false;
        left = false;
        right = false;
        // check tile to the left
        let id = getTile(this.middleX - 26, this.sensorTop);
        if ( isSolid(id) === false && (countDown % 10 == 0 || countDown == 0)|| (id == 't9' && unlock == true)) {
            this.y = this.y - tileSize;
        }
        countDown +=1;
        }
    
    if (keyIsDown(DOWN_ARROW)&& keyPressed()) {
        //ellipse(this.middleX, this.sensorBottom,5,5);
        down = true;
        up = false;
        left = false;
        right = false;
        // check tile to the left
        let id = getTile(this.middleX - 26, this.sensorBottom);
        if ( isSolid(id) === false && (countDown % 10 == 0 || countDown == 0)|| (id == 't9' && unlock == true)) {
            this.y = this.y + tileSize;
        }
        countDown +=1;
        }
        //change to gif aft player passes
    if(this.prevX != this.x || this.prevY != this.y){
        if(pos == 't7'){
            T1Gone += 1;
            points += 1;
            allTGone += 1;
            this.prevX = int((this.prevX-135 + 26)/ tileSize);
            this.prevY = int((this.prevY-5)/ tileSize);
            level[this.prevY][this.prevX] = 't1';
            this.prevX = this.x;
            this.prevY = this.y;
        }else{
            if(pos == 't12'){
                points = points + 100;
                moneyBag = moneyBag + 1;
            }
            T1Gone += 1;
            allTGone += 1;
            points += 1;
            this.prevX = int((this.prevX-135 + 26)/ tileSize);
            this.prevY = int((this.prevY-5)/ tileSize);
            level[this.prevY][this.prevX] = 't11';
            this.prevX = this.x;
            this.prevY = this.y;
            }
    }
    
}
    
}
function nextLevel(){
    //reset for different levels
    levelTrack = levelTrack + 1;
    unlock = false;

    if(level==level1){
        level = level2;
        tiPlayer.x = tiPlayer.prevX;
        tiPlayer.y = tiPlayer.prevY + 26;
        tiPlayer.prevX = tiPlayer.x;
        tiPlayer.prevY = tiPlayer.y;

    }else if(level==level2){
        level = level3;
        tiPlayer.x = tiPlayer.prevX;
        tiPlayer.y = tiPlayer.prevY;
        tiPlayer.prevX = tiPlayer.x;
        tiPlayer.prevY = tiPlayer.y;
    }else if(level==level3){
        level = level4;
        tiPlayer.x = tiPlayer.prevX;
        tiPlayer.y = tiPlayer.prevY;
        tiPlayer.prevX = tiPlayer.x;
        tiPlayer.prevY = tiPlayer.y;
    }else if(level==level4){
        level = level5;
        tiPlayer.x = tiPlayer.prevX;
        tiPlayer.y = tiPlayer.prevY;
        tiPlayer.prevX = tiPlayer.x;
        tiPlayer.prevY = tiPlayer.y;
    }else if(level==level5){
        level = level6;
        tiPlayer.x = tiPlayer.prevX;
        tiPlayer.y = tiPlayer.prevY;
    }else if(level==level6){
        level = level7;
        tiPlayer.x = tiPlayer.prevX;
        tiPlayer.y = tiPlayer.prevY;
    }else if(level==level7){
        level = level8;
        tiPlayer.x = tiPlayer.prevX;
        tiPlayer.y = tiPlayer.prevY;
    }else if(level==level8){
        level = level9;
        tiPlayer.x = tiPlayer.prevX;
        tiPlayer.y = tiPlayer.prevY;
    }else if(level==level9){
        level = level10;
        tiPlayer.x = tiPlayer.prevX;
        tiPlayer.y = tiPlayer.prevY;
    }else if(level==level10){
        level = level11;
        tiPlayer.x = tiPlayer.prevX;
        tiPlayer.y = tiPlayer.prevY;
    }else if(level==level11){
        level = level12;
        tiPlayer.x = tiPlayer.prevX;
        tiPlayer.y = tiPlayer.prevY;
    }else if(level==level12){
        level = level13;
        tiPlayer.x = tiPlayer.prevX;
        tiPlayer.y = tiPlayer.prevY;
    }else if(level==level13){
        level = level14;
        tiPlayer.x = tiPlayer.prevX;
        tiPlayer.y = tiPlayer.prevY;
    }else if(level==level14){
        level = level15;
        tiPlayer.x = tiPlayer.prevX;
        tiPlayer.y = tiPlayer.prevY;
    }else if(level==level15){
        level = level16;
        tiPlayer.x = tiPlayer.prevX;
        tiPlayer.y = tiPlayer.prevY;
    }else if(level==level16){
        level = level17;
        tiPlayer.x = tiPlayer.prevX;
        tiPlayer.y = tiPlayer.prevY;
    }else{
        timode = timode +1
    }
}
  //800/19 and 500/16 
  function Countt1s(){
    T1Gone = 0;
    countT1 = 0;
    for(let y = 0; y < level.length; y++){
        for (let x = 0; x < level[y].length; x++)
            if(level[y][x]=='t1' || level[y][x]=='t7'){
                
                //count how many t1 there are in every level minus bottom and top (-19*2)
                countT1 += 1;
        }
    }
    countT1 = countT1 - 19 * 2;
    /* console.log(countT1); */
}

function keyPressed(){
    return true;
}
function keyReleased(){
    countDown = 0;
}
function t6move(){
    prevPos = 't6';
    if(up ==true && !upPressed){
        upPressed = true;
        t6PositionY = t6PositionY -1;
        movable = level[t6PositionY][t6PositionX];
        if(movable !== 't3'){
            console.log('a');
            level[t6PositionY][t6PositionX] = 't6';
        }else{
            tiPlayer.y = tiPlayer.y + 26
            level[t6PositionY+1][t6PositionX] = 't6';
            console.log('b');
        }
    }else if (up == false) {
        upPressed = false;
    }
    if(down ==true && !downPressed){
        downPressed = true;
        t6PositionY = t6PositionY + 1;
        movable = level[t6PositionY][t6PositionX];
        console.log(movable);
        if(movable !== 't3'){
            console.log('k');
            level[t6PositionY][t6PositionX] = 't6';
            down = false;
        }else{
            tiPlayer.y = tiPlayer.y - 26;
            level[t6PositionY-1][t6PositionX] = 't6';
            console.log('f');
        }
    }else if (down == false) {
        downPressed = false;
    }
    if(right ==true){
        t6PositionX = t6PositionX +1;
        movable = level[t6PositionY][t6PositionX];
        if(movable != 't3'){
            level[t6PositionY][t6PositionX] = 't6';
            console.log('g');
        }else{
            tiPlayer.x = tiPlayer.x - 26;
            level[t6PositionY][t6PositionX-1] = 't6';
            console.log('h');
        }
    }
    if(left ==true){
        t6PositionX = t6PositionX -1;
        movable = level[t6PositionY][t6PositionX];
        if(movable != 't3'){
            level[t6PositionY][t6PositionX] = 't6';
            console.log('m');
        }else{
            tiPlayer.x = tiPlayer.x + 26;
            level[t6PositionY][t6PositionX+1] = 't6';
            console.log('j');
        }
    }
    up = false;
    down = false;
    left = false;
    right = false;
    tiPlayer.prevX = tiPlayer.x;
    tiPlayer.prevY = tiPlayer.y;

}
function mousePressed(){
    if(soundPlay == false){
        iceSound.loop();
        soundPlay = true;
    }
    //start
    
    if(timode == 0){
        let stDist = dist(mouseX,mouseY, 380, 410);
        if(stDist <50){
            timode =1;
            console.log('next');
        }
    }
    //,105,-15,570,490
    fill(0);
    if(timode == 1){
        //play
        let playDist = dist(mouseX,mouseY, 190, 410,);
        //ellipse(190,410,50,50);
        if(playDist<50){
            timode = 2;
        }
        
        //go back
        let backDist = dist(mouseX,mouseY, 460, 410,);
        //ellipse(460, 410, 50,50);
        if(backDist<50){
            if(ctrVar > 0){
                ctrVar = ctrVar - 1;
            }else{
                timode = 0;
            }
        }
        //next
        let nextDist = dist(mouseX,mouseY, 570,410);
        if(nextDist<50){
            if(ctrVar < 2){
                ctrVar = ctrVar + 1;
            }
        }
        
    }
    let endD = dist(mouseX,mouseY,710,30)
        if(endD<20) {
            iceSound.stop();
            window.location = "index.html";
            localStorage.setItem("gameObj", JSON.stringify(gameObj));
            console.log('end');
        }

}

function newStamp(name, mes){
    
        fill(0, 100);
        rect(600,0,200,100);
        image(name, 610, 20, 70, 70);

        fill(255);
        textSize(14);
        text('New Stamp', 700, 30);
        textSize(10);
        text(mes, 690, 60);
        console.log("Delayed for 2 second.");
        
    setTimeout(() => {
        newStampFunctionExecuted = true;
        console.log("Stamp removed after 2 seconds.");
      }, 2000);
}

function checkStampAndUpdate(badgeTitle){
    for(let i = 0; i<gameObj.allPossibleBadges.length; i++){
        if(gameObj.allPossibleBadges[i].name == badgeTitle){
            console.log(i);

            //after we find the match, check to see if the badge has already been earned
            let alreadyEarned = false;
            if(gameObj.badgesEarned){
                for(let i = 0; i < gameObj.badgesEarned.length; i ++){
                if(gameObj.badgesEarned[i].name == badgeTitle){
                    alreadyEarned = true;   
                    }
                }
            }      
            if(!alreadyEarned){
                    let temp = gameObj.allPossibleBadges[i];
                    gameObj.badgesEarned.push(temp);
                    return  gameObj.allPossibleBadges[i];
            }
         }
                
    }
}        
            
        
    

