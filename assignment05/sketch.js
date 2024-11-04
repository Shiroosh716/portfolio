// variable to hold a reference to our A-Frame world
let world;

let table;

let buffer;

let octahedron;

let previousInfo;

function setup() {
	// no canvas needed
	noCanvas();

	// construct the A-Frame world
	// this function requires a reference to the ID of the 'a-scene' tag in our HTML document
	world = new World('VRScene');

	let sky = new Sky({
		asset: 'sky1'
	});
	world.add(sky);

	// decide if you want to allow the user to fly or be stuck on the ground
	// if you disallow flying the user can only move in the X & Z axes
	// the default is to disallow flying - world.setFlying(false)
	//world.setFlying(false);

    buffer = createGraphics(1024,1024);
    buffer.background(50,0,50);
    let texture = world.createDynamicTextureFromCreateGraphics( buffer );

	container = new Container3D({x:0, y:55, z:0,
		scaleX: 4, scaleY:4, scaleZ:4
		});
	world.add(container);

	let b1 = new Box({
		x:0, y:50, z:0,
		width: 2, height:0.3, depth:2,
		scaleX: 4, scaleY:4, scaleZ:4,
		red: random(255), green:random(255), blue:random(255),
		clickFunction: function(theBox) {
			world.slideToObject( theBox, 1000 );}
	});
	world.add(b1)
	
	let b2 = new Box({
		x:40, y:0, z:40,
		width: 15, height:5, depth:15,
		red: random(255), green:random(255), blue:random(255),
		clickFunction: function(theBox) {
			world.slideToObject( theBox, 1000 );}
	});
	world.add(b2)

	crystal5 = new GLTF({
		asset:'crystal',
		x:40, y:8, z:40,
		scaleX: 0.1, scaleY: 0.1, scaleZ: 0.1,
		rotationY:45
	})
	world.add(crystal5);



	// create a plane to serve as our "ground"
	let floor = new Plane({
						x:0, y:-25, z:0,
						width:100, height:100,
                        rotationX:90,
                        side:'double',
						asset: 'fog'
					   });

	world.add(floor);

	octahedron = new Octahedron({
		x:-10, 
		y:1, 
		z:2, 
		radius: 3,
		red:0, 
		green:255, 
		blue:0,
		opacity: 0.7, metalness: 0.8,
		clickFunction: function(tmp){
			fortune();}
	})
	world.add(octahedron);

	let dod = new Dodecahedron({
		x: 0, y:2, z:0,
		radius: 0.7,
		red:220, green:100, blue:200,
		opacity: 0.7, metalness: 0.5
	});
	container.addChild(dod);


	let wall1 = new Plane({
		x:0, y:0, z:50,
		width:100, height:100,
		asset: 'wall',
		rotationX:0,
		side:'double',	
	   });
	let wall2 = new Plane({
		x:0, y:0, z:-50,
		width:100, height:100,
		asset: texture,
		dynamicTexture:true,
        dynamicTextureWidth:1024,
        dynamicTextureHeight:1024,	
		rotationY:0,
		side:'double',	
	});
	let wall3 = new Plane({
		x:50, y:0, z:0,
		width:100, height:100,
		asset: 'wall',
		rotationY:90,
		side:'double',	
	});
	let wall4 = new Plane({
		x:-50, y:0, z:0,
		width:100, height:100,
		asset: 'wall',
		rotationY:90,
		side:'double',	
	});
	world.add(wall1);
	world.add(wall2);
	world.add(wall3);
	world.add(wall4);

	let catText = new Text({
		text: 'Hello, I am spirit cat \n and will give you a fortune!',
		red: 255, green: 255, blue: 255,
		side: 'double',
		x: 5, y: 6, z: -15,
		scaleX: 30, scaleY: 30, scaleZ: 30
	});
	world.add(catText);


	table = new GLTF({
		asset:'tab',
		x:0, y:-12, z:-10,
		scaleX: 3, scaleY: 3, scaleZ: 3	
	})
	world.add(table);

	cat = new GLTF({
		asset:'cat',
		x:0, y:-25, z:-40,
		scaleX: 0.5, scaleY: 0.5, scaleZ: 0.5,
		rotationY:45
	})
	world.add(cat);

	crystal1 = new GLTF({
		asset:'crystal',
		x:0, y:0, z:-2,
		scaleX: 0.03, scaleY: 0.03, scaleZ: 0.03,
		rotationY:45
	})
	crystal2 = new GLTF({
		asset:'crystal',
		x:0, y:0, z:2,
		scaleX: 0.03, scaleY: 0.03, scaleZ: 0.03,
		rotationY:45
	})
	crystal3 = new GLTF({
		asset:'crystal',
		x:2, y:0, z:0,
		scaleX: 0.03, scaleY: 0.03, scaleZ: 0.03,
		rotationY:45
	})
	crystal4 = new GLTF({
		asset:'crystal',
		x:-2, y:0, z:0,
		scaleX: 0.03, scaleY: 0.03, scaleZ: 0.03,
		rotationY:45
	})
	container.addChild(crystal1);
	container.addChild(crystal2);
	container.addChild(crystal3);
	container.addChild(crystal4);
}


