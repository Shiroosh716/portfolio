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
// game variables
let state = 3;
let mode = 1;

let playAgainIcon;
let closeButtonIcon;
let tarp1, tarp2;
let tarpSpeed = 1;
let pizzatronBg;
let pizza;
let pizzaIcon;
let lastPizza = 0;
let pizzaInterval = 3000;
let squidIcon;
let squids = [];
let currentSquidIndex = 0;
let shrimpIcon;
let shrimps = [];
let currentShrimpIndex = 0;
let fishIcon;
let fishes = [];
let currentFishIndex = 0;
let seaweedIcon;
let seaweeds = [];
let currentSeaweedIndex = 0;
let cheeseIcon;
let cheeses = [];
let currentCheeseIndex = 0;
let hotSauceIcon;
let hotSauce;
let tomatoSauceIcon;
let tomatoSauce;
let sauce;
let fallingSpeed = 3;
let pizzasLeft = 40;
let pizzasCompleted = 0;
let pizzasFailed = 0;
let sauceType = "Tomato";
let numCheese = 0;
let numCheesePlaced = 0;
let numSeaweed = 0;
let numSeaweedPlaced = 0;
let numShrimp = 0;
let numShrimpPlaced = 0;
let numSquid = 0;
let numSquidPlaced = 0;
let numFish = 0;
let numFishPlaced = 0;
// Stamp variables
let numSuccessesInARow = 0;
let numFailuresInARow = 0;

// sound variable
let pizzaGameSound;
let canPizzaGameSoundPlay = false;

// stamp variables
let pizzaFiasco;
let pizzaMaster;
let newStampFunctionExecuted = true;
let testStamp;
let textText;

//preload function
function preload(){
    // pizzatron assets
    tarp1=loadImage("images/pizzatron/pizzatronTarp.jpeg");
    tarp2=loadImage("images/pizzatron/pizzatronTarp.jpeg");
    pizzatronBg=loadImage("images/pizzatron/pizzatronBg.png");
    pizzaIcon=loadImage("images/pizzatron/pizza.png");
    squidIcon=loadImage("images/pizzatron/squid.png");
    shrimpIcon = loadImage("images/pizzatron/shrimp.png");
    fishIcon = loadImage("images/pizzatron/fish.png");
    seaweedIcon = loadImage("images/pizzatron/seaweed.png");
    cheeseIcon = loadImage("images/pizzatron/cheese.png");
    hotSauceIcon = loadImage("images/pizzatron/hotSauce.png");
    tomatoSauceIcon = loadImage("images/pizzatron/tomatoSauce.png");
    playAgainIcon = loadImage("images/pizzatron/playAgain.jpeg");
    closeButtonIcon = loadImage("images/pizzatron/closeButton.png");
    pizzaGameSound = loadSound("sounds/pizzaGame.mp3");
    //stamps
    pizzaFiasco = loadImage("images/pizzaFiasco.png");
    pizzaMaster = loadImage("images/pizzaMaster.png");
}

//setup function
function setup(){
    var canvas = createCanvas(800,500);
    canvas.parent("#canvas");
    noStroke(); 

    //game obj
    if (window.localStorage.getItem('gameObj')) {
        let temp = window.localStorage.getItem('gameObj') ;
        gameObj = JSON.parse(temp);
        console.log(gameObj);
    }
    console.log(gameObj);

    // pizzatron variables
    tarp1.x = 0;
    tarp2.x = -width;
    tarp1.y = tarp2.y = height * 0.7;
    pizza = new Pizza();
    hotSauce = new HotSauce();
    tomatoSauce = new TomatoSauce();
    sauce = new Sauce();
    for (let i = 0; i < 5; i++) {
        squids.push(new Squid());
        shrimps.push(new Shrimp());
        fishes.push(new Fish());
        seaweeds.push(new Seaweed());
        cheeses.push(new Cheese());
    }
    generateIngredients();

    pizzasLeft = 40;
    pizzasCompleted = 0;
    numSuccessesInARow = 0;
    pizzasFailed = 0;
    numFailuresInARow = 0;
}   

