const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
 
var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight=300;
var score =0;
var turn = 0;
var scoreParticle, groundObject;
var gameState = 0;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  
  groundObject = new groundClass(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }

    for (var j = 75; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,375));
    }

    scoreParticle = new Particle(random(width/2-100, width/2+100), 10, 10);
    
}

function draw() {
  background("black");
  textSize(20);
  text("Score : "+score,20,30);
  text("Press Space to Create a New Ball", 280, 30);
  Engine.update(engine);
 
  groundObject.display();
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   /*if(frameCount%60===0){
     particles.push(new Particle(random(width/2-100, width/2+100), 10,10));
     score++;
   }
 
  for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
  }
  */

  if (scoreParticle !==null){
    scoreParticle.display();
    if (scoreParticle.body.position.y > 760){
      if (scoreParticle.body.position.x <300){
        score = score+500;
        scoreParticle = null;
        if (turn >= 5){
          gameState = 1;
        }
      }else if (scoreParticle.body.position.x >301 && scoreParticle.body.position.x < 600){
        score = score+100;
        scoreParticle = null;
        if (turn >= 5){
          gameState = 1;
        }
      } else if (scoreParticle.body.position.x >601 && scoreParticle.body.position.x < 900){
        score = score+200;
        scoreParticle = null;
        if (turn >= 5){
          gameState = 1;
        }
      }

    }
    
  }

  for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
  }

  if(gameState === 1){
    textSize(40);
    text("Game Over",320, 450);
  }
}

function keyPressed(){
  if (keyCode === 32){
    if(gameState !== 1){
      turn++;
      scoreParticle = new Particle(random(width/2-100, width/2+100), 10, 10);
    }
  }
}