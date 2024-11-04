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
let runCJ=true;

let cards=[];
let fire=0, snow=0, water=0; 
let oppFire=0, oppSnow=0, oppWater=0;

let currentElement, currentNum, currentColor;
let currentCard;
let currentGraphic;

let oppCountdown;
let oppColor, oppElement, oppNum;
let oppGraphic;
let oppBlank;
let oppChance;

let dojoCountdown=2;
let flipping=false;
let determineWin=false;
let pickNum;

let winAnimation=false;
let winner;
let winX, winY, winGraphic;
let winParticles=[];

//sound info
let cjCanPlaySong=false;
let cardLoop;

//text to see if both sides have chosen
let youPicked=false, oppPicked=false;

//stamp variables
let newStampFunctionExecuted = true;
let testStamp;
let textText;
let oneElement, allElements;


function preload(){
    //cardjitsu
    card1=loadImage("images/cardjitsu/card1.png");
    card2=loadImage("images/cardjitsu/card2.png");
    card3=loadImage("images/cardjitsu/card3.png");
    card4=loadImage("images/cardjitsu/card4.png");
    card5=loadImage("images/cardjitsu/card5.png");
    card6=loadImage("images/cardjitsu/card6.png");
    card7=loadImage("images/cardjitsu/card7.png");
    card8=loadImage("images/cardjitsu/card8.png");
    card9=loadImage("images/cardjitsu/card9.png");
    card10=loadImage("images/cardjitsu/card10.png");
    card11=loadImage("images/cardjitsu/card11.png");
    card12=loadImage("images/cardjitsu/card12.png");
    card13=loadImage("images/cardjitsu/card13.png");
    card14=loadImage("images/cardjitsu/card14.png");
    card15=loadImage("images/cardjitsu/card15.png");
    card16=loadImage("images/cardjitsu/card16.png");
    card17=loadImage("images/cardjitsu/card17.png");
    card18=loadImage("images/cardjitsu/card18.png");
    card19=loadImage("images/cardjitsu/card19.png");
    card20=loadImage("images/cardjitsu/card20.png");
    card21=loadImage("images/cardjitsu/card21.png");
    card22=loadImage("images/cardjitsu/card22.png");
    card23=loadImage("images/cardjitsu/card23.png");
    card24=loadImage("images/cardjitsu/card24.png");
    card25=loadImage("images/cardjitsu/card25.png");
    cardBack=loadImage("images/cardjitsu/cardBack.png");
    cardBB=loadImage("images/cardjitsu/cardBackBig.png")
    cardBg=loadImage("images/cardjitsu/cardBg.png");
    blank1=loadImage("images/cardjitsu/blankCard.png");
    blank2=loadImage("images/cardjitsu/blankCard2.png");
    fireIcon=loadImage("images/cardjitsu/fire.png");
    waterIcon=loadImage("images/cardjitsu/water.png");
    snowIcon=loadImage("images/cardjitsu/snow.png");
    exit=loadImage("images/cardjitsu/exit.png");
    you=loadImage("images/cardjitsu/you.png");
    opp=loadImage("images/cardjitsu/opp.png");
    oneElement=loadImage("images/OneElement.png");
    allElements=loadImage("images/allElements.png");

    //fonts
    cpFont=loadFont("fonts/vanillaCaramel.otf");

    //sounds
    cardLoop=loadSound("sounds/cardjitsu.mp3");}

function setup(){
    var canvas = createCanvas(800,500);
    canvas.parent("#canvas");
    noStroke(); 

    //accessing game object 
    if (window.localStorage.getItem('gameObj')) {
        let temp = window.localStorage.getItem('gameObj') ;
        gameObj = JSON.parse(temp);
        console.log(gameObj);
    }
    console.log(gameObj);

    //setup the array of cards
    for (let i=0; i<5; i++){
        temp = new Card();
        cards.push(temp);
    }

    oppBlank=int(random(1,6));

    oppCountdown=int(random(3,8));

    winCountdown=3;
}   