//draw function
function draw(){
    if (state == 3) {
        // MODE 1: PIZZATRON MINI GAME
        if (mode == 1) {
            if (pizzasLeft > 0) { // conditional to keep the game running
                if (numSuccessesInARow == 20) {
                    let checkTest = checkStampAndUpdate('pizzaMaster');
                    if(checkTest){
                        textText = '20 perfect in a row';
                        testStamp = pizzaMaster;
                        newStampFunctionExecuted = false;
                    }

                }
                if (numFailuresInARow == 3) {
                    let checkTest = checkStampAndUpdate('pizzaFiasco');
                    if(checkTest){
                        textText = '3 mistakes in a row';
                        testStamp = pizzaFiasco;
                        newStampFunctionExecuted = false;
                    }

                }

                // tarp mechanics
                tarp1.x += tarpSpeed;
                tarp2.x += tarpSpeed;
                if (tarp1.x > width) {
                    tarp1.x = -width;
                }
                if (tarp2.x > width) {
                    tarp2.x = -width;
                }

                // aesthetics: text and images
                imageMode(CORNER);
                image(pizzatronBg, 0, 0, width, height * 0.7);
                image(closeButtonIcon, 760, 10, 30, 30);
                fill(255);
                rect(400, 22, 330, 190);
                fill(220);
                rect(410, 80, 150, 120);
                textSize(24);
                fill(0);
                textStyle(BOLD);
                text("Ingredients:", 418, 65);
                textStyle(NORMAL);
                textSize(12);
                text(sauceType + " Sauce", 420, 95);
                let ingredientsY = 115;
                if (numCheese > 0) {
                    text(numCheese + " Cheese", 420, ingredientsY);
                    ingredientsY += 20;
                }
                if (numSeaweed > 0) {
                    text(numSeaweed + " Seaweed", 420, ingredientsY);
                    ingredientsY += 20;
                }
                if (numShrimp > 0) {
                    text(numShrimp + " Shrimp", 420, ingredientsY);
                    ingredientsY += 20;
                }
                if (numSquid > 0) {
                    text(numSquid + " Squid", 420, ingredientsY);
                    ingredientsY += 20;
                }
                if (numFish > 0) {
                    text(numFish + " Fish", 420, ingredientsY);
                    ingredientsY += 20;
                }
                fill(0, 255, 0);
                textStyle(BOLD)
                textSize(20);
                text("Completed:", 580, 90);
                fill(255, 0, 0);
                text("Failed:", 580, 160);
                fill(0);
                textSize(12);
                text(pizzasCompleted + " total", 590, 110);
                text(numSuccessesInARow + " in a row", 590, 130);
                text(pizzasFailed + " total", 590, 180);
                text(numFailuresInARow + " in a row", 590, 200);
                textSize(16);
                text(pizzasLeft + " pizzas left", 580, 60);
                image(tarp1, tarp1.x, tarp1.y);
                image(tarp2, tarp2.x, tarp2.y);

                // call all the objects' important methods 
                pizza.move();
                pizza.display();
                sauce.display();
                sauce.update();
                for (let i = 0; i < 5; i++) {
                    cheeses[i].update();
                    cheeses[i].display();
                    seaweeds[i].update();
                    seaweeds[i].display();
                    shrimps[i].update();
                    shrimps[i].display();
                    squids[i].update();
                    squids[i].display();
                    fishes[i].update();
                    fishes[i].display();
                }
                tomatoSauce.update();
                tomatoSauce.display();
                hotSauce.update();
                hotSauce.display();
                
                // Space-bar function for squirting sauce on pizza
                if (keyIsDown(32)) {
                    // for Tomato sauce
                    if (tomatoSauce.isDragging) {
                        tomatoSauce.isSquirting = true;
                        if (mouseX >= pizza.x - 50 && mouseX <= pizza.x + 50) {
                            sauce.isTomato = true;
                            sauce.expand = true;
                            if (sauce.enoughSauce) {
                                tomatoSauce.isSquirting = false;
                            }
                        }
                    } else if (!tomatoSauce.isDragging || tomatoSauce.falling) {
                        tomatoSauce.isSquirting = false;
                    }

                    // for Hot Sauce
                    if (hotSauce.isDragging) {
                        hotSauce.isSquirting = true;
                        if (mouseX >= pizza.x - 50 && mouseX <= pizza.x + 50) {
                            sauce.isTomato = false;
                            sauce.expand = true;
                            if (sauce.enoughSauce) {
                                hotSauce.isSquirting = false;
                            }
                        }
                    } else if (!hotSauce.isDragging || hotSauce.falling) {
                        hotSauce.isSquirting = false;
                    }
                }

                // make sure they are "squirting" only when the space-bar is being pressed
                else {
                    tomatoSauce.isSquirting = false;
                    hotSauce.isSquirting = false;
                }

                if(newStampFunctionExecuted == false){
                    console.log(testStamp);
                    console.log(textText);
                    newStamp(testStamp, textText);
                }
            }

            // session over graphic
            else {
                fill(255);
                rect(250, 100, 300, 300);
                fill(0);
                textSize(34);
                textStyle(BOLD)
                text("Session Over", 290, 160);
                textSize(24);
                text(pizzasCompleted + " pizzas made", 310, 210);
                image(playAgainIcon, 400, 300, 60, 60);
                textSize(14);
                text("Play Again", 364, 355);
            }  
        }
    }
    
}

