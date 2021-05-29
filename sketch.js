//to understand a basic working system for the game you may visit the README.md provided with the folder.

var glassImg,
  boardImg,
  newsImg,
  peelImg,
  plasticImg,
  soiledImg,
  tissueImg,
  tyreImg,
  shoeImg,
  wrapperImg;

var brokenGlass,
  cardBoard,
  newsPaper,
  vegitablePeel,
  plasticBag,
  soiledFood,
  tissueBox,
  tyre,
  candyWrapper,
  wornShoe;
var ground;

var bg, bg2, bg3, bg4, bgInfo;
var biodegradableWaste, nonBiodegradableWaste;
var gameState;
var edges;
var bioGrp, nonBioGrp;

var biodegradableBinImg, nonBiodegradableImg;
var score, sc2;
function preload() {
  glassImg = loadImage("images/glass.png");
  boardImg = loadImage("images/cardBoard.png");
  newsImg = loadImage("images/paperN.png");
  peelImg = loadImage("images/peel.png");
  plasticImg = loadImage("images/plasticBag.png");
  soiledImg = loadImage("images/soiledFood.png");
  tissueImg = loadImage("images/tissue.png");
  tyreImg = loadImage("images/tyre.png");
  wrapperImg = loadImage("/images/Wrapper.png");
  shoeImg = loadImage("images/wornShoe.png");

  biodegradableBinImg = loadImage("images/greenbin.png");
  nonBiodegradableImg = loadImage("images/blueBin.png");

  bg = loadImage("images/bg.png");
  bg1 = loadImage("images/bg1.png");
  bg2 = loadImage("images/bio'sEndPage.png");
  bgInfo = loadImage("images/vScreen.png");
  groundImg = loadImage("images/ground.png");
}
function setup() {
  createCanvas(1000, 500);

  /*gameState can be 0,1,2,3,4 Where
   0 is start
   1 is play
   2 is end from putting biodegradable waste in non-biodegradable waste
   3 is end from putting non-biodegradable waste in biodegradable waste
   4 is end from score becomming 0 after reaching 10 once
  */
  gameState = 0;
  biodegradableWaste = createSprite(200, 300, 130, 10);
  biodegradableWaste.visible = false;
  nonBiodegradableWaste = createSprite(800, 300, 130, 10);
  nonBiodegradableWaste.visible = false;
  edges = createEdgeSprites();
  //the objects that are in the game
  brokenGlass = null;
  cardBoard = null;
  newsPaper = null;
  vegitablePeel = null;
  plasticBag = null;
  soiledFood = null;
  tissueBox = null;
  tyre = null;
  candyWrapper = null;
  wornShoe = null;
  //the groups in which the objects formed would be stored
  nonBioGrp = createGroup();
  bioGrp = createGroup();

  ground = createSprite(500,485, 1000, 30);
  ground.visible = false;

  score=0;
  sc2=null;
}

