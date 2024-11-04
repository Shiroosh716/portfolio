
let stmode = 0;
let stampCover, inStampBook;
let stampArray = [];
let lookStamp = true;
let gameObj;

function preload(){

     if (window.localStorage.getItem('gameObj')) {
        let temp = window.localStorage.getItem('gameObj') ;
        gameObj = JSON.parse(temp);
    }

    stampCover = loadImage("images/StampBook.png");
    inStampBook = loadImage("images/stampBookInside.png");
    coin1Stamp = loadImage('images/coin1Stamp.png');
    stampArray.push({image: loadImage('images/AllCoinBagsStamp.png'),name:'AllCoinBagsStamp'} );
    stampArray.push({image:loadImage('images/coin1Stamp.png'),name:'coin1Stamp'} );
    stampArray.push({image: loadImage('images/IceBonus.png'), name:'IceBonus'} );
    stampArray.push({image: loadImage('images/allElements.png'),name:'allElements'} );
    stampArray.push({image: loadImage('images/OneElement.png'), name:'OneElement'} );
    stampArray.push({image: loadImage('images/pizzaFiasco.png'), name:'pizzaFiasco'} );
    stampArray.push({image: loadImage('images/puffle30.png'), name:'puffle30'} );
    stampArray.push({image: loadImage('images/pizzaMaster.png'), name:'pizzaMaster'} );
    font1 = loadFont('fonts/yokelvision.otf');
    underBg=loadImage("images/rooms/town.png");
    
}
function setup(){
    var canvas = createCanvas(800,500);
    canvas.parent("#canvas");
    image(underBg,0,0);
    console.log(gameObj); 
    
}
function draw(){

    if(stmode == 0){
        if(lookStamp == true){
            image(stampCover,0,20);
        }
        //click to change mode
        let stampD = dist(mouseX, mouseY, 740, height/2);
        //click to exit 
        let exitD = dist(mouseX, mouseY, 734, 58);
        if(mouseIsPressed==true){
            if(stampD < 100){
                console.log('press');
                stmode = 1;
            }
            if(exitD < 20){
                lookStamp = false;
                window.location = 'index.html';
                //console.log('false');
            }
        }
    }else if(stmode ==1){
        imageMode(CORNER); 
        image(inStampBook,0,30);
        fill(128)
        textFont(font1);
        textSize(25);
        text(gameObj.badgesEarned.length+'/8 Stamps Collected', 525,85);


        if(gameObj.badgesEarned.length>0){
            let xOffset = 150;
            let yOffset = 180;
            let rowCount = 0;
            for(let i = 0; i < stampArray.length;i++){
                //going into earned when we need it to display anyway
                for(let j = 0; j < gameObj.badgesEarned.length; j++){
                    if(stampArray[i].name==gameObj.badgesEarned[j].name){
                        //filter(GRAY,false);
                        imageMode(CENTER);
                        image(stampArray[i].image,xOffset,yOffset,75,75);
                        xOffset+=100;
                        rowCount++;
                        if(rowCount==3){
                            yOffset+=100;
                            xOffset=150;
                            rowCount=0;
                        }
                    }

                    }
                    }

        }else{
            text('No stamps earned yet play games to earn stamps', 200, 270);
        }
        
    
}
}


function mousePressed(){
    let exitD = dist(mouseX, mouseY, 760, 40);
        if(exitD < 20){
            lookStamp = false;
            window.location = "index.html";
            localStorage.setItem("gameObj", JSON.stringify(gameObj));
            console.log('false');
        }
}