function draw(){
    push();
    imageMode(CORNER);
    image(cardBg,0,0,800,500);
    push();
    imageMode(CENTER);
    image(exit,780,20,25,25); 
    image(you,250,270,130,170);
    image(opp,550,270,130,170);
    pop();
    fill(255);

    //text("mouseX: " + mouseX,10,20);
    //text("mouseY: " + mouseY,10,35);
    /*
    text("fire: " + fire, 10, 20);
    text("water: " + water, 10, 40);
    text("snow: " + snow, 10, 60);
    push();
    textAlign(RIGHT);
    text("fire: " + oppFire, 780, 20);
    text("water: " + oppWater, 780, 40);
    text("snow: " + oppSnow, 780, 60);
    pop();
    */

    //display elements as you win
    if(fire>=1){
        elementBox(fireIcon,65,30);
    }
    if (fire>=2){
        elementBox(fireIcon,65,50);
    }
    if (fire==3){
        elementBox(fireIcon,65,70);
    }
    if (water>=1){
        elementBox(waterIcon,125,30);
    }
    if (water>=2){
        elementBox(waterIcon,125,50);
    }
    if (water==3){
        elementBox(waterIcon,125,70);
    }
    if (snow>=1){
        elementBox(snowIcon,185,30);
    }
    if (snow>=2){
        elementBox(snowIcon,185,50);
    }
    if (snow==3){
        elementBox(snowIcon,185,70);
    }

    //display elements as opponent gets points
    if(oppFire>=1){
        elementBox(fireIcon,615,30);
    }
    if (oppFire>=2){
        elementBox(fireIcon,615,50);
    }
    if (oppFire==3){
        elementBox(fireIcon,615,70);
    }
    if (oppWater>=1){
        elementBox(waterIcon,675,30);
    }
    if (oppWater>=2){
        elementBox(waterIcon,675,50);
    }
    if (oppWater==3){
        elementBox(waterIcon,675,70);
    }
    if (oppSnow>=1){
        elementBox(snowIcon,735,30);
    }
    if (oppSnow>=2){
        elementBox(snowIcon,735,50);
    }
    if (oppSnow==3){
        elementBox(snowIcon,735,70);
    }


    fill(0);
    textFont(cpFont);
    textSize(20);
    text("PLAYER 1", 35, 410);
    for (let i=0; i<5; i++){
        if (i==0){
            cards[i].display(70,455);
        }
        else if (i==1){
            cards[i].display(145,455);
        }
        else if (i==2){
            cards[i].display(220,455);
        }
        else if (i==3){
            cards[i].display(295,455);
        }
        else if (i==4){
            cards[i].display(370,455);
        }
    }


    push();
    textAlign(RIGHT);
    text("PLAYER 2", 755, 410);
    pop();

    image(cardBack, 715,415,40,45);
    image(cardBack, 675, 415,40,45);
    image(cardBack, 635, 415,40,45);
    image(cardBack, 595, 415,40,45);
    image(cardBack, 555, 415,40,45);


    //gameplay

    push();
    imageMode(CENTER);

    //display our pick when made
    if(youPicked==true){
        image(currentGraphic, 278,185,120, 140);
    }

    //countdown to when opp picks a card
    if (frameCount%60==0){
        oppCountdown-=1;
        dojoCountdown-=1;
        winCountdown-=1;
    }

    //console.log(oppCountdown);
    if (oppCountdown<=0 && flipping==false && determineWin==false && winAnimation==false && runCJ==true){
        oppGraphic=cardBB;
        oppPicked=true;
    }
    //display opp pick graphic 
    if (oppPicked==true && runCJ==true){
        image(oppGraphic,522, 185, 120,140);

        push();
        imageMode(CORNER);
        if(oppBlank==1){
            image(blank2, 715,415,40,45);
        }
        else if (oppBlank==2){
            image(blank2, 675, 415,40,45);
        }
        else if (oppBlank==3){
            image(blank2, 635, 415,40,45);
        }
        else if (oppBlank==4){
            image(blank2, 595, 415,40,45);
        }
        else if (oppBlank==5){
            image(blank2, 555, 415,40,45);
        }
        pop();
    }

    //when both are picked
    if (oppPicked==true && youPicked==true && flipping==false && determineWin==false && winAnimation==false){
        dojoCountdown=2;
        flipping=true;
    }

    //display both
    if (oppPicked==true && youPicked==true && flipping==true && dojoCountdown<=0){
        //console.log("flipped!");
        oppPick(fire, snow, water, oppFire, oppSnow, oppWater);
        flipping=false;
        determineWin=true;
    }

    //determine winner of round
    if(determineWin==true){

        //when you win
        //your element beats opp element
        //fire beats snow
        if (currentElement==1 && oppElement==3){
            fire+=1;
            winner="you";
            winGraphic=fireIcon;
        }

        //snow beats water
        else if (currentElement==3 && oppElement==2){
            snow+=1;
            winner="you";
            winGraphic=snowIcon;
        }
        
        //water beats fire
        else if (currentElement==2 && oppElement==1){
            water+=1;
            winner="you";
            winGraphic=waterIcon;
        }

        //you both pick the same element but your num is higher
        //fire
        else if (currentElement==1 && oppElement==1 && currentNum>oppNum){
            fire+=1;
            winner="you";
            winGraphic=fireIcon;
        }

        //water
        else if (currentElement==2 && oppElement==2 && currentNum>oppNum){
            water+=1;
            winner="you";
            winGraphic=waterIcon;
        }

        //snow
        else if (currentElement==3 && oppElement==3 && currentNum>oppNum){
            snow+=1;
            winner="you";
            winGraphic=snowIcon;
        }

        //the AI wins
        //they picked fire
        else if (oppElement==1){
            //you pick snow or you both pick fire and their number is higher
            if ((currentElement==3) || (currentElement==1 && currentNum<oppNum)){
                oppFire+=1;
                winner="opp";
                winGraphic=fireIcon;
            }
        }
        //they picked water
        else if (oppElement==2){
            //you pick fire or you both pick water and their number is higher
            if ((currentElement==1) || (currentElement==2 && currentNum<oppNum)){
                oppWater+=1;
                winner="opp";
                winGraphic=waterIcon;
            }
        }
        //they picked snow
        else if (oppElement==3){
            //you pick water or you both pick snow and their number is higher
            if ((currentElement==2) || (currentElement==3 && currentNum<oppNum)){
                oppSnow+=1;
                winner="opp";
                winGraphic=snowIcon;
            }
        } 

        //tie
        else if (currentElement==oppElement && currentNum==oppNum){
            winner="tie";
        }
        else {
            winner='tie';
        }
        
        if (winner=="you"){
            winX=278;
            winY=185;
        }
        else if (winner=="opp"){
            winX=522;
            winY=185;
        }

        //play win amination
        winAnimation=true;
        winCountdown=5;

        determineWin=false;

    }

    //play the win animation
    if(winAnimation==true){
        if(winner=='you'){
            if (winX<522){
                image(winGraphic,winX,winY,50,50);
                winX+=2;
            }
            else {
                for (let i=0; i<1; i++){
                    if(frameCount%2==0){
                        temp2= new winParticle(winGraphic, winner);
                        winParticles.push(temp2);
                    }
                }

                for (let k=0; k<winParticles.length; k++){
                    winParticles[k].displayAndMove();

                    if (winParticles[k].y<50){
                        winParticles.splice(k,1);
                    }
                }
            }
        }
        else if (winner=='opp'){
            if (winX>278){
                image(winGraphic,winX,winY,50,50);
                winX-=2;
            }
            else{
                for (let i=0; i<1; i++){
                    if(frameCount%2==0){
                        temp2= new winParticle(winGraphic, winner);
                        winParticles.push(temp2);
                    }
                }

                for (let k=0; k<winParticles.length; k++){
                    winParticles[k].displayAndMove();

                    if (winParticles[k].y<50){
                        winParticles.splice(k,1);
                    }
                }
            }
        }
        else{
            push();
            textSize(130);
            fill(255,0,0);
            textAlign(CENTER);
            text("TIE!",width/2, 105);
            pop();
        }

        if (winCountdown<=0){
            winAnimation=false;
            resetRound();
        }

    }

    //display the elements


    //check if the game has been won
    //you win
    //one of each element
    if (winAnimation==false){
        if (fire>=1 && water>=1 && snow>=1){
            //you win
            youWin();
            let checkTest = checkStampAndUpdate('allElements');
            if(checkTest){
                textText = 'Win with all 3 Elements';
                testStamp = allElements;
                newStampFunctionExecuted = false;
            }
            //WIN BY ONE OF EACH SHIRA
        }
        
        //if you have 3 of one element
        else if (fire==3 || water==3 || snow==3){
            //you win
            youWin();
            //WIN BY 3 OF A KIND SHIRA
            let checkTest = checkStampAndUpdate('OneElement');
            if(checkTest){
                textText = 'Win with only 1 element';
                testStamp = oneElement;
                newStampFunctionExecuted = false;
            }
        }

        //opp wins
        //one of each element
        else if (oppFire>=1 && oppWater>=1 && oppSnow>=1){
            //they win
            youLose();
        }

        //if they have 3 of one element
        else if (oppFire==3 || oppWater==3 || oppSnow==3){
            //they win
            youLose();
        }
    }

    //END
    if(newStampFunctionExecuted == false){
        console.log(testStamp);
        console.log(textText);
        newStamp(testStamp, textText);
        newStampFunctionExecuted = true;
        }

    pop();
    
}