// Method that randomly generate ingredients per pizza
function generateIngredients() {
    if (round(random()) > 0.5) {
        sauceType = "Hot";
    } else {
        sauceType = "Tomato";
    }
    numCheese = floor(random(2));
    numFish = floor(random(3));
    numSeaweed = floor(random(3));
    numShrimp = floor(random(3));
    numSquid = floor(random(3));
}

// Method that checks if the ingredients placed on the pizza are the required ingredients
function checkIngredients() {
    let sauceIsCorrect;
    if ((sauce.isTomato && sauceType == "Tomato") || (!sauce.isTomato && sauceType == "Hot")) {
        sauceIsCorrect = true;
    } else { sauceIsCorrect = false; }
    if (numCheesePlaced == numCheese && numFishPlaced == numFish && 
    numSeaweedPlaced == numSeaweed && numShrimpPlaced == numShrimp && numSquidPlaced == numSquid && 
    sauce.enoughSauce && sauceIsCorrect == true) {
        pizzasCompleted++;
        numSuccessesInARow++;
        numFailuresInARow = 0;
    } else {
        pizzasFailed++;
        numFailuresInARow++;
        numSuccessesInARow = 0;
    }
    numCheesePlaced = numFishPlaced = numSeaweedPlaced = numShrimpPlaced = numSquidPlaced = 0;
    console.log("Successes in a row: " + numSuccessesInARow);
    console.log("Failures in a row: " + numFailuresInARow);
}

// mouse pressed function
function mousePressed(){
    if (pizzaGameSound.isPlaying()==false){
        pizzaGameSound.loop();
    }
    // for mode 1: picking up ingredient objects and clicking the close button and play-again button
    if (state == 3 && mode == 1) {
        if (mouseX >= 765 && mouseX <= 785 && mouseY >= 15 && mouseY <= 35) {
            localStorage.setItem("gameObj", JSON.stringify(gameObj));
            window.location = 'index.html';
            pizzaGameSound.stop();
        } 
        if (mouseX >= 605 && mouseX <= 705 && mouseY >= 280 && mouseY <= 330) {
            squids[currentSquidIndex].onPizza = false;
            squids[currentSquidIndex].isDragging = true;
        }
        if (mouseX >= 490 && mouseX <= 595 && mouseY >= 280 && mouseY <= 330) {
            shrimps[currentShrimpIndex].onPizza = false;
            shrimps[currentShrimpIndex].isDragging = true;
        }
        if (mouseX >= 720 && mouseX <= 795 && mouseY >= 280 && mouseY <= 330) {
            fishes[currentFishIndex].onPizza = false;
            fishes[currentFishIndex].isDragging = true;
        }
        if (mouseX >= 370 && mouseX <= 470 && mouseY >= 280 && mouseY <= 330) {
            seaweeds[currentSeaweedIndex].onPizza = false;
            seaweeds[currentSeaweedIndex].isDragging = true;
        }
        if (mouseX >= 195 && mouseX <= 355 && mouseY >= 270 && mouseY <= 325) {
            cheeses[currentCheeseIndex].onPizza = false;
            cheeses[currentCheeseIndex].isDragging = true;
        }
        if (mouseX >= 115 && mouseX <= 150 && mouseY >= 190 && mouseY <= 300) {
            hotSauce.squirting = false;
            hotSauce.isDragging = true;
        }
        if (mouseX >= 50 && mouseX <= 80 && mouseY >= 190 && mouseY <= 300) {
            tomatoSauce.squirting = false;
            tomatoSauce.isDragging = true;
        }

        if (pizzasLeft == 0) {
            if (mouseX >= 370 && mouseX <= 430 && mouseY >= 270 && mouseY <= 330) {
                pizzasLeft = 40;
                pizzasCompleted = 0;
                pizzasFailed = 0;
                numSuccessesInARow = 0;
                numFailuresInARow = 0;
            }
        }
    }
}

