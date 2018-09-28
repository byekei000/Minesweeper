var mouseXPos = 1000;
var mouseYPos = 1000;
var mouseButtn = 0;
var mapWidth = 10;
var mapHeight = 10;
var mines = Math.round((mapWidth*mapHeight)/6.4);
var hidden = mapWidth*mapHeight;
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
  createCanvas(mapWidth*80+3,mapHeight*80+3);
  strokeWeight(5);
  textSize(75);
  textWidth(1);
  for(i = 0; i < mapWidth*mapHeight; i++){
    tileMap[i] = 10;
  }
  setMines();
  checkNeighbours();
}

function draw(){
  background(255);
  tiles();
  mouseButtn = 2;
  // fill(0, 102, 153);
  // text(6, 2*80+20, 1*80+67);
}

function tiles(){
  hidden = 0;
  for(row = 0; row < mapHeight; row++){
    for(col = 0; col < mapWidth; col++){
      ifClicked(col, row);
      strokeWeight(5);
      if(tileMap[row*mapHeight+col] < 9){
        fill(102);
      } else{
        fill(51);
        hidden++;
      }
      rect(col*80, row*80, 80, 80);
      if(tileMap[row*mapHeight+col] > 0 && tileMap[row*mapHeight+col] < 9){
        if(tileMap[row*mapHeight+col] == 1){
          fill(0,0,255);
        } else if(tileMap[row*mapHeight+col] == 2){
          fill(0,155,0);
        } else if(tileMap[row*mapHeight+col] == 3){
          fill(255,0,0);
        } else fill(0,0,255);
        text(tileMap[row*mapHeight+col], col*80+20, row*80+67);
      }
      if(tileMap[row*mapHeight+col] > 18){
        strokeWeight(3);
        fill(0);
        line(col*80+54, row*80+10, col*80+54, row*80+70);
        fill(255, 0, 0);
        triangle(col*80+54, row*80+10, col*80+27, row*80+25, col*80+54, row*80+40);
      }
    }
  }
  if(hidden == mines){
    win();
  }
}