function draw() {
	container.spinY(0.3);
	let pos = world.getUserPosition();

	//if(octahedron.y < 4){
		//octahedron.nudge(0,0.2,0);
	//}else if(octahedron.y > 4 ){
		//octahedron.nudge(0,-0.2,0);
	//}
	let d = dist(0,0, pos.x,pos.z);
	if(d<30){
		octahedron.spinY(1);
		if(octahedron.y > 4 || octahedron.y < 1){
			octahedron.y = octahedron.y * -1;
		}
		//octahedron.onclick= fortune();
	}

	// now evaluate
	if (pos.x > 50) {
		world.setUserPosition(-50, pos.y, pos.z);
	}
	else if (pos.x < -50) {
		world.setUserPosition(50, pos.y, pos.z);
	}
	if (pos.z > 50) {
		world.setUserPosition(pos.x, pos.y, -50);
	}
	else if (pos.z < -50) {
		world.setUserPosition(pos.x, pos.y, 50);
	}

    buffer.fill(random(255), random(0), random(255), random(255));
	buffer.noStroke();
    buffer.rect(random(0,1024),random(0,1024),50,50)
	
	for(let i=0; i<2; i++){
		let temp = new Star;
		temp.moveAndDisplay();
	}
}

function fortune(){
	console.log('fortune');
	let ran = floor(random(0,5));
	let mes;


	if(ran==0){
		mes = "happy news is on \n its way to you";
		console.log(mes);
	}else if(ran==1){
		mes = "Watch out for trees \n next time you walk";
		console.log(mes);
	}else if(ran==2){
		mes = "You will have 10 lives";
		console.log(mes);
	}else if(ran==3){
		mes = "Sieze the Meowment!";
		console.log(mes);
	}else if(ran==4){
		mes = "You're hard to read, \n try again";
		console.log(mes);
	}else{
		mes = "Take a risk or you'll \n lose the chance";
		console.log(mes);
	}
	if(previousInfo){
		world.remove(previousInfo);
	}
	//world.remove(previousInfo);


	let info = new Text({
		text: mes,
		red: 128, green: 128, blue: 128,
		side: 'double',
		x: -20, y: 1, z: 0,
		scaleX: 20, scaleY: 20, scaleZ: 20
	});
	previousInfo = info;
	world.add(info);
	
	let backinfo = new Plane({x:-20, y:1, z:0, 
		width:10, height:4, 
		red:255, green:200, blue:200, 
		rotationX:0, metalness:0.25});
	world.add(backinfo);
}
	
class Star{
	constructor(){ 
		this.color = 255;
		this.speed = 0.5;
		this.x = random(-300,300);
		this.z = random(-300,300);
		this.y = random(200,300);
	}
	moveAndDisplay(){
		fill(this.color);
		this.x *= this.speed;
			this.sphere = new Sphere({
				x: this.x,
				y: this.y, 
				z: this.z, 
				radius:0.2, 
				red:255, 
				green:255, 
				blue:255,
			});
		world.add(this.sphere);
		//this.x += this.speed;
	}
}
