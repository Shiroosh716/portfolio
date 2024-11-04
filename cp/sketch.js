let gameObj = {
    allPossibleBadges: [
        {name: "coin1Stamp", songTitle: "song1", visualizerHTML: "visualizer1"}, 
        {name: "AllCoinBagsStamp", songTitle: "song2", visualizerHTML: "visualizer1"}, 
        {name: "IceBonus", songTitle: "song3", visualizerHTML: "visualizer2"}, 
        {name: "allElements", songTitle: "song4", visualizerHTML: "visualizer2"},
        {name: "OneElement", songTitle: "song5", visualizerHTML: "visualizer2"}, 
        {name: "puffle30", songTitle: "song6", visualizerHTML: "visualizer3"}, 
        {name: "pizzaFiasco", songTitle: "song7", visualizerHTML: "visualizer3"}, 
        {name: "pizzaMaster", songTitle: "song8", visualizerHTML: "visualizer3"}, 

    ],
    badgesEarned: []
    }


//variables
//world variables
let state = 0; // 0= plaza, 1= petshop, 2= stage, 3= pizzaria, 4= dojo courtyard, 5= dojo, 
    //6= town, 7=nightclub 8=nightclub upstairs
let mode=0; //0= no game, 1= game if game on, read state and play game depening on location
let gameState=0; //no game, 1= start screen, 2= instructions, 3 = playing, 4= end screen
let mapIconState=false, mapState=false //map icon is closed & map is closed
let clickX=false; //shows when you click on an X (for movement)
let canSoundPlay=false;

//penguin variables
let xPos=400, yPos=350;
let distX=0, distY=0;
let xDesired=400, yDesired=350;
let speed=2;

// puffle variables
let caught, esacped;
let gameTime;
let puffleScore, coinsEarned, totalPuffleCoins;

let puffles=[];
let pufflesCaught=[];

//stamp variables
let newStampFunctionExecuted = true;
let testStamp;
let textText;

//preload function
function preload(){
    //IMAGES

    //general assets
    pIcon=loadImage("images/general/penguin.png");
    mapGraphic=loadImage("images/general/map.png");
    mapIcon=loadImage("images/general/mapIcon.png");
    openMap=loadImage("images/general/openMap.png");
    stampIcon=loadImage("images/general/stampIcon.png");

    //rooms
    plazaBg=loadImage("images/rooms/plaza.png");
    dojoBg=loadImage("images/rooms/dojo.png");
    dojoCyBg=loadImage("images/rooms/dojoCourtyard.png");
    pizzeriaBg=loadImage("images/rooms/pizzeria.png");
    petshopBg=loadImage("images/rooms/petshop.png");
    stageBg=loadImage("images/rooms/stage.png");
    townBg=loadImage("images/rooms/town.png");
    clubBg=loadImage("images/rooms/club.png");
    loungeBg=loadImage("images/rooms/lounge.png");
    villageBg=loadImage("images/rooms/skiVillage.jpeg");

    
    //puffle game
    puffleBg=loadImage("images/puffle/puffleGameBg.png");
    blackPuffle=loadImage("images/puffle/blackPuffle.png");
    greenPuffle=loadImage("images/puffle/greenPuffle.png");
    orangePuffle=loadImage("images/puffle/orangePuffle.png");
    pinkPuffle=loadImage("images/puffle/pinkPuffle.png");
    bluePuffle=loadImage("images/puffle/bluePuffle.png");
    purplePuffle=loadImage("images/puffle/purplePuffle.png");
    redPuffle=loadImage("images/puffle/redPuffle.png");
    brownPuffle=loadImage("images/puffle/brownPuffle.png");
    yellowPuffle=loadImage("images/puffle/yellowPuffle.png");
    puffleStart=loadImage("images/puffle/puffleStart.png");
    puffleInstructions=loadImage("images/puffle/instructions.png");
    puffleEnd=loadImage("images/puffle/puffleEnd.png");
    puffle30 = loadImage("images/puffle30.png");

    

    //FONTS
    cpFont=loadFont("fonts/vanillaCaramel.otf");

    //SOUNDS
    
    clubSound=loadSound("sounds/club.mp3");
    dojoSound=loadSound("sounds/dojo.mp3");
    pizzeriaSound=loadSound("sounds/pizzeria.mp3");
    puffleGameSound=loadSound("sounds/puffleRoundup.mp3");



}