function mouseReleased() {
    // check if mouse clicked on a squid
    if (squids[currentSquidIndex].isDragging) {
        squids[currentSquidIndex].isDragging = false;
        if (squids[currentSquidIndex].x < pizza.x - 70 || 
        squids[currentSquidIndex].x > pizza.x + 70 || 
        squids[currentSquidIndex].y > pizza.y + 70 || 
        squids[currentSquidIndex].y < pizza.y - 70) {
            // squid was not place on the pizza
            squids[currentSquidIndex].falling = true;
            if (currentSquidIndex == 4) { currentSquidIndex = 0; } 
            else { currentSquidIndex++; }
        } else {
            squids[currentSquidIndex].onPizza = true;
            numSquidPlaced++;
            squids[currentSquidIndex].falling = false;
            if (currentSquidIndex == 4) { currentSquidIndex = 0; }
            else { currentSquidIndex++; }
        }
    }
    // check if the mouse clicked on a shrimp
    if (shrimps[currentShrimpIndex].isDragging) {
        shrimps[currentShrimpIndex].isDragging = false;
        if (shrimps[currentShrimpIndex].x < pizza.x - 70 || 
        shrimps[currentShrimpIndex].x > pizza.x + 70 || 
        shrimps[currentShrimpIndex].y > pizza.y + 70 || 
        shrimps[currentShrimpIndex].y < pizza.y - 70) {
            // shrimp was not place on the pizza
            shrimps[currentShrimpIndex].falling = true;
            if (currentShrimpIndex == 4) { currentShrimpIndex = 0; }
            else { currentShrimpIndex++; }
        } else {
            shrimps[currentShrimpIndex].onPizza = true;
            numShrimpPlaced++;
            shrimps[currentShrimpIndex].falling = false;
            if (currentShrimpIndex == 4) { currentShrimpIndex = 0; }
            else { currentShrimpIndex++; }
        }
    }
    // check if the mouse clicked on a fish
    if (fishes[currentFishIndex].isDragging) {
        fishes[currentFishIndex].isDragging = false;
        if (fishes[currentFishIndex].x < pizza.x - 70 || 
        fishes[currentFishIndex].x > pizza.x + 70 || 
        fishes[currentFishIndex].y > pizza.y + 70 || 
        fishes[currentFishIndex].y < pizza.y - 70) {
            fishes[currentFishIndex].falling = true;
            if (currentFishIndex == 4) { currentFishIndex = 0; }
            else { currentFishIndex++; }
        } else {
            fishes[currentFishIndex].onPizza = true;
            numFishPlaced++;
            fishes[currentFishIndex].falling = false;
            if (currentFishIndex == 4) { currentFishIndex = 0; }
            else { currentFishIndex++; }
        }
    }
    // check if the mouse clicked on a seaweed
    if (seaweeds[currentSeaweedIndex].isDragging) {
        seaweeds[currentSeaweedIndex].isDragging = false;
        if (seaweeds[currentSeaweedIndex].x < pizza.x - 70 || 
        seaweeds[currentSeaweedIndex].x > pizza.x + 70 || 
        seaweeds[currentSeaweedIndex].y > pizza.y + 70 || 
        seaweeds[currentSeaweedIndex].y < pizza.y - 70) {
            seaweeds[currentSeaweedIndex].falling = true;
            if (currentSeaweedIndex == 4) { currentSeaweedIndex = 0; }
            else { currentSeaweedIndex++; }
        } else {
            seaweeds[currentSeaweedIndex].onPizza = true;
            numSeaweedPlaced++;
            seaweeds[currentSeaweedIndex].falling = false;
            if (currentSeaweedIndex == 4) { currentSeaweedIndex = 0; }
            else { currentSeaweedIndex++; }
        }
    }
    // check if the mouse clicked on a cheese
    if (cheeses[currentCheeseIndex].isDragging) {
        cheeses[currentCheeseIndex].isDragging = false;
        if (cheeses[currentCheeseIndex].x < pizza.x - 70 || 
        cheeses[currentCheeseIndex].x > pizza.x + 70 || 
        cheeses[currentCheeseIndex].y > pizza.y + 70 || 
        cheeses[currentCheeseIndex].y < pizza.y - 70) {
            cheeses[currentCheeseIndex].falling = true;
            if (currentCheeseIndex == 4) { currentCheeseIndex = 0; }
            else { currentCheeseIndex++; }
        } else {
            cheeses[currentCheeseIndex].onPizza = true;
            numCheesePlaced++;
            cheeses[currentCheeseIndex].falling = false;
            if (currentCheeseIndex == 4) { currentCheeseIndex = 0; }
            else { currentCheeseIndex++; }
        }
    }
    // check if the mouse clicked on a sauce bottle
    if (hotSauce.isDragging) {
        hotSauce.isDragging = false;
        // logic for putting hotsauce on pizza
        hotSauce.falling = true;
        sauce.expand = false;
    }
    // mouse clicked on TomatoSauce
    if (tomatoSauce.isDragging) {
        tomatoSauce.isDragging = false;
        // logic for putting tomato sauce on pizza
        tomatoSauce.falling = true;
        sauce.expand = false;
    }
}