function mousePressed(){
    //can play song
    if (cjCanPlaySong==false){
        cardLoop.loop(); 
        cjCanPlaySong=true;
    }

    //see if clicked on a card
    if (mouseY>417 && mouseY<492 && youPicked==false && runCJ==true){
        //left-most card
        if (mouseX>35 && mouseX<100){
            pickCard(0);
        }
        else if (mouseX>113 && mouseX<177){
            pickCard(1);
        }
        else if (mouseX>185 && mouseX<253){
            pickCard(2);
        }
        else if (mouseX>259 && mouseX<325){
            pickCard(3);
        }
        else if (mouseX>338 && mouseX<399){
            pickCard(4);
        }
    }

    //ways to exit the game
    if (dist(mouseX,mouseY,780,20)<12){
        //console.log("clicked"); 
        cardLoop.stop();
        localStorage.setItem("gameObj", JSON.stringify(gameObj));
        window.location = "index.html";
        //leave game
    }

    if (runCJ==false){
        cardLoop.stop();
        localStorage.setItem("gameObj", JSON.stringify(gameObj));
        window.location = "index.html";
        //exit game
    }
}

function elementBox(e,x,y){
    push();
    rectMode(CENTER);
    imageMode(CENTER);
    stroke(1);
    if(e==fireIcon){
        fill(217, 67, 56);
    }
    else if (e==waterIcon){
        fill(33, 62, 150);
    }
    else if (e==snowIcon){
        fill(81, 171, 41);
    }
    rect(x,y,50,50);
    image(e,x,y,40,40);
    pop();
}

