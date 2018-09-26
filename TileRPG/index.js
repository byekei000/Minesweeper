var mouseXPos = 1000;
var mouseYPos = 1000;
var mapWidth = 10;
var mapHeight = 10;
var tileMap = [
  11,10,10,10,10,10,10,10,10,10,
  10,10,11,10,11,10,10,10,10,10,
  10,10,10,10,10,10,10,10,10,10,
  10,10,10,10,10,10,10,10,10,10,
  10,10,10,10,10,10,10,10,10,10,
  10,10,10,10,10,10,10,10,10,10,
  10,10,10,10,10,10,10,10,10,10,
  10,10,10,10,10,10,10,10,10,10,
  10,10,10,10,10,10,10,10,10,10,
  10,10,10,10,10,10,10,10,10,10,
];

function setup(){
  createCanvas(803,803);
  strokeWeight(5);
}

function draw(){
  background(255);
  tiles();
  fill(0, 102, 153);
  textSize(50);
  // text(tileMap[0*10+0], 0*80+10, 0*80+60);
}

function tiles(){
  for(col = 0; col < 10; col++){
    for(row = 0; row < 10; row++){
      ifClicked(col, row);
      if(tileMap[col*10+row] < 9){
        fill(102);
      } else{
        fill(51);
      }
      rect(row*80, col*80, 80, 80);
      if(tileMap[col*10+row] > 0 && tileMap[col*10+row] < 9){
        fill(0, 102, 153);
        textSize(50);
        text(tileMap[col*10+row], col*80+10, row*80+60);
      }
    }
  }
}

function ifClicked(col, row){
  if(mouseXPos < row*80+80 && mouseXPos > row*80 && mouseYPos < col*80+80 && mouseYPos > col*80){
    if(tileMap[col*10+row] == 9){
      gameOver();
    } else {
      uncover(col, row);
    }
  }
}

function uncover(col, row){
  if(tileMap[col*10+row] > 9){
    tileMap[col*10+row] -= 10;
    if(tileMap[col*10+(row-1)] > 9){
      uncover(col, row-1);
    }
    if(tileMap[col*10+(row+1)] > 9){
      uncover(col, row+1);
    }
    if(tileMap[(col-1)*10+row] > 9){
      uncover(col-1, row);
    }
    if(tileMap[(col+1)*10+row] > 9){
      uncover(col+1, row);
    }
  }
}

function mouseReleased(){
  mouseXPos = mouseX;
  mouseYPos = mouseY;
}

function gameOver(){
  mouseXPos = 1000;
  mouseYPos = 1000;
  for(i = 0; i < 100; i++){
    tileMap[i] = 0;
  }
}
