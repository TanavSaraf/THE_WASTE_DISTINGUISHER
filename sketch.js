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
var biodegradableBin, nonBiodegradableBin;
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
  bg3 = loadImage("images/nonBgEnd.png");
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
  biodegradableBin = createSprite(200, 300, 130, 10);
  biodegradableBin.visible = false;
  nonBiodegradableBin = createSprite(800, 300, 130, 10);
  nonBiodegradableBin.visible = false;
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

  ground = createSprite(500, 485, 1000, 30);
  ground.visible = false;

  score = 0;
  sc2 = -1;
}

function draw() {
  if (gameState === 0) {
    background(bg);
    biodegradableBin.x = 130;
    nonBiodegradableBin.x = 870;
    sc2 = -1;
    score = 0;
    if (keyDown("v")) {
      background(bgInfo);
    }
    if (keyDown("s")) {
      gameState = 1;
    }
  } else if (gameState === 1) {
    background(bg1);
    text("YOUR SCORE: " + score, 500, 50);
    //to spawn the objects
    //to see the code go to line 192
    spawn();
    //the movement of the bins is controlled by this movement()
    //to know more go to line 300
    movement(biodegradableBin, "a", "d");
    movement(nonBiodegradableBin, LEFT_ARROW, RIGHT_ARROW);
    //used to check colision
    //to know more go to line 288
    collides(biodegradableBin, nonBiodegradableBin);
    //to draw sprites in the play state
    drawSprites();

    allImages();
    //scores();

    //biodegradable group's conditions of points scoring and change of state
    if (bioGrp) {
      for (var i = 0; i < bioGrp.length; i++) {
        if (bioGrp.get(i).isTouching(biodegradableBin)) {
          bioGrp.get(i).destroy();
          score = score + 1;
          sc2 = sc2 + 1;
          continue;
        }

        if (bioGrp.get(i).isTouching(ground)) {
          bioGrp.get(i).destroy();
          score = score - 1;
          sc2 = sc2 + 1;
          continue;
        }
        if (bioGrp.get(i).isTouching(nonBiodegradableBin)) {
          bioGrp.destroyEach();
          nonBioGrp.destroyEach();
          gameState = 2;
          break;
        }
      }
    }
    //Non-biodegradable group's conditions of points scoring and change of state
    if (nonBioGrp) {
      for (var i = 0; i < nonBioGrp.length; i++) {
        if (nonBioGrp.get(i).isTouching(nonBiodegradableBin)) {
          nonBioGrp.get(i).destroy();
          score = score + 1;
          sc2 = sc2 + 1;
          continue;
        }
        console.log(nonBioGrp);
        console.log("nonBioGrp");
        console.log(nonBioGrp.get(i));
        if (nonBioGrp.get(i).isTouching(ground)) {
          nonBioGrp.get(i).destroy();
          score = score - 5;
          sc2 = sc2 - 5;
          continue;
        }
        if (nonBioGrp.get(i).isTouching(biodegradableBin)) {
          bioGrp.destroyEach();
          nonBioGrp.destroyEach();
          gameState = 3;
          break;
        }
      }
    }
  }
  //gameState changed to end due to putting of biodegradable waste in non-biodegradable waste
  else if (gameState === 2) {
    background(bg2);
    if (keyWentDown("r")) {
      gameState = 0;
    }
  }
  //gameState changed to end due to putting of non-biodegradable waste in biodegradable waste
  else if (gameState === 3) {
    background(bg3);
    if (keyWentDown("r")) {
      gameState = 0;
    }
  }
  //end due to raching score 0 after reaching 10 once
  else if (gameState === 4) {
    //background(bg4)
    if (keyWentDown("r")) {
      gameState = 0;
    }
  }
}
function spawn() {
  var type = 0;
  bioGrp.setLifetimeEach(700);
  nonBioGrp.setLifetimeEach(700);
  //to make the conditions work after every 60 frames
  if (frameCount % 60 === 0) {
    type = Math.round(random(1, 10));
    console.log(type);
    switch (type) {
      //wet Waste/biodegradeble
      case 1:
        cardBoard = createSprite(random(100, 800), 0, 15, 15);
        cardBoard.addImage(boardImg);
        cardBoard.scale = 0.2;
        cardBoard.setVelocity(0, 3);
        bioGrp.add(cardBoard);
        break;
      //wet Waste/biodegradable
      case 2:
        newsPaper = createSprite(random(100, 800), 0, 15, 15);
        newsPaper.addImage(newsImg);
        newsPaper.scale = 0.2;
        newsPaper.setVelocity(0, 3);
        bioGrp.add(newsPaper);
        break;

      //wet Waste/biodegradable
      case 3:
        vegitablePeel = createSprite(random(100, 800), 0, 15, 15);
        vegitablePeel.addImage(peelImg);
        vegitablePeel.scale = 0.2;
        vegitablePeel.setVelocity(0, 3);
        bioGrp.add(vegitablePeel);
        break;

      //wet Waste/biodegradable
      case 4:
        soiledFood = createSprite((100, 800), 0, 15, 15);
        soiledFood.addImage(soiledImg);
        soiledFood.scale = 0.2;
        soiledFood.setVelocity(0, 3);
        bioGrp.add(soiledFood);
        break;
      //wet Waste/biodegradable
      case 5:
        tissueBox = createSprite(random(100, 800), 0, 15, 15);
        tissueBox.addImage(tissueImg);
        tissueBox.scale = 0.2;
        tissueBox.setVelocity(0, 3);
        bioGrp.add(tissueBox);
        break;
      //dry Waste
      case 6:
        tyre = createSprite(random(200, 900), 0, 15, 15);
        tyre.addImage(tyreImg);
        tyre.scale = 0.2;
        tyre.setVelocity(0, 3);
        nonBioGrp.add(tyre);
        break;
      //dry Waste
      case 7:
        wornShoe = createSprite(random(200, 900), 0, 15, 15);
        wornShoe.addImage(shoeImg);
        wornShoe.scale = 0.2;
        wornShoe.setVelocity(0, 3);
        nonBioGrp.add(wornShoe);
        break;
      //dry Waste
      case 8:
        candyWrapper = createSprite(random(200, 900), 0, 15, 15);
        candyWrapper.addImage(wrapperImg);
        candyWrapper.scale = 0.2;
        candyWrapper.setVelocity(0, 3);
        nonBioGrp.add(candyWrapper);
        break;
      //dry Waste Bin
      case 9:
        brokenGlass = createSprite(random(200, 900), 0, 15, 15);
        brokenGlass.addImage(glassImg);
        brokenGlass.scale = 0.2;
        brokenGlass.setVelocity(0, 3);
        nonBioGrp.add(brokenGlass);
        break;
      //dry Waste
      case 10:
        plasticBag = createSprite(random(200, 900), 0, 15, 15);
        plasticBag.addImage(plasticImg);
        plasticBag.scale = 0.2;
        plasticBag.setVelocity(0, 3);
        nonBioGrp.add(plasticBag);
        break;
    }
  }
}
function collides(bodyA, bodyB) {
  //lines which command the sprites to collide with the following
  //0,1 here stand for the side edges
  bodyA.collide(edges[1]);

  bodyA.collide(edges[0]);

  bodyB.collide(edges[1]);

  bodyB.collide(edges[0]);

  bodyA.collide(bodyB);
  bodyB.collide(bodyA);
}
function movement(body, keyA, keyB) {
  //body is the bins,keyA is for left movement and key2 is for right movement over here
  if (keyDown(keyA)) {
    body.x = body.x - 9;
  } else if (keyDown(keyB)) {
    body.x = body.x + 9;
  }
}
function allImages() {
  push();
  imageMode(CENTER);
  image(
    biodegradableBinImg,
    biodegradableBin.x,
    biodegradableBin.y + 100,
    170,
    200
  );
  image(
    nonBiodegradableImg,
    nonBiodegradableBin.x,
    nonBiodegradableBin.y + 100,
    170,
    200
  );
  pop();
  image(groundImg, ground.x - 500, ground.y - 19, 1000, 190);
}
function scores() {
  if (score >= 10) {
    sc2 = score;
  }
  if (sc2 <= 0) {
    gameState = 4;
  }
}