// Squid ingredient class
class Squid { 
    constructor() {
        this.x = 650; 
        this.y = 300;
        this.falling = false;
        this.onPizza = false;
        this.isDragging = false;
    }
    update() {
        if (this.isDragging) {
            this.x = mouseX;
            this.y = mouseY;
        }
        else if (this.onPizza) {
            this.x += tarpSpeed;
        }
        if (this.falling) {
            this.y += fallingSpeed;
        }
        // if squid moves off screen, reset it to original position
        if (this.x >= 900 || this.y >= 520) {
            this.x = 650;
            this.y = 300;
            this.onPizza = false;
            this.falling = false;
            this.isDragging = false;
        }
    }
    display() {
        imageMode(CENTER);
        image(squidIcon, this.x, this.y, 60, 40);
    }
}

// Shrimp ingredient class
class Shrimp {
    constructor() {
        this.x = 540;
        this.y = 300;
        this.falling = false;
        this.onPizza = false;
        this.isDragging = false;
    }
    update() {
        if (this.isDragging) {
            this.x = mouseX;
            this.y = mouseY;
        }
        else if (this.onPizza) {
            this.x += tarpSpeed;
        }
        if (this.falling) {
            this.y += fallingSpeed;
        }
        // if shrimp moves off screen, reset it
        if (this.x >= 900 || this.y >= 520) {
            this.x = 540;
            this.y = 300;
            this.onPizza = false;
            this.falling = false;
            this.isDragging = false;
        }
    }
    display() {
        imageMode(CENTER);
        image(shrimpIcon, this.x, this.y, 45, 45);
    }
}

// Fish ingredient class
class Fish {
    constructor() {
        this.x = 750;
        this.y = 300;
        this.falling = false;
        this.onPizza = false;
        this.isDragging = false;
    }
    update() {
        if (this.isDragging) {
            this.x = mouseX;
            this.y = mouseY;
        } 
        else if (this.onPizza) {
            this.x += tarpSpeed; 
        }
        if (this.falling) {
            this.y += fallingSpeed;
        }
        // if fish goes off screen, reset it
        if (this.x >= 900 || this.y >= 520) {
            this.x = 750;
            this.y = 300;
            this.onPizza = false;
            this.falling = false
            this.isDragging = false;
        }
    }
    display() {
        imageMode(CENTER);
        image(fishIcon, this.x, this.y, 60, 25);
    }
}

// Seaweed ingredient class
class Seaweed {
    constructor() {
        this.x = 420;
        this.y = 300;
        this.falling = false;
        this.onPizza = false;
        this.isDragging = false;
    }
    update() {
        if (this.isDragging) {
            this.x = mouseX;
            this.y = mouseY;
        }
        else if (this.onPizza) {
            this.x += tarpSpeed;
        }
        if (this.falling) {
            this.y += fallingSpeed;
        }
        // if off screen, reset it
        if (this.x >= 900 || this.y >= 520) {
            this.x = 420;
            this.y = 300;
            this.onPizza = false;
            this.falling = false;
            this.isDragging = false;
        }
    }
    display() {
        imageMode(CENTER);
        image(seaweedIcon, this.x, this.y, 40, 20);
    }
}