//setup function
function setup(){

    
    if (window.localStorage.getItem('gameObj')) {
        gameObj = JSON.parse(window.localStorage.getItem('gameObj')) ;
        console.log(gameObj)
    }else{
        let strung = JSON.stringify(gameObj);
        window.localStorage.setItem('gameObj',strung);
        console.log(gameObj)
    }

    state = window.localStorage.getItem("cpState");
    if (state == null){
        //if state is null, default to 0
        state = 0;
        window.localStorage.setItem("cpState", 0);
    }
    //if state has already been set
    else{
        state = int(state);
    }

    //console.log(state);
    //console.log(canSoundPlay);
    
    var canvas = createCanvas(800,500);
    canvas.parent("#canvas");
    noStroke(); 
    
    /*
    state=1;
    mode=1;
    gameState=4;
    */
    
}   

//draw function
function draw(){

    //console.log(state);

    //penguin movement
    if (mode==0){ //not in a game
        // compute the desired distance
        let distX = xDesired - xPos;
        let distY = yDesired - yPos;

        //move the character at a constant speed toward the desired position
        if (mapState==false && clickX==false){
            if (dist(distX, distY, 0, 0) > speed) {
                let direction = createVector(xDesired - xPos, yDesired - yPos);
                direction.normalize();
                xPos += direction.x * speed;
                yPos += direction.y * speed;
            } else {
                // smoothly interpolate the position in order to avoid shaking when reaching the desired position
                xPos = lerp(xPos, xDesired, 0.1);
                yPos = lerp(yPos, yDesired, 0.1);
            }
        }
    }

    imageMode(CENTER);

    if (state==0){ // plaza
        push();
        imageMode(CORNER);
        image(plazaBg,0,0, 800, 500);
        pop();
        image(pIcon, xPos, yPos, 70,70);
    }

    //puffle game
    else if (state==1) {
        //when not in game
        if (mode==0){
            push();
            imageMode(CORNER);
            image(petshopBg,0,0, 800, 500);
            pop();
            image(pIcon, xPos, yPos, 70,70);
        }

        
        //when in game
        else if (mode==1){
            push();
            imageMode(CORNER);
            image(puffleBg, 0, 0, 800, 500);
            pop();

            if (gameState==1){
                push();
                imageMode(CENTER);
                fill(1,153,204);
                rectMode(CENTER);
                rect(width/2,height/2,415,395,20);
                image(puffleStart,width/2,height/2,400,380)
                pop();

            }

            if (gameState==2){

                push();
                imageMode(CENTER);
                fill(1,153,204);
                rectMode(CENTER);
                rect(width/2,height/2,415,395,20);
                image(puffleInstructions,width/2,height/2,400,380);
                textFont(cpFont);
                stroke(0);
                strokeWeight(3);
                fill(255);
                textSize(30);
                textAlign(CENTER);
                text("Instructions:", width/2, 120);
                text("Controls:", 460, 240);
                pop();

                gameTime=60;
                caught=0;
                escaped=0;
            }

            if (gameState==3){

                //count down the timer
                if (frameCount%60==0 && gameTime>0){
                    gameTime-=1;
                }

                //go through the free puffles
                for (let i = 0; i < puffles.length; i++){
                    let status = puffles[i].moveAndDisplay();
                    if (status =="escaped"){
                        escaped+=1;
                        puffles.splice(i,1);
                        i= i - 1;
                    }
                    else{
                        let status2=puffles[i].checkCollected();
                        if (status2=="collected"){
                            pufflesCaught.push(puffles[i]);
                            puffles.splice(i,1);
                            i= i - 1;
                        }
                    }

                    if (puffles.length==0){
                        gameState=4;
                    }

                    //console.log(puffles[i])
                }


                //caught puffle array
                for (let k=0; k < pufflesCaught.length; k++){
                    pufflesCaught[k].moveAndDisplay();
                    let status=pufflesCaught[k].checkCollected();
                    if(status=="free"){
                        puffles.push(pufflesCaught[k]);
                        pufflesCaught.splice(k,1);
                        k= k - 1;
                    }
                }

                //caught counter
                caught=pufflesCaught.length;

                //count the time down & display
                fill(225);
                ellipse(725, 35, 50, 50);
                push();
                fill(0);
                textSize(20);
                textAlign(CENTER);
                textFont(cpFont);
                text(gameTime, 725, 41);
                fill(255);
                textAlign(LEFT);
                text("CAUGHT: "+ caught,30,26);
                text("ESCAPED: " + escaped, 30,46);
                pop();

                //ways for the game to end
                //here shira
                if (puffles.length==0 || gameTime<=0){
                    gameState=4;
                    puffleScore=gameTime*caught;
                    coinsEarned=int(puffleScore/10);
                    totalPuffleCoins+=coinsEarned;
                }
            }

            else if (gameState==4){

                //screen graphics
                push();
                imageMode(CENTER);
                fill(1,153,204);
                rectMode(CENTER);
                rect(width/2,height/2,415,395,20);
                image(puffleEnd,width/2,height/2,400,380);
                textFont(cpFont);
                stroke(0);
                strokeWeight(4);
                fill(255);
                textSize(50);
                textAlign(CENTER);
                text("SCORE:", width/2, 125);
                noStroke();
                fill(0);
                textSize(20);
                text(gameTime + " seconds left", width/2, 170);
                text('x', width/2, 190);
                text(caught + " puffles caught", width/2, 210);
                text("total score: " + puffleScore, width/2, 270);
                text("coins this round: " + coinsEarned, width/2, 300);
                text("total coins: " + totalPuffleCoins, width/2,330);
                fill(235, 225, 40);
                textSize(30);
                stroke(1);
                strokeWeight(4);
                text("PLAY MORE", 310, 400);
                fill(1,153,204);
                text("FINISH", 505, 400);
                pop();

                if(gameTime >= 30 && caught==10){
                    let checkTest = checkStampAndUpdate('puffle30');
                    if(checkTest){
                        textText = 'money bag collected';
                        testStamp = puffle30;
                        newStampFunctionExecuted = false;
                    }
                }
            }
        }

        //gate lines

        /*
        push();
        stroke(0);
        strokeWeight(10);
        stroke(255,0,0);
        pop();

        line(345,270,345,400);
        line(460,270,460,400);
        line(345,400,460,400);
        */
    }

    //theater
    else if (state==2){
        console.log("hi");
        push();
        imageMode(CORNER);
        image(stageBg,0,0, 800, 500);
        pop();
        image(pIcon, xPos, yPos, 70,70);
    }

    //pizzeria
    else if (state==3){
        push();
        imageMode(CORNER);
        image(pizzeriaBg,0,0, 800, 500);
        pop();
        image(pIcon, xPos, yPos, 70,70);

        if (pizzeriaSound.isPlaying()==false && canSoundPlay==true){
            pizzeriaSound.loop();
        }
    }

    //dojo courtyard
    else if (state==4){
        push();
        imageMode(CORNER);
        image(dojoCyBg,0,0, 800, 500);
        pop();
        image(pIcon, xPos, yPos, 70,70);
    }

    else if (state==5){
        push();
        imageMode(CORNER);
        image(dojoBg,0,0, 800, 500);
        pop();
        image(pIcon, xPos, yPos, 70,70);

        if (dojoSound.isPlaying()==false && canSoundPlay==true){
            dojoSound.loop();
        }
    }

    else if (state==6){
        push();
        imageMode(CORNER);
        image(townBg,0,0, 800, 500);
        pop();
        image(pIcon, xPos, yPos, 70,70);
    }

    else if (state==7){
        push();
        imageMode(CORNER);
        image(clubBg,0,0, 800, 500);
        pop();
        image(pIcon, xPos, yPos, 70,70);
    }

    else if (state==8){
        push();
        imageMode(CORNER);
        image(loungeBg,0,0, 800, 500);
        pop();
        image(pIcon, xPos, yPos, 70,70);
    }

    else if (state==9){
        push();
        imageMode(CORNER);
        image(villageBg,0,0, 800, 500);
        pop();
        image(pIcon, xPos, yPos, 70,70);
    }


    //stuff that exists on every screen
    if (mode==0){
        image(mapIcon,50,450,50,60);
        image(stampIcon,110,450,60,60);

        //HOVER ICONS
        //open map icon on hover
        if((dist(50,450, mouseX, mouseY)<30) && mapState==false){
            image(openMap,50,450,60,60);
            mouseIconState=true;
            cursor(HAND);
        }
        //if hover over stamp icon
        else if (dist(mouseX,mouseY,100,450)<30){
            cursor(HAND);
        }
        //rooms in the plaza
        else if (state==0){
            //petshop door
            if (mouseX>155 && mouseX<195 && mouseY>225 && mouseY<281){
                cursor(HAND);
            }

            //stage door 1
            else if (mouseX>366 && mouseX<409 && mouseY>175 && mouseY<237){
                cursor(HAND);
            }
            
            //stage door 2
            else if (mouseX>478 && mouseX<524 && mouseY>175 && mouseY<237){
                cursor(HAND);
            }

            //pizzeria door
            else if (mouseX>589 && mouseX<655 && mouseY>180 && mouseY<249){
                cursor(HAND);
            }
            else {
                cursor(ARROW);
            }
        }
        //petshop doors
        else if (state==1){
            //leaving
            if (mouseX>337 && mouseX<532 && mouseY>14 && mouseY<194){
                cursor(HAND);
            }
            //puffle game
            else if (mouseX>721 && mouseX<780 && mouseY>97 && mouseY<237){
                cursor(HAND);
            }
            else {
                cursor(ARROW);
            }
        }
        //leaving theater
        else if (state==2){
            if (mouseX>45 && mouseX<85 && mouseY>245 && mouseY<347){
                cursor(HAND);
            }
            else{
                cursor(ARROW);
            }
        }
        //leaving pizzeria
        else if (state==3){
            if (mouseX>383 && mouseX<500 && mouseY>57 && mouseY<230){
                cursor(HAND);
            }
            //Pizza Game
            else if(mouseX>170 && mouseX<235 && mouseY>30 && mouseY<214){
                cursor(HAND);
            }
            else{
                cursor(ARROW);
            }
            
        }
        //dojo
        else if (state==4){
            //door
            if(mouseY>228 && mouseY<300 && mouseX>335 && mouseX<459){
                cursor(HAND);
            }
            else{
                cursor(ARROW);
            }
        }

        else if (state==5 && mouseX>188 && mouseX<235 && mouseY>215 && mouseY<293){
            cursor(HAND);
        }
        //cardjitsu
        else if(mouseX>526 && mouseX<632 && mouseY>194 && mouseY<302){
                cursor(HAND);
        }

        //things in the plaza
        else if (state==6){
            if (mouseX>337 && mouseX<390 && mouseY>133 && mouseY<246){
                cursor(HAND);
            }//coffee Shop AARON
            else if (mouseX>262 && mouseX<295 && mouseY>180 && mouseY<231){
                cursor(HAND);
            }
            //gift Shop AARON
            else if (mouseX>538 && mouseX<590 && mouseY>177 && mouseY<239){
                cursor(HAND);
            }
            else{
                cursor(ARROW);
            }
        }

        //doors in the night club
        else if (state==7){
            //exit door
            if (mouseX>49 && mouseX<102 && mouseY>148 && mouseY<288){
                cursor(HAND);
            }
            else if (mouseX>670 && mouseX<758 && mouseY>104 && mouseY<364){
                cursor(HAND);
            }
            else{
                cursor(ARROW);
            }
        }

        //leaving the club upstairs
        else if (state==8){
            if(mouseX>737 && mouseX<800 && mouseY>329 && mouseY<500){
                cursor(HAND);
            }
            else if (mouseX>572 && mouseX<666 && mouseY>81 && mouseY<224){
                cursor(HAND);
            }
            else{
                cursor(ARROW);
            }
        
        }

        //SKI VILLAGE /epf
        else if (state==9 && mouseX>697 && mouseX<729 && mouseY>158 && mouseY<224){
            cursor(HAND);
        }

        //close when off
        else{
            mapIconState=false;
            cursor(ARROW);
        }

        //display map
        if (mapState==true){
            push();
            fill(0,180);
            rect(0,0,800,500);
            pop();
            image(mapGraphic, width/2, height/2,600,400);

            //hover over items
            //ik this is bulkier than needed but easier to read

            //dojo courtyard
            if (mouseY>141 && mouseY<172 && mouseX>425 && mouseX<464){
                cursor(HAND);
            }
            //town
            else if (mouseY>240 && mouseY<284 && mouseX>270 && mouseX<360){
                cursor(HAND);
            }
            //plaza
            else if (mouseY>236 && mouseY<272 && mouseX>441 && mouseX<513){
                cursor(HAND);
            }
            //ski village
            else if (mouseX>234 && mouseX<267 && mouseY>216 && mouseY<238){
                cursor(HAND);
            }
            //X button
            else if (dist (660, 70, mouseX, mouseY)<16){
                cursor(HAND);
            }
            else{
                cursor(ARROW);
            }
        }
    }

    //HOVER things within games
    else if (mode==1 && state==1){
        if (gameState==1 && mouseX>457 && mouseX<544 && mouseY>359 && mouseY<392){
            cursor(HAND);
        }
        else if (gameState==2 && mouseX>417 && mouseX<511 && mouseY>366 && mouseY<400){
            cursor(HAND);
        }
        else if (gameState==4 && mouseX>246 && mouseX<372 && mouseY>373 && mouseY<402){
            cursor(HAND);
        }
        else if (gameState==4 && mouseX>468 && mouseX<537 && mouseY>372 && mouseY<400){
            cursor(HAND);
        }
        else if(dist(mouseX,mouseY,772,25)<12){
            cursor(HAND);
        }
        else {
            cursor(ARROW);
        }
    }

    fill(0);

    //reference control CONSOLE LOGS fran
    /*

    text("Mouse X: " + mouseX, 20, 20);
    text("Mouse Y: " + mouseY, 20, 40);
    text("State: " + state, 20, 60);
*/
    
}

