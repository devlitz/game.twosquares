var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");
var keys = [];
var touches = {x: undefined, y: undefined};
var width = canvas.width, speed = 4, height = canvas.height;
var player = {x: 40, y: 40, width: 20, height: 20};
var npc = {x: Math.random() * (width - 20), y: Math.random() * (height - 20), width: 20, height: 20};
var score = 0;
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 40;

/*
up - 38
down - 40
left - 37
right - 39
*/

window.addEventListener("keydown",  function(e){
         keys[e.keyCode] = true;
}, false);

window.addEventListener("keyup",  function(e){
         delete keys[e.keyCode];
}, false);

window.addEventListener("touchstart", function(e){
  if (!(e.changedTouches == undefined))
  touches.x = parseInt(e.changedTouches[0].clientX)
  touches.y = parseInt(e.changedTouches[0].clientY);
}, false)

window.addEventListener("touchend", function(e){
  touches.x = undefined;
  touches.y = undefined;
}, false)

document.addEventListener("touchmove", function(e) {
  e.preventDefault();
}, false)

function game(){
   update();
   render();
}

function update(){
  keyMovement();
  touchMovement();
  bounds();
  if(collisionRect(player, npc)) processCollision();
}

function render(){
  clearCanvas();

  makeCharacter(player, "blue")
  makeCharacter(npc, "green")
  makeScore(score)

}

function makeScore(score){
  context.fillStyle = "black";
  context.font = "bold 32px CharterBT"
  context.fillText(score, canvas.width / 2, 30);
}

function makeCharacter(character, color) {
  context.fillStyle = color;
  context.fillRect(character.x, character.y, character.width, character.height);
}

function clearCanvas(){
  context.clearRect(0, 0, width, height)
}

function bounds(){
  if(player.x <= 0) player.x = 0;
  if(player.y <= 0) player.y = 0;
  if(player.x >= width - player.width) player.x = width - player.width;
  if(player.y >= height - player.height) player.y = height - player.height;
}

function touchMovement(){

  if (!(touches.x == undefined) && !(touches.y == undefined))
  console.log(touches.y);
  //left
    if (touches.x < (canvas.width / 3)) player.x-=speed;
    if (touches.x > (canvas.width * 2 / 3)) player.x+=speed;
    if ((touches.x < (canvas.width * 2 / 3)) && (touches.x > (canvas.width / 3)) && (touches.y <= (canvas.height /2))) player.y-=speed;
    if ((touches.x < (canvas.width * 2 / 3)) && (touches.x > (canvas.width / 3)) && (touches.y > (canvas.height /2))) player.y+=speed;
    else ;
  ;
}

function keyMovement(){
  if(keys[38]) player.y-=speed;
  if(keys[40]) player.y+=speed;
  if(keys[37]) player.x-=speed;
  if(keys[39]) player.x+=speed;
}

function processCollision(){
  score++;
  npc.x = Math.random() * (width - 20);
  npc.y = Math.random() * (height - 20);
}

function collisionRect(first, second){
  return !(first.x > second.x + second.width ||
           first.x + first.width < second.x ||
           first.y > second.y + second.height ||
           first.y + first.height < second.y);
}

setInterval(function(){
           game();
}, 1000/60)﻿
