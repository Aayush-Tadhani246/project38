var PLAY = 1; 
var END = 0; 
var gameState = PLAY;

var monkey, monkeyRunning;
var banana, jungle, stone, Ig;
var bananaImg, jungleImg, stoneImg
var obstaclesGroup, bananasGroup

var score = 0 

function preload() {
  
  monkeyRunning = loadAnimation("Monkey_01.png", "Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png", "Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png", "Monkey_10.png");
  
  bananaImg = loadImage("banana.png")
  
  jungleImg = loadImage("jungle.jpg")
  
  stoneImg = loadImage("stone.png")
}

function setup() {
  createCanvas(400, 400);
  
 jungle = createSprite(200,200,400,400) 
  jungle.addImage ("ground", jungleImg)
  jungle.x = jungle.width /2;
  
   monkey = createSprite(50,345,20,50);
  monkey.addAnimation("running", monkeyRunning);
  monkey.scale = 0.1;
  
  Ig = createSprite(200,385,400,10);
  Ig.visible = false;
  
  bananasGroup = new Group();
  obstaclesGroup = new Group();
  
   score = 0;
}

function draw() {
  background(220);
  
  text("Score: "+ score, 500,50); 
  if (gameState===PLAY){ 
    score = score + Math.round(getFrameRate()/60); 
    jungle.velocityX = -(6 + 3*score/100); 
    if(keyDown("space") && monkey.y >= 159) { 
    monkey.velocityY = -15;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    if (jungle.x < 0){ 
      jungle.x = jungle.width/2;
    } 
    monkey.collide(Ig);
    
    spawnBananas(); 
    spawnObstacles(); 
    
    
      if (bananasGroup.isTouching(monkey)){
        bananasGroup.destroyEach();
        score = score + 2;
        switch(score){ 
          case 10: player.scale=0.12; 
            break; 
          case 20: player.scale=0.14; 
            break; 
          case 30: player.scale=0.16; 
            break; case 40: 
          player.scale=0.18; 
            break; 
          default: break; }
      }  
    if(obstaclesGroup.isTouching(monkey)){ 
    gameState = END
    }}
  else if (gameState === END) 
  { 
   //set velcity of each game object to 0 
   jungle.velocityX = 0;             
   monkey.velocityY = 0; 
   obstaclesGroup.setVelocityXEach(0); 
   bananasGroup.setVelocityXEach(0); 
  
    obstaclesGroup.setLifetimeEach(-1); 
    bananasGroup.setLifetimeEach(-1); 
  } 
  camera.position.x = monkey.x
   drawSprites();
}


function spawnBananas() {
  //write code here to spawn the clouds
  console.log("A  :" + camera.position.x)
  if (frameCount%300===0) {
    banana = createSprite(400,300,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImg);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //add each cloud to the group
    bananasGroup.add(banana);
  }
}
  
function spawnObstacles() {
  console.log("Z  :" + camera.position.x)
  if(frameCount%60===0) {
    var obstacle = createSprite(400,350,10,40);
    obstacle.scale = 0.2;    
    obstacle.velocityX = -6;
    obstacle.addImage(stoneImg)
    obstacle.debug = true
    
    //assign scale and lifetime to the obstacle           
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
  
