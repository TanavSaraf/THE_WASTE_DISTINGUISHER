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

var bg, bgImg;
var wetWaste, dryWaste;
var gameState;
var edges;
var wetGrp, dryGrp;
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
  shoeImg=loadImage("images/wornShoe.png");
  bg = loadImage("/images/bg.png");
}
function setup() {
  createCanvas(1000, 500);

  //gameState can be 0,1,2,3
  gameState = 0;
  wetWaste = createSprite(200, 400, 130, 170);
  wetWaste.shapeColor = "green";
  dryWaste = createSprite(800, 400, 130, 170);
  edges = createEdgeSprites();

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
}

function draw() {
  if (gameState === 0) {
    background("red");
    if (keyDown("s")) {
      gameState = 1;
    }
  } else if (gameState === 1) {
    background(bg);
    spawn();

    if (keyDown("a")) {
      wetWaste.x = wetWaste.x - 9;
    } else if (keyDown("d")) {
      wetWaste.x = wetWaste.x + 9;
    }

    if (keyDown(LEFT_ARROW) && dryWaste.x > 195) {
      dryWaste.x = dryWaste.x - 9;
    } else if (keyDown(RIGHT_ARROW)) {
      dryWaste.x = dryWaste.x + 9;
    }
    collides(wetWaste, dryWaste);
  }

  drawSprites();
}
function spawn() {
  var type = 0;
  if (frameCount % 60 === 0) {
    type = Math.round(random(1, 10));
    console.log(type);
    switch (type) {
      
        //wet Waste/biodegradeble
      case 1:
        cardBoard = createSprite(random(100, 870), 0, 15, 15);
        cardBoard.addImage(boardImg);
        cardBoard.scale = 0.1;
        cardBoard.setVelocity(0, 2);
        break;
        //wet Waste/biodegradable
      case 2:
        newsPaper = createSprite(random(100, 870), 0, 15, 15);
        newsPaper.addImage(newsImg);
        newsPaper.scale = 0.1;
        newsPaper.setVelocity(0, 2);
        break;
        //wet Waste/biodegradable
      case 3:
        vegitablePeel = createSprite(random(100, 870), 0, 15, 15);
        vegitablePeel.addImage(peelImg);
        vegitablePeel.scale = 0.2;
        vegitablePeel.setVelocity(0, 2);
        break;
        
        //wet Waste/biodegradable
        case 4:
          soiledFood=createSprite((100,870),0,15,15);
          soiledFood.addImage(soiledImg);
          soiledFood.scale=0.1;
          soiledFood.setVelocity(0,2);
          break;
          //dry Waste
          case 5 :
            tissueBox=createSprite(random(100,870),0,15,15)
            tissueBox.addImage(tissueImg)
            tissueBox.scale=0.1;
            tissueBox.setVelocity(0,2);
            break;
            //dry Waste
          case 6:
            tyre=createSprite(random(130,900),0,15,15);
            tyre.addImage(tyreImg);
            tyre.scale=0.1;
            tyre.setVelocity(0,2);
            break;
            //dry Waste
            case 7 :
              wornShoe=createSprite(random(130,900),0,15,15);
              wornShoe.addImage(shoeImg);
              wornShoe.scale=0.1;
              wornShoe.setVelocity(0,2);
              break;
              //dry Waste
            case 8 : 
              candyWrapper=createSprite(random(130,900),0,15,15);
              candyWrapper.addImage(wrapperImg);
              candyWrapper.scale=0.1;
              candyWrapper.setVelocity(0,2);
              //dry Waste Bin
      case 9:
        brokenGlass = createSprite(random(130, 900), 0, 15, 15);
        brokenGlass.addImage(glassImg);
        brokenGlass.scale = 0.1;
        brokenGlass.setVelocity(0, 2);
        break;
        //dry Waste
      case 10:
        plasticBag = createSprite(random(130, 900), 0, 15, 15);
        plasticBag.addImage(plasticImg);
        plasticBag.scale = 0.1;
        plasticBag.setVelocity(0, 2);
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