function draw() {
  if (gameState === 0) {
    background(bg);
    biodegradableWaste.x = 130;
    nonBiodegradableWaste.x = 870;
    sc2=0;
    score=0;
    if (keyDown("v")) {
      background(bgInfo);
    }
    if (keyDown("s")) {
      gameState = 1;
    }
  } else if (gameState === 1) {
    background(bg1);
    spawn();
     
    text("YOUR SCORE: "+score,500,50);
    
    collides(biodegradableWaste, nonBiodegradableWaste);
    drawSprites();
    push();
    imageMode(CENTER);
    image(
      biodegradableBinImg,
      biodegradableWaste.x,
      biodegradableWaste.y + 100,
      170,
      200
    );
    image(
      nonBiodegradableImg,
      nonBiodegradableWaste.x,
      nonBiodegradableWaste.y + 100,
      170,
      200
    );
    pop();
    image(groundImg, ground.x - 500, ground.y - 19, 1000, 190);
      movement(biodegradableWaste,'a','d');
      movement(nonBiodegradableWaste,LEFT_ARROW,RIGHT_ARROW);
    
      //trash and bins is touching codes
  if (bioGrp) {
    for (var i = 0; i < bioGrp.length; i++) {
      if (bioGrp.get(i).isTouching(biodegradableWaste)) {
        bioGrp.get(i).destroy();
      }

      if (bioGrp.get(i).isTouching(ground)) {
        bioGrp.get(i).destroy();
      }
    }
    if (bioGrp.isTouching(nonBiodegradableWaste)) {
     
      bioGrp.destroyEach();
      nonBioGrp.destroyEach();
      gameState = 2;
    }
  }
 if (nonBioGrp) {
    for (var i = 0; i < nonBioGrp.length; i++) {
      if (nonBioGrp.get(i).isTouching(nonBiodegradableWaste)) {
        nonBioGrp.get(i).destroy();
      }

      if (nonBioGrp.get(i).isTouching(ground)) {
        nonBioGrp.get(i).destroy();
      }
    }
    if (nonBioGrp.isTouching(biodegradableWaste)) {
      bioGrp.destroyEach();
      nonBioGrp.destroyEach();
      gameState = 3;
     
    }
  }

  } else if (gameState === 2) {
    background(bg2);
    if (keyWentDown("r")) {
      gameState = 0;
    }
  } else if (gameState === 3) {
    //background()
    if (keyWentDown("r")) {
      gameState = 0;
    }
  } else if (gameState === 4) {
    //background()
    if (keyWentDown("r")) {
      gameState = 0;
    }
  }
}
function spawn() {
  var type = 0;
  bioGrp.setLifetimeEach(700);
  nonBioGrp.setLifetimeEach(700);

  if (frameCount % 60 === 0) {
    type = Math.round(random(1, 10));
    console.log(type);
    switch (type) {
      //wet Waste/biodegradeble
      case 1:
        cardBoard = createSprite(random(100, 800), 0, 15, 15);
        cardBoard.addImage(boardImg);
        cardBoard.scale = 0.2;
        cardBoard.setVelocity(0,3);
        bioGrp.add(cardBoard);
        break;
      //wet Waste/biodegradable
      case 2:
        newsPaper = createSprite(random(100, 800), 0, 15, 15);
        newsPaper.addImage(newsImg);
        newsPaper.scale = 0.2;
        newsPaper.setVelocity(0,3);
        bioGrp.add(newsPaper);
        break;

      //wet Waste/biodegradable
      case 3:
        vegitablePeel = createSprite(random(100, 800), 0, 15, 15);
        vegitablePeel.addImage(peelImg);
        vegitablePeel.scale = 0.2;
        vegitablePeel.setVelocity(0,3);
        bioGrp.add(vegitablePeel);
        break;

      //wet Waste/biodegradable
      case 4:
        soiledFood = createSprite((100, 800), 0, 15, 15);
        soiledFood.addImage(soiledImg);
        soiledFood.scale = 0.2;
        soiledFood.setVelocity(0,3);
        bioGrp.add(soiledFood);
        break;
      //wet Waste/biodegradable
      case 5:
        tissueBox = createSprite(random(100, 800), 0, 15, 15);
        tissueBox.addImage(tissueImg);
        tissueBox.scale = 0.2;
        tissueBox.setVelocity(0,3);
        bioGrp.add(tissueBox);
        break;
      //dry Waste
      case 6:
        tyre = createSprite(random(200, 900), 0, 15, 15);
        tyre.addImage(tyreImg);
        tyre.scale = 0.2;
        tyre.setVelocity(0,3);
        nonBioGrp.add(tyre);
        break;
      //dry Waste
      case 7:
        wornShoe = createSprite(random(200, 900), 0, 15, 15);
        wornShoe.addImage(shoeImg);
        wornShoe.scale = 0.2;
        wornShoe.setVelocity(0,3);
        nonBioGrp.add(wornShoe);
        break;
      //dry Waste
      case 8:
        candyWrapper = createSprite(random(200, 900), 0, 15, 15);
        candyWrapper.addImage(wrapperImg);
        candyWrapper.scale = 0.2;
        candyWrapper.setVelocity(0,3);
        nonBioGrp.add(candyWrapper);
        break;
      //dry Waste Bin
      case 9:
        brokenGlass = createSprite(random(200, 900), 0, 15, 15);
        brokenGlass.addImage(glassImg);
        brokenGlass.scale = 0.2;
        brokenGlass.setVelocity(0,3);
        nonBioGrp.add(brokenGlass);
        break;
      //dry Waste
      case 10:
        plasticBag = createSprite(random(200, 900), 0, 15, 15);
        plasticBag.addImage(plasticImg);
        plasticBag.scale = 0.2;
        plasticBag.setVelocity(0,3);
        nonBioGrp.add(plasticBag);
        break;
    }
  }
}
function collides(bodyA, bodyB) {
  bodyA.collide(edges[1]);

  bodyA.collide(edges[0]);

  bodyB.collide(edges[1]);

  bodyB.collide(edges[0]);

  bodyA.collide(bodyB);
  bodyB.collide(bodyA);
}
function movement(body,keyA,keyB)
{
  if (keyDown(keyA)) {
   body.x = body.x - 9;
  } else if (keyDown(keyB)) {
    body.x = body.x + 9;
  }
 
  
}
