var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");

var keys = [];
canvas.width = window.innerWidth - 20
canvas.height = window.innerHeight - 40

var width = canvas.width, speed = 4, height = canvas.height;

var player = {x: 40, y: 40, width: 20, height: 20};

var npc = {x: Math.random() * (width - 20), y: Math.random() * (height - 20), width: 20, height: 20};

var score = 0;

window.addEventListener("keydown",  function(e){
         keys[e.keyCode] = true;
}, false);

window.addEventListener("keyup",  function(e){
         delete keys[e.keyCode];
}, false);

/*
up - 38
down - 40
left - 37
right - 39
*/

function game(){
   update();
   render();
}

function update(){
  if(keys[38]) player.y-=speed;
  if(keys[40]) player.y+=speed;
  if(keys[37]) player.x-=speed;
  if(keys[39]) player.x+=speed;

  if(player.x <= 0) player.x = 0;
  if(player.y <= 0) player.y = 0;
  if(player.x >= width - player.width) player.x = width - player.width;
  if(player.y >= height - player.height) player.y = height - player.height;

  if(collisionRect(player, npc)) process();
}

function render(){
  context.clearRect(0, 0, width, height)

  context.fillStyle = "blue";
  context.fillRect(player.x, player.y, player.width, player.height);

  context.fillStyle = "green";
  context.fillRect(npc.x, npc.y, npc.width, npc.height);

  context.fillStyle = "black";
  context.font = "bold 32px CharterBT"
  context.fillText(score, canvas.width / 2, 30);

}

function process(){
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