function mousePressed(){
    canSoundPlay=true;

    if (mode==0){ //no game

        //penguin movement
        if (clickX==false){
            //constrain for plaza
            if (state==0){
                xDesired = constrain(mouseX,100,700);
                yDesired = constrain(mouseY,250,460);
            }
            //constrian for petshop
            else if (state==1){
                xDesired = constrain(mouseX,100,700);
                yDesired = constrain(mouseY,190,460);
            }
            //constrain for stage
            else if (state==2){
                xDesired = constrain(mouseX,100,700);
                yDesired = constrain(mouseY,160,460);
            }
            //constrain for pizzeria
            else if (state==3){
                xDesired = constrain(mouseX,100,700);
                yDesired = constrain(mouseY,226,460);
            }
            //constrain for dojo courtyard
            else if (state==4){
                xDesired = constrain(mouseX,100,583);
                yDesired = constrain(mouseY,308,377);
            }
            //constrain for dojo
            else if (state==5){
                xDesired = constrain(mouseX,180,634);
                yDesired = constrain(mouseY,250,460);
            }
            //constrain for town
            else if (state==6){
                xDesired = constrain(mouseX,180,634);
                yDesired = constrain(mouseY,250,460);
            }
            //constrain for night club
            else if (state==7){
                xDesired = constrain(mouseX,180,634);
                yDesired = constrain(mouseY,250,460);
            }
            //constrain for night club lounge
            else if (state==8){
                xDesired = constrain(mouseX,180,634);
                yDesired = constrain(mouseY,250,460);
            }
            //constrain for ski village
            else if (state==9){
            xDesired = constrain(mouseX,180,760);
            yDesired = constrain(mouseY,250,460);
            }

        }
        else{
            clickX=false;
        }

        //see if entering any rooms on plaza
        if (state==0){
            //petshop door
            if (mouseX>155 && mouseX<195 && mouseY>225 && mouseY<281){
                state=1;
                resetPenguin(state);
            }

            //stage door 1
            else if (mouseX>366 && mouseX<409 && mouseY>175 && mouseY<237){
                state=2;
                resetPenguin(state);
            }
            
            //stage door 2
            else if (mouseX>478 && mouseX<524 && mouseY>175 && mouseY<237){
                state=2;
                resetPenguin();
            }

            //pizzeria door
            else if (mouseX>589 && mouseX<655 && mouseY>180 && mouseY<249){
                state=3;
                resetPenguin(state);
                if(canSoundPlay==true){
                    pizzeriaSound.loop();

                }
            }
        }

        //petshop
        if (state==1){
            //exit door
            if (mouseX>337 && mouseX<532 && mouseY>14 && mouseY<194){
                state=0;
                resetPenguin(state);
            }
            //puffle game from main room
            else if (mouseX>721 && mouseX<780 && mouseY>97 && mouseY<237){
                gameState=1; //when on game running //change to 1 when everything implemented
                mode=1; //game on
                //cursor(ARROW); 

                puffles=[];
                pufflesCaught=[];

                //populate puffle array
                for (let i = 0; i < 10; i++){
                    temp = new Puffle();
                    puffles.push(temp);
                }

                if (canSoundPlay==true){
                    puffleGameSound.loop();
                }
            }
        }

        //leaving theater
        if (state==2 && mouseX>45 && mouseX<85 && mouseY>245 && mouseY<347){
            state=0;
            resetPenguin(state);
        }

        //leaving pizzeria
        if (state==3){
            if (mouseX>383 && mouseX<500 && mouseY>57 && mouseY<230){
                state=0;
                resetPenguin(state);
            }
            else if (mouseX>170 && mouseX<235 && mouseY>30 && mouseY<214){
                //DARIUSH PIZZA GAME
                window.localStorage.setItem('cpState',state);
                localStorage.setItem("gameObj", JSON.stringify(gameObj));
                window.location = "pizzatron.html";
            }
        }

        //see if going from dojo courtyard into dojo
        if (state==4 && mouseY>228 && mouseY<300 && mouseX>335 && mouseX<459){
            state=5;
            resetPenguin(state);
            if (canSoundPlay==true){
                dojoSound.loop();
            }
        }

        //dojo
        if (state==5){
            //leave
            if(mouseX>188 && mouseX<235 && mouseY>215 && mouseY<293){
                state=4;
                resetPenguin(state);
            }
            //play cardjitsu
            else if (mouseX>526 && mouseX<632 && mouseY>194 && mouseY<302){
                //LINK TO CARDJITSU SHIRA
                window.localStorage.setItem('cpState',state);
                localStorage.setItem("gameObj", JSON.stringify(gameObj));
                window.location = 'cardjitsu.html';  
            }
        }

        //things in the plaza
        else if (state==6){
            if (mouseX>337 && mouseX<390 && mouseY>133 && mouseY<246){
                //to the club
                state=7;
                resetPenguin(state);
                if (canSoundPlay==true){
                    clubSound.loop();
                }
            }//coffee Shop AARON
            else if (mouseX>262 && mouseX<295 && mouseY>180 && mouseY<231){
                //ADD AARON ROOM
                for(let i = 0; i < gameObj.badgesEarned.length; i++){
                    if(gameObj.badgesEarned[i].visualizerHTML == "visualizer1"){
                    window.location = "aaron/index.html";
                }
                }
                

            }
            //gift Shop AARON
            else if (mouseX>538 && mouseX<590 && mouseY>177 && mouseY<239){
                //ADD AARON ROOM
                for(let i = 0; i < gameObj.badgesEarned.length; i++){
                    if(gameObj.badgesEarned[i].visualizerHTML == "visualizer2"){
                    console.log(gameObj);
                    window.location = "aaron/index1.html";
                }
                }
            }
        }

        //in the club
        else if (state==7){
            //exit door
            if (mouseX>49 && mouseX<102 && mouseY>148 && mouseY<288){
                state=6;
                resetPenguin(state);
            }
            //to upstairs
            else if (mouseX>670 && mouseX<758 && mouseY>104 && mouseY<364){
                state=8;
                resetPenguin(state);
            }
        }

        //playing THIN ICE
        else if (state==8 && mouseX>572 && mouseX<666 && mouseY>81 && mouseY<224){
            //play game
            //SHIRA
            window.localStorage.setItem('cpState',state);
            localStorage.setItem("gameObj", JSON.stringify(gameObj));
            window.location = "thinIce.html";
        }

        //leaving upstairs of the club
        else if (state==8 && mouseX>757 && mouseX<800 && mouseY>329 && mouseY<500){
            state=7;
            resetPenguin(state);
        }

        //SKI VILLAGE 
        else if (state==9 && mouseX>697 && mouseX<729 && mouseY>158 && mouseY<224){
            //LINK TO AARONS GAME
            for(let i = 0; i < gameObj.badgesEarned.length; i++){
                if(gameObj.badgesEarned[i].visualizerHTML == "visualizer3"){
                    window.location = "aaron/index2.html";
            }
            }
        }


        //see if clicked on map
        if(dist(50,450, mouseX, mouseY)<30){
            mapState=true;
            //console.log("click");
        }
        //see if stamp is clicked on
        else if (dist(mouseX,mouseY,100,450)<30){
            localStorage.setItem("gameObj", JSON.stringify(gameObj));
            window.localStorage.setItem('cpState',state);
            window.location = 'badge.html';
        } 

        //while on the map
        if (mapState==true){
            //clicking on the X button
            if (dist (660, 70, mouseX, mouseY)<20){
                mapState=false;
                clickX=true;
            }

            //dojo courtyard
            else if(mouseY>141 && mouseY<172 && mouseX>425 && mouseX<464){
                state=4;
                mapState=false;
                resetPenguin(state);
            }

            //town
            else if (mouseY>240 && mouseY<284 && mouseX>270 && mouseX<360){
                state=6;
                mapState=false;
                resetPenguin(state);
            }

            //plaza
            else if (mouseY>236 && mouseY<272 && mouseX>441 && mouseX<513){
                state=0;
                mapState=false;
                resetPenguin(state);
            }
            //ski village
            else if (mouseX>234 && mouseX<267 && mouseY>216 && mouseY<238){
                state=9;
                mapState=false;
                resetPenguin();
            }
        }
    }

    //while in game
    else if (mode==1){
        //puffle game start
        if (state==1){
            //x button
            if(dist(mouseX,mouseY,772,25)<12){
                //leave game
                gameState=4;
                
            }
            if (gameState==1 && mouseX>457 && mouseX<544 && mouseY>359 && mouseY<392){
                gameState=2;
                totalPuffleCoins=0;
            }
            else if (gameState==2 && mouseX>417 && mouseX<511 && mouseY>366 && mouseY<400){
                gameState=3;
            }
            //play more
            else if (gameState==4 && mouseX>246 && mouseX<372 && mouseY>373 && mouseY<402){
                //reset game variables
                puffles=[];
                pufflesCaught=[];

                //populate puffle array
                for (let i = 0; i < 10; i++){
                    temp = new Puffle();
                    puffles.push(temp);
                }

                gameTime=60;
                caught=0;
                escaped=0;
                gameState=3;
            }

            else if (gameState==4 && mouseX>468 && mouseX<537 && mouseY>372 && mouseY<400){
                //leave game
                gameState=0;
                mode=0;
                state=1;
                puffleGameSound.stop();
            }
        }
    }
    if(newStampFunctionExecuted == false){
        newStamp(testStamp, textText);
        }
}

