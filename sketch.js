var bg;
var bgMusic;


function preload() {
  bg = loadImage("Assets/Main/bg/back.png");
  bgMusic = loadSound("Assets/Main/BgMusic/hurry_up_and_run.mp3");

  longPlatformIMG = loadImage("Assets/Main/Platforms/land-removebg-preview.png");
  StrawHouseIMG = loadImage("Assets/Main/Platforms/StrawHouse.png")

  IdleMPAnim = loadAnimation(
    "Assets/Main/MainPlayer/idle/player-idle-1.png",
    "Assets/Main/MainPlayer/idle/player-idle-2.png",
    "Assets/Main/MainPlayer/idle/player-idle-3.png",
    "Assets/Main/MainPlayer/idle/player-idle-4.png"
  );
  RunningRSMPAnim = loadAnimation(
    "Assets/Main/MainPlayer/running/RS/player-run-1.png",
    "Assets/Main/MainPlayer/running/RS/player-run-2.png",
    "Assets/Main/MainPlayer/running/RS/player-run-3.png",
    "Assets/Main/MainPlayer/running/RS/player-run-4.png",
    "Assets/Main/MainPlayer/running/RS/player-run-5.png",
    "Assets/Main/MainPlayer/running/RS/player-run-6.png"
  );
  RunningLSMPAnim = loadAnimation(
    "Assets/Main/MainPlayer/running/LS/image.png",
    "Assets/Main/MainPlayer/running/LS/image (1).png",
    "Assets/Main/MainPlayer/running/LS/image (2).png",
    "Assets/Main/MainPlayer/running/LS/image (3).png",
    "Assets/Main/MainPlayer/running/LS/image (4).png",
    "Assets/Main/MainPlayer/running/LS/image (5).png"
    
  );
  JumpRSMPAnim = loadAnimation(
    "Assets/Main/MainPlayer/jump/RS/player-jump-1.png",
    "Assets/Main/MainPlayer/jump/RS/player-fall.png"
  );
  JumpLSMPAnim = loadAnimation(
    "Assets/Main/MainPlayer/jump/LS/image.png",
    "Assets/Main/MainPlayer/jump/LS/image (1).png"
  );
  DeadMPAnim = loadAnimation(
    "Assets/Main/MainPlayer/dead/player-hurt-1.png",
    "Assets/Main/MainPlayer/dead/player-hurt-2.png"
  );
  CherryAnim = loadAnimation(
      "Assets/Main/items/cherry/cherry-1.png",
      "Assets/Main/items/cherry/cherry-2.png",
      "Assets/Main/items/cherry/cherry-3.png",
      "Assets/Main/items/cherry/cherry-4.png",
      "Assets/Main/items/cherry/cherry-5.png",
      "Assets/Main/items/cherry/cherry-6.png",
  );
  GemAnim = loadAnimation(
    "Assets/Main/items/gem/gem-1.png",
    "Assets/Main/items/gem/gem-2.png",
    "Assets/Main/items/gem/gem-3.png",
    "Assets/Main/items/gem/gem-4.png",
    "Assets/Main/items/gem/gem-5.png",
  );

}

function setup() {
  createCanvas(1520,750);
  bgMusic.play();
  bgMusic.loop();

  LP1 = createSprite(160,500,100,100);
  LP1.addImage("platform",longPlatformIMG);
  LP1.scale = 2;

  LP2 = createSprite(900,500,100,100);
  LP2.addImage("platform",longPlatformIMG);
  LP2.scale = 2;

  LP3 = createSprite(1640,500,100,100);
  LP3.addImage("platform",longPlatformIMG);
  LP3.scale = 2;

  LP4 = createSprite(2380,500,100,100);
  LP4.addImage("platform",longPlatformIMG);
  LP4.scale = 2;


  StrawHouse = createSprite(10,520,30,100);
  StrawHouse.addAnimation("StrawHouse", StrawHouseIMG);
  StrawHouse.scale = 2.4;

  MP = createSprite(300,570,30,100);
  MP.addAnimation("idle",IdleMPAnim);
  MP.addAnimation("runningRS",RunningRSMPAnim);
  MP.addAnimation("runningLS",RunningLSMPAnim);
  MP.addAnimation("JumpingRS",JumpRSMPAnim);
  MP.addAnimation("JumpingLS",JumpLSMPAnim);
  MP.scale = 4;

  
  PC1 = createSprite(width/2,650,width,20);
  PC1.visible = false;

  PC2 = createSprite(width/2,630,width,20);
  PC2.visible = false;


}

function draw() {
  background(bg);

  console.log(MP.y)

  MPMovement();

  drawSprites();
}

function MPMovement(){
  
  //Fixing Animation Bug
  if(MP.isTouching(PC2)){
    MP.changeAnimation("idle");
  }

  // Basic Movement
  if(keyDown("d") || keyDown("RIGHT_ARROW") ){
    LP1.x -= 3;
    LP2.x -= 3;
    LP3.x -= 3;
    StrawHouse.x -= 3;
    MP.changeAnimation("runningRS");
  }
  if(keyDown("a") || keyDown("LEFT_ARROW") && LP1.x < 295){
    LP1.x += 3;
    LP2.x += 3;
    LP3.x += 3;
    StrawHouse.x += 3;
    MP.changeAnimation("runningLS");
  }
  if(MP.isTouching(PC2) && keyDown("space")){
    MP.changeAnimation("JumpingRS",JumpRSMPAnim);
    MP.velocityY = -13
  } 
  if(MP.isTouching(PC2) && keyDown("UP_ARROW")){
    MP.changeAnimation("JumpingRS",JumpRSMPAnim);
    MP.velocityY = -13
  } 

  //Solving Some animation bug
  if(keyWentUp("a") || keyWentUp("LEFT_ARROW") || keyWentUp("d") || keyWentUp("RIGHT_ARROW")){
    MP.changeAnimation("idle");
  }
  if(keyDown("a") && keyDown("d")){
    MP.changeAnimation("idle");
  }
  if(keyDown("LEFT_ARROW") && keyDown("RIGHT_ARROW") ){
    MP.changeAnimation("idle");
  }
  if(keyDown("a") && keyDown("RIGHT_ARROW") ){
    MP.changeAnimation("idle");
  }
  if(keyDown("LEFT_ARROW") && keyDown("d") ){
    MP.changeAnimation("idle");
  }
  if(!MP.isTouching(PC2)){
    MP.changeAnimation("JumpingRS",JumpRSMPAnim);
  }
  if(!MP.isTouching(PC2) && keyDown("LEFT_ARROW")){
    MP.changeAnimation("JumpingLS",JumpLSMPAnim);
  }
  if(!MP.isTouching(PC2) && keyDown("a")){
    MP.changeAnimation("JumpingLS",JumpLSMPAnim);
  }
  //Adding Gravity
  MP.velocityY += 0.5;
  MP.collide(PC1);


}