function pickCard(n){
    currentCard=cards[n];
    currentNum=cards[n].num;
    currentColor=cards[n].color;
    currentElement=cards[n].element;
    currentGraphic=cards[n].graphic;
    cards[n].graphic=blank1;
    pickNum=n;
    youPicked=true;
}

function resetRound(){
    youPicked=false;
    oppPicked=false;
    oppCountdown=int(random(3,8));

    determineWin=false;

    //refil card
    cards[pickNum]=new Card();

    //reset win particle array
    winParticles=[];

}

function youWin(){
    runCJ=false;
    push();
    textSize(110);
    fill(255,0,0);
    textAlign(CENTER);
    text("You win!",width/2, 120);
    pop();

}

function youLose(){
    runCJ=false;
    push();
    textSize(110);
    fill(255,0,0);
    textAlign(CENTER);
    text("You lose!",width/2, 120);
    pop();
}

function oppPick(f,s,w,oF, oS, oW){
    //ai logic
    //small chance of selecting random
    oppChance=int(random(1,11));
    if(oppChance==7){
        oppElement=int(random(1,4));
        oppNum=int(random(2,9));
    }
    //offense
    //if has 2 fire then it picks fire
    if (oF==2){
        oppElement=1;
        oppNum=int(random(2,9));
    }
    //if has 2 water then it picks water
    else if (oW==2){
        oppElement=2;
        oppNum=int(random(2,11));
        while(oppNum==9){
            oppNum=int(random(2,11));
        }
    }
    //if has 2 snow then it picks snow
    else if (oS==2){
        oppElement=3;
        oppNum=int(random(2,9));
    }
    //if at least of of 2 pick the other
    //if at least one of fire and water, pick snow
    else if (oF>=1 && oW>=1){
        oppElement=3;
        oppNum=int(random(2,9));
    }
    //if at least one water and one snow, pick fire
    else if (oW>=1 && oS>=1){
        oppElement=1;
        oppNum=int(random(2,9));
    }
    //if at least one snow and one fire, pick water
    else if(oS>=1 && oF>=1){
        oppElement=2;
        oppNum=int(random(2,11));
        while(oppNum==9){
            oppNum=int(random(2,11));
        }
    }

    //defense
    //if 2 fire then it picks a water
    else if (f==2){
        oppElement=2;
        oppNum=int(random(2,11));
        while(oppNum==9){
            oppNum=int(random(2,11));
        }
    }
    //if 2 water then it picks ice
    else if (w==2){
        oppElement=3;
        oppNum=int(random(2,9));
    }
    //if 2 snow then it picks fire
    else if (s==2){
        oppElement=1;
        oppNum=int(random(2,9));
    }
    //if at least of of 2 pick the other
    //if at least one of fire and water, assume snow, pick fire
    else if (f>=1 && w>=1){
        oppElement=1;
        oppNum=int(random(2,9));
    }
    //if at least one water and one snow, assume fire, pick water
    else if (w>=1 && s>=1){
        oppElement=2;
        oppNum=int(random(2,11));
        while(oppNum==9){
            oppNum=int(random(2,11));
        }
    }
    //if at least one snow and one fire, assume water, pick snow
    else if(s>=1 && f>=1){
        oppElement=3;
        oppNum=int(random(2,9));
    }
    //if it doesnt fill all requirements, pick random
    else{
        oppElement=int(random(1,4));
        oppNum=int(random(2,9));
    }

    //get graphic & color for each card
    //fire
    if (oppElement==1){
        if (oppNum==2){
            oppColor=5;
            oppGraphic=card6;
        }
        else if (oppNum==3){
            oppColor=6;
            oppGraphic=card17;
        }
        else if (oppNum==4){
            let oppPick2=int(random(1,3));
            if (oppPick2==1){
                oppColor=4;
                oppGraphic=card5;
            }
            else {
                oppColor=1;
                oppGraphic=card13;
            }
        }
        else if (oppNum==5){
            oppColor=4;
            oppGraphic=card19;
        }
        else if (oppNum==6){
            oppColor=3;
            oppGraphic=card24;
        }
        else if (oppNum==7){
            oppColor=2;
            oppGraphic=card21;
        }
        else if (oppNum==8){
            oppColor=1;
            oppGraphic=card14;
        }
    }

    //water
    else if (oppElement==2){
        if (oppNum==2){
            oppColor=2;
            oppGraphic=card20;
        }
        else if (oppNum==3){
            oppColor=4;
            oppGraphic=card22;
        }
        else if (oppNum==4){
            oppColor=3;
            oppGraphic=card3;
        }
        else if (oppNum==5){
            oppColor=1;
            oppGraphic=card12;
        }
        else if (oppNum==6){
            let oppPick2=int(random(1,3));
            if (oppPick2==1){
                oppColor=5;
                oppGraphic=card9;
            }
            else {
                oppColor=2;
                oppGraphic=card10;
            }
        }
        else if (oppNum==7){
            oppColor=6;
            oppGraphic=card25;
        }
        else if (oppNum==8){
            oppColor=4;
            oppGraphic=card23;
        }
        else if (oppNum==10){
            oppColor=3;
            oppGraphic=card4;
        }
    }

    //snow
    else if (oppElement==3){
        if (oppNum==2){
            oppColor=3;
            oppGraphic=card1;
        }
        else if (oppNum==3){
            oppColor=1;
            oppGraphic=card18;
        }
        else if (oppNum==4){
            oppColor=2;
            oppGraphic=card15;
        }
        else if (oppNum==5){
            let oppPick2=int(random(1,3));
            if (oppPick2==1){
                oppColor=5;
                oppGraphic=card11;
            }
            else {
                oppColor=6;
                oppGraphic=card16;
            }
        }
        else if (oppNum==6){
            oppColor=6;
            oppGraphic=card2;
        }
        else if (oppNum==7){
            oppColor=3;
            oppGraphic=card7;
        }
        else if (oppNum==8){
            oppColor=4;
            oppGraphic=card8;
        }
    }

    oppBlank=int(random(1,6));

}