function resetPenguin(state){
    window.localStorage.setItem("cpState", state);
    clickX=true;
    if (state==3){
        xDesired=438;
        yDesired=241;
    }
    else{
        xDesired=400;
        yDesired=350;
    }

    if(clubSound.isPlaying()==true || dojoSound.isPlaying()==true || pizzeriaSound.isPlaying()==true){
        clubSound.stop(); 
        dojoSound.stop();
        pizzeriaSound.stop();
    }
}


class Puffle{
    constructor(){
        this.x=random(100,700);
        this.y=random(170,450);

        //adding perlin noise to the puffle movement
        this.xNoiseOffset = random(0,1000);
        this.yNoiseOffset = random(1000,2000);

        
        //make sure doenst spawn too close to box
        while(this.x>300 && this.x<500 && this.y>250 && this.y<430){
            this.x=random(100,700);
            this.y=random(170,470);
        }
        

        this.c=int(random(1,10)); //to pick a random color

        if (this.c==1){
            this.graphic=pinkPuffle;
        }
        else if (this.c==2){
            this.graphic=redPuffle;
        }
        else if (this.c==3){
            this.graphic=orangePuffle;
        }
        else if (this.c==4){
            this.graphic=yellowPuffle;
        }
        else if (this.c==5){
            this.graphic=greenPuffle;
        }
        else if (this.c==6){
            this.graphic=bluePuffle;
        }
        else if (this.c==7){
            this.graphic=purplePuffle;
        }
        else if (this.c==8){
            this.graphic=blackPuffle;
        }
        else if (this.c==9){
            this.graphic=brownPuffle;
        }
    }

