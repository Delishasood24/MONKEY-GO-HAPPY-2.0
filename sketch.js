var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkeyImage,monkeydied ;
var ground, groundImage;

var foodGroup, foodImage;
var obstaclesGroup, obstacleImage;

var score=0;

localStorage["HighestScore"] = 0;

function preload(){
  monkeyImage = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  foodImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 400);
  
  monkey = createSprite(50,340,20,50);
  
  monkey.addAnimation("monkey",monkeyImage);
  monkey.scale = 0.15;
  monkey.debug = false;
  monkey.setCollider("circle",0,0,270);
  
  ground = createSprite(300,380,1000,20);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {

  background(255);
  text("Survival Time: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/50);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && monkey.y >= 299) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    monkey.collide(ground);
    foods();
    obstacles();
  
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
    if (foodGroup.isTouching(monkey)){
       foodGroup.destroyEach();
  }
  }
  else if (gameState === END) {
    fill("purple");
    textSize(50)
    text ("Game Over",200,200);
    
    ground.destroy();

    monkey.destroy();
    obstaclesGroup.destroyEach();
    foodGroup.destroyEach();
    

    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
  
  
  drawSprites();
}

function foods() {
  if (frameCount % 150 === 0) {
    var food = createSprite(600,300,40,10);
    food.y = Math.round(random(240,260));
    food.addImage(foodImage);
    food.scale = 0.1;
    food.velocityX = -(3 + 3*score/100);
    
    food.lifetime = 200;

    foodGroup.add(food);
    
    if(monkey.isTouching(food)) {
       food.destroy(); 
    }
    
  }
  
}

function obstacles() {
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(600,355,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(3 + 3*score/100);
    

    obstacle.addImage(obstacleImage);
          
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}