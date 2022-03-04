 var firebaseConfig = {
    apiKey: "AIzaSyBM7UQdonqXt07kFibqSYn5gCYmxMfidKs",
    authDomain: "maze-f17dd.firebaseapp.com",
    projectId: "maze-f17dd",
    databaseURL: "https://maze-f17dd-default-rtdb.firebaseio.com/",
    storageBucket: "maze-f17dd.appspot.com",
    messagingSenderId: "158683448622",
    appId: "1:158683448622:web:347352e8baa8d3529aa6bf",
    measurementId: "G-ET3YWH05Q6"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database(); 
function rand(max) {
  return Math.floor(Math.random() * max);
} 
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function displayVictoryMess(moves) {
  var loggedin_id = localStorage.getItem("id");
  var final_score = Math.floor(((current_difficuly * 100) / moves));
     db.ref('users/').child(loggedin_id).update({
            score: final_score
        });
  $("#success_modal").modal("show");
  document.getElementById("moves").innerHTML = "You Moved " + moves + " Steps.";
} 
function displayLossMess() {
  $("#failure_modal").modal("show");
  document.getElementById("moves").innerHTML = "You Moved " + moves + " Steps."; 
}
function Maze(Width, Height) {
  var mazeMap;
  var width = Width;
  var height = Height;
  var startCoord, endCoord, PacmanCoord;
  var dirs = ["n", "s", "e", "w"];
  var modDir = {
    n: {
      y: -1,
      x: 0,
      o: "s"
    },
    s: {
      y: 1,
      x: 0,
      o: "n"
    },
    e: {
      y: 0,
      x: 1,
      o: "w"
    },
    w: {
      y: 0,
      x: -1,
      o: "e"
    }
  };

  this.map = function() {
    return mazeMap;
  };
  this.startCoord = function() {
    return startCoord;
  };
  this.pacmanCoord = function() {
    return pacmanCoord;
  };
  this.endCoord = function() {
    return endCoord;
  };
  function genMap() {
    mazeMap = new Array(height);
    for (y = 0; y < height; y++) {
      mazeMap[y] = new Array(width);
      for (x = 0; x < width; ++x) {
        mazeMap[y][x] = {
          n: false,
          s: false,
          e: false,
          w: false,
          visited: false,
          priorPos: null
        };
      }
    }
  }
  function defineMaze() {
    var isComp = false;
    var move = false;
    var cellsVisited = 1;
    var numLoops = 0;
    var maxLoops = 0;
    var pos = {
      x: 0,
      y: 0
    };
    var numCells = width * height;
    while (!isComp) {
      move = false;
      mazeMap[pos.x][pos.y].visited = true;

      if (numLoops >= maxLoops) {
        shuffle(dirs);
        maxLoops = Math.round(rand(height / 8));
        numLoops = 0;
      }
      numLoops++;
      for (index = 0; index < dirs.length; index++) {
        var direction = dirs[index];
        var nx = pos.x + modDir[direction].x;
        var ny = pos.y + modDir[direction].y;
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          if (!mazeMap[nx][ny].visited) {
            mazeMap[pos.x][pos.y][direction] = true;
            mazeMap[nx][ny][modDir[direction].o] = true;
            mazeMap[nx][ny].priorPos = pos;
            pos = {
              x: nx,
              y: ny
            };
            cellsVisited++;
            move = true;
            break;
          }
        }
      }
      if (!move) {
        pos = mazeMap[pos.x][pos.y].priorPos;
      }
      if (numCells == cellsVisited) {
        isComp = true;
      }
    }
  }
  function defineStartEnd() {
    switch (rand(4)) {
      case 0:
        startCoord = {
          x: 0,
          y: 0
        };
        pacmanCoord = {
          x: 0,
          y: 0
        };
        endCoord = {
          x: height - 1,
          y: width - 1
        };
        break;
      case 1:
        startCoord = {
          x: 0,
          y: width - 1
        };
        pacmanCoord = {
          x: 0,
          y: width - 1
        };
        endCoord = {
          x: height - 1,
          y: 0
        };
        break;
      case 2:
        startCoord = {
          x: height - 1,
          y: 0
        };
        pacmanCoord = {
          x: height - 1,
          y: 0
        };
        endCoord = {
          x: 0,
          y: width - 1
        };
        break;
      case 3:
        startCoord = {
          x: height - 1,
          y: width - 1
        };
        pacmanCoord = {
          x: height - 1,
          y: width - 1
        };
        endCoord = {
          x: 0,
          y: 0
        };
        break;
    }
  }
  genMap();
  defineStartEnd();
  defineMaze();
}
function DrawMaze(Maze, ctx, cellsize, endSprite = null) {
  var map = Maze.map();
  var cellSize = cellsize;
  var drawEndMethod;
  ctx.lineWidth = cellSize / 40;
  this.redrawMaze = function(size) {
    cellSize = size;
    ctx.lineWidth = cellSize / 50;
    drawMap();
    drawEndMethod();
  };
  function drawCell(xCord, yCord, cell) {
    var x = xCord * cellSize;
    var y = yCord * cellSize;
    var gradient = ctx.createLinearGradient(0, 0, 170, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5" ,"blue");
    gradient.addColorStop("1.0", "red");
    if (cell.n == false) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + cellSize, y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    if (cell.s === false) {
      ctx.beginPath();
      ctx.moveTo(x, y + cellSize);
      ctx.lineTo(x + cellSize, y + cellSize);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    if (cell.e === false) {
      ctx.beginPath();
      ctx.moveTo(x + cellSize, y);
      ctx.lineTo(x + cellSize, y + cellSize);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    if (cell.w === false) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + cellSize);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
  function drawMap() {
    for (x = 0; x < map.length; x++) {
      for (y = 0; y < map[x].length; y++) {
        drawCell(x, y, map[x][y]);
      }
    }
  }
  function drawEndFlag() {
    var coord = Maze.endCoord();
    var gridSize = 4;
    var fraction = cellSize / gridSize - 2;
    var colorSwap = true;
    for (let y = 0; y < gridSize; y++) {
      if (gridSize % 2 == 0) {
        colorSwap = !colorSwap;
      }
      for (let x = 0; x < gridSize; x++) {
        ctx.beginPath();
        ctx.rect(
          coord.x * cellSize + x * fraction + 4.5,
          coord.y * cellSize + y * fraction + 4.5,
          fraction,
          fraction
        );
        if (colorSwap) {
          ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        }
        ctx.fill();
        colorSwap = !colorSwap;
      }
    }
  }
  function drawEndSprite() {
    var offsetLeft = cellSize / 50;
    var offsetRight = cellSize / 25;
    var coord = Maze.endCoord();
    ctx.drawImage(
      endSprite,
      2,
      2,
      endSprite.width,
      endSprite.height,
      coord.x * cellSize + offsetLeft,
      coord.y * cellSize + offsetLeft,
      cellSize - offsetRight,
      cellSize - offsetRight
    );
  }
  function clear() {
    var canvasSize = cellSize * map.length;
    ctx.clearRect(0, 0, canvasSize, canvasSize);
  }
  if (endSprite != null) {
    drawEndMethod = drawEndSprite;
  } else {
    drawEndMethod = drawEndFlag;
  }
  clear();
  drawMap();
  drawEndMethod();
}
function Player(maze, c, _cellsize, onComplete, sprite = null) {
  var ctx = c.getContext("2d");
  var drawSprite;
  var moves = 0;
  drawSprite = drawSpriteCircle;
  if (sprite != null) {
    drawSprite = drawSpriteImg;
  }
  var player = this;
  var pacman = this;
  var map = maze.map();
  cellCoords = {
    x: maze.startCoord().x,
    y: maze.startCoord().y
  };
  var cellSize = _cellsize;
  var halfCellSize = cellSize / 2;
  this.redrawPlayer = function(_cellsize) {
    cellSize = _cellsize;
    drawSpriteImg(cellCoords);
  };
  function drawSpriteCircle(coord) {
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(
      (coord.x + 1) * cellSize - halfCellSize,
      (coord.y + 1) * cellSize - halfCellSize,
      halfCellSize - 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
    if (coord.x === maze.endCoord().x && coord.y === maze.endCoord().y) {
      onComplete(moves);
      player.unbindKeyDown();
    }
  }
  function drawSpriteImg(coord) {
    var offsetLeft = cellSize / 50;
    var offsetRight = cellSize / 25;
    ctx.drawImage(
      sprite,
      0,
      0,
      sprite.width,
      sprite.height,
      coord.x * cellSize + offsetLeft,
      coord.y * cellSize + offsetLeft,
      cellSize - offsetRight,
      cellSize - offsetRight
    );
    if (coord.x === maze.endCoord().x && coord.y === maze.endCoord().y) {
      onComplete(moves);
      player.unbindKeyDown();
    }
  }
  function removeSprite(coord) {
    var offsetLeft = cellSize / 50;
    var offsetRight = cellSize / 25;
    ctx.clearRect(
      coord.x * cellSize + offsetLeft,
      coord.y * cellSize + offsetLeft,
      cellSize - offsetRight,
      cellSize - offsetRight
    );
  }
  function check(e) {
    var cell = map[cellCoords.x][cellCoords.y];
    moves++;
    switch (e.keyCode) {
      case 65:
      case 37: // west
        if (cell.w == true) {
          removeSprite(cellCoords);
          cellCoords = {
            x: cellCoords.x - 1,
            y: cellCoords.y
          };
          drawSprite(cellCoords);
          ratPos.push('W');
        }
        break;
      case 87:
      case 38: // north
        if (cell.n == true) {
          removeSprite(cellCoords);
          cellCoords = {
            x: cellCoords.x,
            y: cellCoords.y - 1
          };
          drawSprite(cellCoords);
          ratPos.push('N');
        }
        break;
      case 68:
      case 39: // east
        if (cell.e == true) {
          removeSprite(cellCoords);
          cellCoords = {
            x: cellCoords.x + 1,
            y: cellCoords.y
          };
          drawSprite(cellCoords);
          ratPos.push('E');
        }
        break;
      case 83:
      case 40: // south
        if (cell.s == true) {
          removeSprite(cellCoords);
          cellCoords = {
            x: cellCoords.x,
            y: cellCoords.y + 1
          };
          drawSprite(cellCoords);
          ratPos.push('S');
        }
        break;
    }
  }
  this.bindKeyDown = function() {
    window.addEventListener("keydown", check, false);
    $("#view").swipe({
      swipe: function(
        event,
        direction,
        distance,
        duration,
        fingerCount,
        fingerData
      ) {
        switch (direction) {
          case "up":
            check({
              keyCode: 38
            });
            break;
          case "down":
            check({
              keyCode: 40
            });
            break;
          case "left":
            check({
              keyCode: 37
            });
            break;
          case "right":
            check({
              keyCode: 39
            });
            break;
        }
      },
      threshold: 0
    });
  };
  this.unbindKeyDown = function() {
    window.removeEventListener("keydown", check, false);
    $("#view").swipe("destroy");
  };
  drawSprite(maze.startCoord());
  this.bindKeyDown();
}
function Pacman(maze, c, _cellsize, onComplete, pacmanImg = null) {
  var ctx = c.getContext("2d");
  var drawPacman;
  var moves = 0;
  drawPacman = drawPacmanCircle;
  if (pacmanImg != null) {
    drawPacman = drawPacmanImg;
  }
  var Pacman = this;
  var map = maze.map();
  pacmancellCoords = {
    x: maze.pacmanCoord().x,
    y: maze.pacmanCoord().y
  };
  var cellSize = _cellsize;
  var halfCellSize = cellSize / 2;
  this.redrawPacman = function(_cellsize) {
    cellSize = _cellsize;
    drawPacmanImg(pacmancellCoords);
  };
  function drawPacmanCircle(coord) {
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(
      (coord.x + 1) * cellSize - halfCellSize,
      (coord.y + 1) * cellSize - halfCellSize,
      halfCellSize - 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
    if (coord.x === maze.endCoord().x && coord.y === maze.endCoord().y) {
      onComplete(moves);
    }
  }
  function drawPacmanImg(coord) {
    var offsetLeft = cellSize / 50;
    var offsetRight = cellSize / 25;
    ctx.drawImage(
      pacmanImg,
      0,
      0,
      pacmanImg.width,
      pacmanImg.height,
      coord.x * cellSize + offsetLeft,
      coord.y * cellSize + offsetLeft,
      cellSize - offsetRight,
      cellSize - offsetRight
    );
  }
  function removePacman(coord) {
    var offsetLeft = cellSize / 50;
    var offsetRight = cellSize / 25;
    ctx.clearRect(
      coord.x * cellSize + offsetLeft,
      coord.y * cellSize + offsetLeft,
      cellSize - offsetRight,
      cellSize - offsetRight
    );
  }
  function changePacmanPos(pacmanRevisedCoords){
    removePacman(pacmancellCoords);
    pacmancellCoords = pacmanRevisedCoords;
    drawPacman(pacmanRevisedCoords);
  }
  intervalID = setInterval(function(){
    if(ratPos.length == pacmanCurrentIndex){
      clearInterval(intervalID);
      onComplete();
    }
    pacmanLastStep = ratPos[pacmanCurrentIndex];
    if(cellCoords.x == pacmanCoord.x && cellCoords.y == pacmanCoord.y){
	     
    } else{
      var cell = map[pacmancellCoords.x][pacmancellCoords.y];
    let tempcoords = undefined;
    switch (pacmanLastStep){
      case "E":
            if (cell.e == true) {
              tempcoords = {
                x: pacmancellCoords.x + 1,
                y: pacmancellCoords.y
              };
            }
            break;
      case "W":
            if (cell.w == true) {
              tempcoords = {
                x: pacmancellCoords.x - 1,
                y: pacmancellCoords.y
              };
            }      
            break;
      case "N":
            if (cell.n == true) {
              tempcoords = {
                x: pacmancellCoords.x,
                y: pacmancellCoords.y - 1
              };
            }
            break;
      case "S":
            if (cell.s == true) {
              tempcoords = {
                x: pacmancellCoords.x,
                y: pacmancellCoords.y + 1
              };
            }
            break;
    }    
    if(tempcoords != undefined){
      changePacmanPos(tempcoords);  
      pacmanCurrentIndex++;
    }
    }
  }, pacmanSpeed);
  drawPacman(maze.pacmanCoord());
}
var mazeCanvas = document.getElementById("mazeCanvas");
var ctx = mazeCanvas.getContext("2d");
var sprite;
var finishSprite;
var pacmanImg;
var pacmanLastStep = 'E';
var maze, draw, player, pacman;
var cellSize;
var difficulty;
var cellCoords, pacmancellCoords;
var ratPos = [];
var pacmanCurrentIndex = 0;
var intervalID;
var current_difficuly = getParameterByName('difficulty');
var pacmanSpeed = 10000 / current_difficuly;
window.onload = function() {
  let viewWidth = $("#view").width();
  let viewHeight = $("#view").height();
  if (viewHeight < viewWidth) {
    ctx.canvas.width = viewHeight - viewHeight / 100;
    ctx.canvas.height = viewHeight - viewHeight / 100;
  } else {
    ctx.canvas.width = viewWidth - viewWidth / 100;
    ctx.canvas.height = viewWidth - viewWidth / 100;
  }
  var completeOne = false;
  var completeTwo = false;
  var isComplete = () => {
    if(completeOne === true && completeTwo === true)
       {
         setTimeout(function(){
           makeMaze();
         }, 500);         
       }
  };
  pacmanImg = new Image();
  pacmanImg.src = "pacman.png";
  pacmanImg.onload = function() {
  };
  sprite = new Image();
  sprite.src = "rat.png";
  sprite.onload = function() {
    completeOne = true;
    isComplete();
  };
  finishSprite = new Image();
  finishSprite.src = "hole.jpg";
  finishSprite.onload = function() {
    completeTwo = true;
    isComplete();
  };
};
window.onresize = function() {
  let viewWidth = $("#view").width();
  let viewHeight = $("#view").height();
  if (viewHeight < viewWidth) {
    ctx.canvas.width = viewHeight - viewHeight / 100;
    ctx.canvas.height = viewHeight - viewHeight / 100;
  } else {
    ctx.canvas.width = viewWidth - viewWidth / 100;
    ctx.canvas.height = viewWidth - viewWidth / 100;
  }
  cellSize = mazeCanvas.width / difficulty;
  if (player != null) {
    draw.redrawMaze(cellSize);
    player.redrawPlayer(cellSize);
  }
};
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function makeMaze() {
  if (player != undefined) {
    player.unbindKeyDown();
    player = null;
  }
  if (pacman != undefined) {
    pacman.removePacmanThis();
    pacman = null;
  }
  difficulty = getParameterByName('difficulty');
  cellSize = mazeCanvas.width / difficulty;
  maze = new Maze(difficulty, difficulty);
  draw = new DrawMaze(maze, ctx, cellSize, finishSprite);
  player = new Player(maze, mazeCanvas, cellSize, displayVictoryMess, sprite);
  setTimeout(function(){
    pacman = new Pacman(maze, mazeCanvas, cellSize, displayLossMess, pacmanImg);  
  }, 5000);
  if (document.getElementById("mazeContainer").style.opacity < "100") {
    document.getElementById("mazeContainer").style.opacity = "100";
  }
}