function checkNeighbours(){
  for(row = 0; row < mapHeight; row++){
    for(col = 0; col < mapWidth; col++){
      neighbours = 0;
      if(row == 0 && col == 0){
        middleRight(row, col);
        bottomMiddle(row, col);
        bottomRight(row, col);
      } else if(row == 0 && col == mapWidth-1){
        middleLeft(row, col);
        bottomLeft(row, col);
        bottomMiddle(row, col);
      } else if(row == mapHeight-1 && col == mapWidth-1){
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
      } else if(col == mapWidth-1){
        topLeft(row, col);
        topMiddle(row, col);
        middleLeft(row, col);
        bottomMiddle(row, col);
        bottomLeft(row, col);
      } else if(row == mapHeight-1){
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
      if(tileMap[row*mapHeight+col] != 9){
          tileMap[row*mapHeight+col] += neighbours;
      }
    }
  }
}

function setMines(){
  for(i = 0; i < mines; i++){
    ran = random(mapWidth*mapHeight);
    while(tileMap[Math.floor(ran)] == 9){
      ran = random(mapWidth*mapHeight);
    }
    tileMap[Math.floor(ran)] = 9;
  }
}

function ifClicked(col, row){
  if(mouseXPos < col*80+80 && mouseXPos > col*80 && mouseYPos < row*80+80 && mouseYPos > row*80){
    if(mouseButtn == 1){
      if(tileMap[row*mapHeight+col] > 18){
        tileMap[row*mapHeight+col] -= 10;
      } else if(tileMap[row*mapHeight+col] > 8){
        tileMap[row*mapHeight+col] += 10;
      }
    } else if(mouseButtn == 0){
      if(tileMap[row*mapHeight+col] == 9){
        lose();
      } else {
        uncover(col, row);
      }
    }
  }
}

function uncover(col, row){
  if(tileMap[row*mapHeight+col] > 9){
    if(tileMap[row*mapHeight+col] == 10){
      if(row == 0 && col == 0){
        middleRight2(row, col);
        bottomMiddle2(row, col);
        bottomRight2(row, col);
      } else if(row == 0 && col == mapWidth-1){
        middleLeft2(row, col);
        bottomLeft2(row, col);
        bottomMiddle2(row, col);
      } else if(row == mapHeight-1 && col == mapWidth-1){
        topLeft2(row, col);
        topMiddle2(row, col);
        middleLeft2(row, col);
      } else if(row == mapHeight-1 && col == 0){
        topMiddle2(row, col);
        topRight2(row, col);
        middleRight2(row, col);
      } else if(row == 0){
        bottomLeft2(row, col);
        bottomMiddle2(row, col);
        bottomRight2(row, col);
        middleLeft2(row, col);
        middleRight2(row, col);
      } else if(col == mapWidth-1){
        topLeft2(row, col);
        topMiddle2(row, col);
        middleLeft2(row, col);
        bottomMiddle2(row, col);
        bottomLeft2(row, col);
      } else if(row == mapHeight-1){
        middleLeft2(row, col);
        middleRight2(row, col);
        topLeft2(row, col);
        topMiddle2(row, col);
        topRight2(row, col);
      } else if(col == 0){
        topMiddle2(row, col);
        topRight2(row, col);
        middleRight2(row, col);
        bottomRight2(row, col);
        bottomMiddle2(row, col);
      } else{
        topLeft2(row, col);
        topMiddle2(row, col);
        topRight2(row, col);
        middleLeft2(row, col);
        middleRight2(row, col);
        bottomLeft2(row, col);
        bottomMiddle2(row, col);
        bottomRight2(row, col);
      }
    }
    tileMap[row*mapHeight+col] -= 10;
    if(tileMap[row*mapHeight+col] == 0){
      if(row == 0 & col == 0){
        if(tileMap[row*mapHeight+(col+1)] == 10){
          uncover(col+1, row);
        }
        if(tileMap[(row+1)*mapHeight+col] == 10){
          uncover(col, row+1);
        }
      } else if(row == 0 && col == mapWidth-1){
        if(tileMap[row*mapHeight+(col-1)] == 10){
          uncover(col-1, row);
        }
        if(tileMap[(row+1)*mapHeight+col] == 10){
          uncover(col, row+1);
        }
      } else if(row == mapHeight-1 && col == mapWidth-1){
        if(tileMap[(row-1)*mapHeight+col] == 10){
          uncover(col, row-1);
        }
        if(tileMap[row*mapHeight+(col-1)] == 10){
          uncover(col-1, row);
        }
      } else if(row == mapHeight-1 && col == 0){
        if(tileMap[(row-1)*mapHeight+col] == 10){
          uncover(col, row-1);
        }
        if(tileMap[row*mapHeight+(col+1)] == 10){
          uncover(col+1, row);
        }
      } else if(row == 0){
        if(tileMap[row*mapHeight+(col-1)] == 10){
          uncover(col-1, row);
        }
        if(tileMap[row*mapHeight+(col+1)] == 10){
          uncover(col+1, row);
        }
        if(tileMap[(row+1)*mapHeight+col] == 10){
          uncover(col, row+1);
        }
      } else if(col == mapWidth-1){
        if(tileMap[row*mapHeight+(col-1)] == 10){
          uncover(col-1, row);
        }
        if(tileMap[(row-1)*mapHeight+col] == 10){
          uncover(col, row-1);
        }
        if(tileMap[(row+1)*mapHeight+col] == 10){
          uncover(col, row+1);
        }
      } else if(row == mapHeight-1){
        if(tileMap[row*mapHeight+(col-1)] == 10){
          uncover(col-1, row);
        }
        if(tileMap[row*mapHeight+(col+1)] == 10){
          uncover(col+1, row);
        }
        if(tileMap[(row-1)*mapHeight+col] == 10){
          uncover(col, row-1);
        }
      } else if(col == 0){
        if(tileMap[row*mapHeight+(col+1)] == 10){
          uncover(col+1, row);
        }
        if(tileMap[(row-1)*mapHeight+col] == 10){
          uncover(col, row-1);
        }
        if(tileMap[(row+1)*mapHeight+col] == 10){
          uncover(col, row+1);
        }
      } else{
        if(tileMap[row*mapHeight+(col-1)] == 10){
          uncover(col-1, row);
        }
        if(tileMap[row*mapHeight+(col+1)] == 10){
          uncover(col+1, row);
        }
        if(tileMap[(row-1)*mapHeight+col] == 10){
          uncover(col, row-1);
        }
        if(tileMap[(row+1)*mapHeight+col] == 10){
          uncover(col, row+1);
        }
      }
    }
  }
}

function lose(){
  mouseXPos = 1000;
  mouseYPos = 1000;
  for(i = 0; i < mapWidth*mapHeight; i++){
    tileMap[i] = 10;
  }
  setMines();
  checkNeighbours();
}

function mouseReleased(){
  if(mouseButton === LEFT){
    mouseButtn = 0;
  } else if(mouseButton === RIGHT){
    mouseButtn = 1;
  }
  mouseXPos = mouseX;
  mouseYPos = mouseY;
}

function topLeft(row, col){
  if(tileMap[(row-1)*mapHeight+(col-1)] == 9){
    neighbours++;
  }
}
function topMiddle(row, col){
  if(tileMap[(row-1)*mapHeight+col] == 9){
    neighbours++;
  }
}
function topRight(row, col){
  if(tileMap[(row-1)*mapHeight+(col+1)] == 9){
    neighbours++;
  }
}
function middleLeft(row, col){
  if(tileMap[row*mapHeight+(col-1)] == 9){
    neighbours++;
  }
}
function middleRight(row, col){
  if(tileMap[row*mapHeight+(col+1)] == 9){
    neighbours++;
  }
}
function bottomLeft(row, col){
  if(tileMap[(row+1)*mapHeight+(col-1)] == 9){
    neighbours++;
  }
}
function bottomMiddle(row, col){
  if(tileMap[(row+1)*mapHeight+col] == 9){
    neighbours++;
  }
}
function bottomRight(row, col){
  if(tileMap[(row+1)*mapHeight+(col+1)] == 9){
    neighbours++;
  }
}

function topLeft2(row, col){
  if(tileMap[(row-1)*mapHeight+(col-1)] > 10){
    tileMap[(row-1)*mapHeight+(col-1)] -= 10;
  }
}
function topMiddle2(row, col){
  if(tileMap[(row-1)*mapHeight+col] > 10){
    tileMap[(row-1)*mapHeight+col] -= 10;
  }
}
function topRight2(row, col){
  if(tileMap[(row-1)*mapHeight+(col+1)] > 10){
    tileMap[(row-1)*mapHeight+(col+1)] -= 10;
  }
}
function middleLeft2(row, col){
  if(tileMap[row*mapHeight+(col-1)] > 10){
    tileMap[row*mapHeight+(col-1)] -= 10;
  }
}
function middleRight2(row, col){
  if(tileMap[row*mapHeight+(col+1)] > 10){
    tileMap[row*mapHeight+(col+1)] -= 10;
  }
}
function bottomLeft2(row, col){
  if(tileMap[(row+1)*mapHeight+(col-1)] > 10){
    tileMap[(row+1)*mapHeight+(col-1)] -= 10;
  }
}
function bottomMiddle2(row, col){
  if(tileMap[(row+1)*mapHeight+col] > 10){
    tileMap[(row+1)*mapHeight+col] -= 10;
  }
}
function bottomRight2(row, col){
  if(tileMap[(row+1)*mapHeight+(col+1)] > 10){
    tileMap[(row+1)*mapHeight+(col+1)] -= 10;
  }
}

