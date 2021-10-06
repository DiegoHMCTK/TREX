
var PLAY=1;
var END=0;
var gameState = PLAY;

var playSound, dieSound, checkPointSound;
var trex, trex_running, edges, ground;
var groundImage;
var imagineground;
var rand
var cloudsGroup, cloud;
var obstacleGroup, obstacle1, obstacle2, obstacle3,obstacle4, obstacle5, obstacle6;
var obstacle
var rand2
var score
var restart, gameOver


function preload(){
   trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
   groundImage = loadImage("ground2.png")
   cloudImage=loadImage("nube.png")
   obstacle1Image=loadImage("obstacle1.png");
   obstacle2Image=loadImage("obstacle2.png");
   obstacle3Image=loadImage("obstacle3.png");
   obstacle4Image=loadImage("obstacle4.png");
   obstacle5Image=loadImage("obstacle5.png");
   obstacle6Image=loadImage("obstacle6.png");
   trex_collided=loadImage("trex_collided.png")
   restartImage=loadImage("restart.png");
   gameOverImage=loadImage("gameOver.png");
  
  jumpSound=loadSound("jump.mp3");
dieSound=loadSound("die.mp3");
checkPointSound=loadSound("checkPoint.mp3");

}

function setup(){
   createCanvas(600,200);
  
  //crea el Trex
   trex = createSprite(50,160 ,20,20);
   trex.addAnimation("running", trex_running);
   trex.addAnimation("collided",trex_collided);
   //edges = createEdgeSprites();
  
  //crear radio de colisión del trex
trex.setCollider("rectangle",0,0,trex.with, trex.height);
trex.debug=true;

    
  //añade escala y posición al Trex
   trex.scale = 0.5;
   trex.x = 50
  
  //crea el suelo y su animación
   ground = createSprite(600,180,400,400)
   ground.addAnimation("ground2.png", groundImage);
   ground.x = ground.width /2;
  
  
  //creando el suelo invisible
   imagineground=createSprite(200,190,400,15);
   imagineground.visible=false;
  
  //rand=Math.round(random(0,100))
     
  score=0
  //crear grupos de nubes y obstáculos
   cloudsGroup = new Group ();
   obstacleGroup = new Group ();

   
  
 restart=createSprite(300,100,100,100);
  restart.addImage(restartImage);
  restart.visible=false; 
  restart.scale=1
  
  gameOver=createSprite(300,50)
  gameOver.addImage(gameOverImage);
  gameOver.visible=false;
  gameOver.scale=2
}


  function draw(){ 
    //establece un color de fondo 
       background("white");
        
    //ingresa la posición y del Trex
    // console.log(trex.y)
    
    //poniendo el score
        text ("Pts = "+ score,500,15);
    //gravedad
        trex.velocityY = trex.velocityY +1.5 ;

    
    //evita que el Trex caiga
        trex.collide(imagineground)
        

console.log("this is ",gameState)
    
        if(gameState === PLAY){
    
          
          
          //hacer que el suelo vaya en retroceso 
              ground.velocityX = -(8+score/1000);

              
              //salta con la barra espaciadora
              if(keyDown("space") && trex.y >= 159){
                 trex.velocityY = -18;
                jumpSound.play();
              }
              //MUEVE EL GROUND
              if(ground.x<0){
                ground.x = ground.width /2;
              }
              //mostrar el SCORE
              if(frameCount >120){
                score=score+100;
                
              }
             if (score>0 && score%10000===0){
               checkPointSound.play();
          }
          
                  spawnClouds();
                  spawnObstacles();
                  
              //cambiando estado de juego si trex toca obstacle
              if(obstacleGroup.isTouching(trex)){
                   //trex.velocityY = -18;
                //jumpSound.play();
                
                gameState=END;
                dieSound.play();
              }
          
           
         }
    
        else if (gameState===END){
          
               gameOver.visible=true;
               restart.visible=true;
               ground.velocityX=0;
               
               
               obstacleGroup.setVelocityXEach(0);
               cloudsGroup.setVelocityXEach(0);
               trex.changeAnimation("collided",trex_collided);
               if (mousePressedOver(restart)){
                 reset ();
                  console.log ("reiniciar el juego");
               }
  
         }    
drawSprites();    
  }

  //Crear las nubes
    function spawnClouds (){
       
      if(frameCount%120===0){
         cloud=createSprite (600,50,40,10);
         cloud.velocityX=-3
         cloud.y=rand=Math.round(random(30,80))
          console.log(cloud.depth)
         cloud.depht=7;
        cloud.depth=trex.depth
        
        trex.depth=trex.depth+1
      
      cloud.addImage (cloudImage);
        cloud.lifetime=220;
        cloudsGroup.add (cloud);
      }
      
     

    }
      
      function spawnObstacles (){
        
        if(frameCount%60===0){
          
          
          
          obstacle=createSprite (590,165,5,10);
          rand2=Math.round(random(1,6));
          switch(rand2) { 
          case 1: obstacle.addImage(obstacle1Image); break; 
          case 2:obstacle.addImage(obstacle2Image); break;
          case 3:obstacle.addImage(obstacle3Image); break; 
          case 4:obstacle.addImage(obstacle4Image); break; 
          case 5:obstacle.addImage(obstacle5Image); break; 
          case 6:obstacle.addImage(obstacle6Image); break;
          default: break; }
          //asignar escala y tiempo de vida
          obstacle.scale= 0.5;
          obstacle.lifetime=220;
          //meter todos los obstáculos en un grupo
          obstacleGroup.add (obstacle);
          obstacle.velocityX = -(5+ score/1000)

        
        }
        
      
 }

function reset(){
  
  trex.x=50;
  trex.y=160;
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstacleGroup.destroyEach();
  score=0;
  
  
}


 
        
        
      
        
 
        
        
      
      

    