// Cheese ingredient class
class Cheese {
    constructor() {
        this.x = 280;
        this.y = 290;
        this.falling = false;
        this.onPizza = false;
        this.isDragging = false;
    }
    update() {
        if (this.isDragging) {
            this.x = mouseX;
            this.y = mouseY;
        }
        else if (this.onPizza) {
            this.x += tarpSpeed;
        }
        if (this.falling) {
            this.y += fallingSpeed;
        }
        if (this.x >= 900 || this.y >= 520) {
            this.x = 280;
            this.y = 290;
            this.onPizza = false;
            this.falling = false;
            this.isDragging = false;
        }
    }
    display() {
        imageMode(CENTER);
        image(cheeseIcon, this.x, this.y, 100, 100);
    }
}

// Hot Sauce bottle class
class HotSauce {
    constructor() {
        this.x = 135;
        this.y = 255;
        this.falling = false;
        this.isDragging = false;
        this.isSquirting = false;
    }
    update() {
        if (this.isDragging) {
            this.x = mouseX;
            this.y = mouseY;
        }
        if (this.falling) {
            this.y += fallingSpeed;
        }
        if (this.y >= 520) {
            this.x = 135;
            this.y = 255;
            this.falling = false;
            this.isDragging = false;
            this.isSquirting = false;
        }
    }
    display() {
        imageMode(CENTER);
        image(hotSauceIcon, this.x, this.y, 50, 135);
        if (this.isSquirting && !this.falling) {
            fill(255, 0, 0);
            rect(this.x-2, this.y + 60, 5, pizza.y - this.y - 60);
            ellipse(this.x, pizza.y, 12, 12);
        } 
    }
}

// Tomato Sauce bottle class
class TomatoSauce {
    constructor() {
        this.x = 65;
        this.y = 255;
        this.falling = false;
        this.isDragging = false;
        this.isSquirting = false;
    }
    update() {
        if (this.isDragging) {
            this.x = mouseX;
            this.y = mouseY;
        }
        if (this.falling) {
            this.y += fallingSpeed;
        }
        if (this.y >= 520) {
            this.x = 65;
            this.y = 255;
            this.falling = false;
            this.isDragging = false;
            this.isSquirting = false;
        }
    }
    display() {
        imageMode(CENTER);
        image(tomatoSauceIcon, this.x, this.y, 40, 135);
        if (this.isSquirting && !this.falling) {
            fill(255, 69, 0);
            rect(this.x-2, this.y + 60, 5, pizza.y - this.y - 60);
            ellipse(this.x, pizza.y, 12, 12);
        }
    }
}

// Pizza Dough class
class Pizza{
    constructor(){
        this.x=10;
        this.y=425;
    }
    move() {
        this.x += tarpSpeed;
        if (this.x > 900) {
            checkIngredients();
            this.x = -200;
            pizzasLeft--;
            generateIngredients();
        }
    }
    display() {
        imageMode(CENTER);
        image(pizzaIcon, this.x, this.y, 130, 130);
    }
}

// Sauce on the pizza class
class Sauce {
    constructor() {
        this.x = pizza.x;
        this.y = pizza.y;
        this.isTomato;
        this.expand;
        this.size = 0;
        this.maxSize = 110;
        this.enoughSauce;
    }
    update() {
        this.x = pizza.x; 
        this.y = pizza.y;

        // when this.expand is called, expand up to the pizza's perimeter 
        if (this.expand && this.size <= this.maxSize) {
            this.size += 1;
        }
        if (this.size > 100) {
            this.enoughSauce = true;
        } else {
            this.enoughSauce = false;
        }
        if (this.x <= -100 && this.x >= -150) {
            this.size = 0;
        }
    }
    display() {
        if (this.isTomato) {
            fill(255, 69, 0);
        }
        else {
            fill(255, 0, 0);
        }
        ellipse(this.x, this.y, this.size, this.size);
    }
}
function newStamp(name, mes){
    
        fill(0, 100);
        rect(600,0,200,100);
        image(name, 650, 40, 70, 70);

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