    moveAndDisplay(){
        //display graphic
        image(this.graphic, this.x, this.y, 40, 40);

        //move puffle
        let mouseDistance = int(dist(this.x, this.y, mouseX, mouseY)); // check the distance from your mouse to the shape

        // compute how much we should move
        let xMovement = map( noise(this.xNoiseOffset), 0, 1, -1, 1 );
        let yMovement = map( noise(this.yNoiseOffset), 0, 1, -1, 1 );

        this.xDist=mouseX-this.x;
        this.yDist=mouseY-this.y;

        if (mouseDistance<=60){
            if (this.xDist>0 && this.xDist<60){
                this.x-=3;
            }
            else if(this.xDist<0 && this.xDist>-60){
                this.x+=3;
            }

            if (this.yDist>0 && this.yDist<60){
                this.y-=3;
            }
            else if (this.yDist<0 && this.yDist>-60){
                this.y+=3;
            }

            this.x += xMovement*2;
            this.xNoiseOffset += 0.01;
            this.y += yMovement*2;
            this.yNoiseOffset += 0.01;
        }

        //make sure it can only enter pen from front
        //side access
        if (this.y>245 && this.y<400){
            if (this.x<365 && this.x>345){
                this.x=365;
            }
            else if (this.x<345 && this.x>325){
                this.x=325;
            }
            else if (this.x<480 && this.x>460){
                this.x=480;
            }
            else if (this.x<460 && this.x>440){
                this.x=440;
            }
        }

        if (this.x>325 && this.x<480){
            if(this.y>360 && this.y<395){
                this.y=360;
            }
            else if (this.y>395 && this.y<420){
                this.y=420;
            }
        }

        if (this.y<250 && this.y>245){
            if ((this.x>325 && this.x<365) || (this.x>440 && this.x<480)){
                this.y=245;
            }
        }

        //check to see if puffle goes off bounds
        if(this.x>770 || this.x<30 || this.y<50 || this.y>470){
            return "escaped";
        }
    }

    //see if the puffle is in the cage
    checkCollected(){
        if (this.x>345 && this.x<460 && this.y>270 && this.y<370){
            return "collected";
        }
        else{
            return "free";
        }
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
