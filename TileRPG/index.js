var mouseXPos = 1000;
var mouseYPos = 1000;
var mapWidth = 10;
var mapHeight = 10;
var mines = 15;
var neighbours;
var ran;
var tileMap = [
  10,10,10,10,10,10,09,09,10,09,
  10,10,10,10,10,10,10,10,10,09,
  10,10,10,10,10,09,10,10,10,10,
  10,10,10,10,10,10,10,10,10,09,
  09,10,10,09,10,10,10,10,10,10,
  10,10,09,10,10,10,10,10,10,09,
  10,10,09,09,10,10,10,10,10,10,
  10,10,10,10,10,10,10,10,10,10,
  10,10,09,10,10,10,10,10,09,10,
  10,10,09,10,10,10,10,10,10,10,
];

function setup(){
  createCanvas(803,803);
  strokeWeight(5);
  textSize(75);
  // setMines();
  checkNeighbours();
}

function draw(){
  background(255);
  tiles();
  // fill(0, 102, 153);
  // text(6, 2*80+20, 1*80+67);
}

function tiles(){
  for(row = 0; row < 10; row++){
    for(col = 0; col < 10; col++){
      ifClicked(col, row);
      if(tileMap[row*10+col] < 9){
        fill(102);
      } else{
        fill(51);
      }
      rect(col*80, row*80, 80, 80);
      if(tileMap[row*10+col] > 0 && tileMap[row*10+col] < 9){
        fill(0, 102, 153);
        text(tileMap[row*10+col], col*80+20, row*80+67);
      }
    }
  }
}

function checkNeighbours(){
  for(row = 0; row < 10; row++){
    for(col = 0; col < 10; col++){
      neighbours = 0;
      if(row == 0 && col == 0){
        middleRight(row, col);
        bottomMiddle(row, col);
        bottomRight(row, col);
      } else if(row == 0 && col == 9){
        middleLeft(row, col);
        bottomLeft(row, col);
        bottomMiddle(row, col);
      } else if(row == 9 && col == 9){
        topLeft(row, col);
        topMiddle(row, col);
        middleLeft(row, col);
      } else if(row == 0 && col == 0){
        topMiddle(row, col);
        topRight(row, col);
        middleRight(row, col);
      } else if(row == 0){
        bottomLeft(row, col);
        bottomMiddle(row, col);
        bottomRight(row, col);
        middleLeft(row, col);
        middleRight(row, col);
      } else if(col == 9){
        topLeft(row, col);
        topMiddle(row, col);
        middleLeft(row, col);
        bottomMiddle(row, col);
        bottomLeft(row, col);
      } else if(row == 9){
        middleLeft(row, col);
        middleRight(row, col);
        topLeft(row, col);
        topMiddle(row, col);
        topRight(row, col);
      } else if(col == 0){
        topMiddle(row, col);
        topRight(row, col);
        middleRight(row, col);
        bottomRight(row, col);
        bottomMiddle(row, col);
      } else{
        topLeft(row, col);
        topMiddle(row, col);
        topRight(row, col);
        middleLeft(row, col);
        middleRight(row, col);
        bottomLeft(row, col);
        bottomMiddle(row, col);
        bottomRight(row, col);
      }
      if(tileMap[row*10+col] != 9){
          tileMap[row*10+col] += neighbours;
      }
    }
  }
}

function setMines(){
  for(i = 0; i < mines; i++){
    ran = random(100);
    while(tileMap[Math.floor(ran)] == 9){
      ran = random(100);
    }
    tileMap[Math.floor(ran)] = 9;
  }
}

function ifClicked(col, row){
  if(mouseXPos < col*80+80 && mouseXPos > col*80 && mouseYPos < row*80+80 && mouseYPos > row*80){
    if(tileMap[row*10+col] == 9){
      gameOver();
    } else {
      uncover(col, row);
    }
  }
}

function uncover(col, row){
  if(tileMap[row*10+col] > 9){
    if(tileMap[col*10+row] == 10){
      if(tileMap[(row-1)*10+(col-1)] > 10){
        tileMap[(row-1)*10+(col-1)] -= 10;
      }
      if(tileMap[(row-1)*10+col] > 10){
        tileMap[(row-1)*10+col] -= 10;
      }
      if(tileMap[(row-1)*10+(col+1)] > 10){
        tileMap[(row-1)*10+(col+1)] -= 10;
      }
      if(tileMap[row*10+(col-1)] > 10){
        tileMap[row*10+(col-1)] -= 10;
      }
      if(tileMap[row*10+(col+1)] > 10){
        tileMap[row*10+(col+1)] -= 10;
      }
      if(tileMap[(row+1)*10+(col-1)] > 10){
        tileMap[(row+1)*10+(col-1)] -= 10;
      }
      if(tileMap[(row+1)*10+col] > 10){
        tileMap[(row+1)*10+col] -= 10;
      }
      if(tileMap[(row+1)*10+(col+1)] > 10){
        tileMap[(row+1)*10+(col+1)] -= 10;
      }
    }
    tileMap[row*10+col] -= 10;
    if(tileMap[row*10+(col-1)] == 10){
      uncover(col-1, row);
    }
    if(tileMap[row*10+(col+1)] == 10){
      uncover(col+1, row);
    }
    if(tileMap[(row-1)*10+col] == 10){
      uncover(col, row-1);
    }
    if(tileMap[(row+1)*10+col] == 10){
      uncover(col, row+1);
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
    tileMap[i] = 10;
  }
  setMines();
  checkNeighbours();
}

function topLeft(row, col){
  if(tileMap[(row-1)*10+(col-1)] == 9){
    neighbours++;
  }
}
function topMiddle(row, col){
  if(tileMap[(row-1)*10+col] == 9){
    neighbours++;
  }
}
function topRight(row, col){
  if(tileMap[(row-1)*10+(col+1)] == 9){
    neighbours++;
  }
}
function middleLeft(row, col){
  if(tileMap[row*10+(col-1)] == 9){
    neighbours++;
  }
}
function middleRight(row, col){
  if(tileMap[row*10+(col+1)] == 9){
    neighbours++;
  }
}
function bottomLeft(row, col){
  if(tileMap[(row+1)*10+(col-1)] == 9){
    neighbours++;
  }
}
function bottomMiddle(row, col){
  if(tileMap[(row+1)*10+col] == 9){
    neighbours++;
  }
}
function bottomRight(row, col){
  if(tileMap[(row+1)*10+(col+1)] == 9){
    neighbours++;
  }
}