class Card{
    constructor(){
        this.pick = int (random(1,26));
        
        //fire
        if (this.pick==1){
            this.element=1;
            this.color=5;
            this.num=2;
            this.graphic=card6;
        }
        else if (this.pick==2){
            this.element=1;
            this.color=6;
            this.num=3;
            this.graphic=card17;
        }
        else if (this.pick==3){
            this.element=1;
            this.color=4;
            this.num=4;
            this.graphic=card5;
        }
        else if (this.pick==4){
            this.element=1;
            this.color=1;
            this.num=4;
            this.graphic=card13;
        }
        else if (this.pick==5){
            this.element=1;
            this.color=4;
            this.num=5;
            this.graphic=card19;
        }
        else if (this.pick==6){
            this.element=1;
            this.color=3;
            this.num=6;
            this.graphic=card24;
        }
        else if (this.pick==7){
            this.element=1;
            this.color=2;
            this.num=7;
            this.graphic=card21;
        }
        else if (this.pick==8){
            this.element=1;
            this.color=1;
            this.num=8;
            this.graphic=card14;
        }
        //water
        else if (this.pick==9){
            this.element=2;
            this.color=2;
            this.num=2;
            this.graphic=card20;
        }
        else if (this.pick==10){
            this.element=2;
            this.color=4;
            this.num=3;
            this.graphic=card22;
        }
        else if (this.pick==11){
            this.element=2;
            this.color=3;
            this.num=4;
            this.graphic=card3;
        }
        else if (this.pick==12){
            this.element=2;
            this.color=1;
            this.num=5;
            this.graphic=card12;
        }
        else if (this.pick==13){
            this.element=2;
            this.color=5;
            this.num=6;
            this.graphic=card9;
        }
        else if (this.pick==14){
            this.element=2;
            this.color=2;
            this.num=6;
            this.graphic=card10;
        }
        else if (this.pick==15){
            this.element=2;
            this.color=6;
            this.num=7;
            this.graphic=card25;
        }
        else if (this.pick==16){
            this.element=2;
            this.color=4;
            this.num=8;
            this.graphic=card23;
        }
        else if (this.pick==17){
            this.element=2;
            this.color=3;
            this.num=10;
            this.graphic=card4;
        }
        //snow
        else if (this.pick==18){
            this.element=3;
            this.color=3;
            this.num=2;
            this.graphic=card1;
        }
        else if (this.pick==19){
            this.element=3;
            this.color=1;
            this.num=3;
            this.graphic=card18;
        }
        else if (this.pick==20){
            this.element=3;
            this.color=2;
            this.num=4;
            this.graphic=card15;
        }
        else if (this.pick==21){
            this.element=3;
            this.color=5;
            this.num=5;
            this.graphic=card11;
        }
        else if (this.pick==22){
            this.element=3;
            this.color=6;
            this.num=5;
            this.graphic=card16;
        }
        else if (this.pick==23){
            this.element=3;
            this.color=6;
            this.num=6;
            this.graphic=card2;
        }
        else if (this.pick==24){
            this.element=3;
            this.color=3;
            this.num=7;
            this.graphic=card7;
        }
        else if (this.pick==25){
            this.element=3;
            this.color=4;
            this.num=8;
            this.graphic=card8;
        }
    }
    display(x,y){
        this.x=x;
        this.y=y;
        push();
        imageMode(CENTER);
        image(this.graphic,this.x,this.y,70,80);
        pop();
    }
}

class winParticle{
    constructor(winGraphic, winner){
        this.Graphic=winGraphic;
        this.winner=winner;
        this.y=random(250,225);
        
        if (this.winner=="you"){
            this.x=random(462,582);
            
        }
        else if (this.winner=="opp"){
            this.x=random(218, 338);
        }
    }
    displayAndMove(){
        push();
        imageMode(CENTER);
        image(this.Graphic,this.x,this.y,30,30);
        this.y-=2;
        pop();
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
