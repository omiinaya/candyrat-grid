var cols, rows;                                                     //inititing cols and rows
var w = 40;                                                         //width of each cell
var grid = [];                                                      //grid object
var sets = [];                                                      //still no clue what sets does exactly but it works
var cursorX = 0;                                                    //starting x coordinate of player
var cursorY = 0;                                                    //starting y coordinate of player
var selected;                                                       //variable that holds current player position

function setup() {
  createCanvas(600, 600);                                           //initiate a canvas with width and hegiht
  cols = floor(width / w);                                          //defining columns = 300/20 = 15
  rows = floor(height / w);                                         //defining rows = 300/20 = 15

  for (var j = 0; j < rows; j++) {                                  //for loop runs 15 times to create 15 rows
    for (var i = 0; i < cols; i++) {                                //for loop runs 15 times to create 15 cols
      var cell = new Cell(i, j);                                    //class that defines the cell
      grid.push(cell);                                              //pushing cell to grid
      sets.push([cell.id])                                          //pushing cell.ids to sets
    }
  }
}

var layout = [                                                      //variable that holds our map
//01  02  03  04  05  06  07  08  09  10  11  12  13  14  15
  11, 01, 01, 08, 01, 01, 01, 08, 01, 01, 01, 08, 01, 01, 02, //01
  12, 11, 02, 12, 15, 14, 03, 12, 15, 14, 03, 12, 15, 02, 12, //02
  12, 06, 11, 10, 14, 14, 17, 10, 17, 14, 14, 10, 02, 05, 12, //03
  08, 14, 09, 11, 14, 03, 12, 16, 12, 15, 14, 02, 07, 14, 08, //04
  12, 16, 12, 12, 11, 14, 09, 12, 06, 14, 02, 12, 12, 16, 12, //05
  12, 05, 12, 05, 12, 16, 12, 06, 14, 03, 12, 05, 12, 05, 12, //06
  08, 14, 10, 17, 13, 12, 07, 17, 17, 14, 10, 17, 10, 14, 08, //07
  12, 15, 03, 12, 15, 13, 07, 08, 09, 11, 03, 12, 15, 03, 12, //08
  08, 14, 17, 10, 17, 14, 10, 10, 09, 12, 11, 10, 17, 14, 08, //09
  12, 16, 12, 16, 12, 15, 14, 02, 12, 05, 12, 16, 12, 16, 12, //10
  12, 05, 12, 12, 06, 14, 02, 12, 07, 14, 13, 12, 12, 05, 12, //11
  08, 14, 09, 06, 01, 03, 12, 05, 12, 15, 14, 13, 07, 14, 08, //12
  12, 11, 06, 17, 14, 14, 10, 17, 10, 14, 14, 17, 13, 02, 12, //13
  12, 06, 13, 12, 15, 01, 03, 12, 15, 01, 01, 12, 06, 13, 12, //14
  06, 01, 01, 08, 01, 01, 01, 08, 01, 01, 01, 08, 01, 01, 13, //15
]

//currently placeholder
var candies = [                                                       //variable that will hold our candies
//01  02  03  04  05  06  07  08  09  10  11  12  13  14  15
  11, 01, 01, 08, 01, 01, 01, 08, 01, 01, 01, 08, 01, 01, 02, //01
  12, 11, 02, 12, 15, 14, 03, 12, 15, 14, 03, 12, 15, 02, 12, //02
  12, 06, 11, 10, 14, 14, 17, 10, 17, 14, 14, 10, 02, 05, 12, //03
  08, 14, 09, 11, 14, 03, 12, 16, 12, 15, 14, 02, 07, 14, 08, //04
  12, 16, 12, 12, 11, 14, 09, 12, 06, 14, 02, 12, 12, 16, 12, //05
  12, 05, 12, 05, 12, 16, 12, 06, 14, 03, 12, 05, 12, 05, 12, //06
  08, 14, 10, 17, 13, 12, 07, 17, 17, 14, 10, 17, 10, 14, 08, //07
  12, 15, 03, 12, 15, 13, 07, 08, 09, 11, 03, 12, 15, 03, 12, //08
  08, 14, 17, 10, 17, 14, 10, 10, 09, 12, 11, 10, 17, 14, 08, //09
  12, 16, 12, 16, 12, 15, 14, 02, 12, 05, 12, 16, 12, 16, 12, //10
  12, 05, 12, 12, 06, 14, 02, 12, 07, 14, 13, 12, 12, 05, 12, //11
  08, 14, 09, 06, 01, 03, 12, 05, 12, 15, 14, 13, 07, 14, 08, //12
  12, 11, 06, 17, 14, 14, 10, 17, 10, 14, 14, 17, 13, 02, 12, //13
  12, 06, 13, 12, 15, 01, 03, 12, 15, 01, 01, 12, 06, 13, 12, //14
  06, 01, 01, 08, 01, 01, 01, 08, 01, 01, 01, 08, 01, 01, 13, //15
]

function draw() {
  background("#000000");                          //sets background black
  for (var i = 0; i < grid.length; i++) {         //for every element in the grid...
    grid[i].show();                               //draw grid

    //order: top, right, bottom, left

    //top, bottom
    if (layout[i] == 01) {
      grid[i].walls = [true, false, true, false]
    }

    //top, right
    else if (layout[i] == 02) {
      grid[i].walls = [true, true, false, false]
    }

    //top, right, bottom
    else if (layout[i] == 03) {
      grid[i].walls = [true, true, true, false]
    }

    //top, right, bottom, left
    else if (layout[i] == 04) {
      grid[i].walls = [true, true, true, true]
    }

    //right, bottom, left
    else if (layout[i] == 05) {
      grid[i].walls = [false, true, true, true]
    }

    //bottom, left
    else if (layout[i] == 06) {
      grid[i].walls = [false, false, true, true]
    }

    //left
    else if (layout[i] == 07) {
      grid[i].walls = [false, false, false, true]
    }

    //no walls
    else if (layout[i] == 08) {
      grid[i].walls = [false, false, false, false]
    }

    //right
    else if (layout[i] == 09) {
      grid[i].walls = [false, true, false, false]
    }

    //bottom
    else if (layout[i] == 10) {
      grid[i].walls = [false, false, true, false]
    }

    //top, left
    else if (layout[i] == 11) {
      grid[i].walls = [true, false, false, true]
    }

    //right, left
    else if (layout[i] == 12) {
      grid[i].walls = [false, true, false, true]
    }

    //right, bottom
    else if (layout[i] == 13) {
      grid[i].walls = [false, true, true, false]
    }

    //top, bottom
    else if (layout[i] == 14) {
      grid[i].walls = [true, false, true, false]
    }

    //top, bottom, left
    else if (layout[i] == 15) {
      grid[i].walls = [true, false, true, true]
    }

    //top, right, left
    else if (layout[i] == 16) {
      grid[i].walls = [true, true, false, true]
    }

    //top
    else if (layout[i] == 17) {
      grid[i].walls = [true, false, false, false]
    }
  }

  //defines selected to allow player movement
  selected = grid.filter(cell => (cell.i === cursorX && cell.j === cursorY))[0];         //define player object
  selected.highlight();                                                                  //mark player blue
  grid[grid.length - 1].highlight(true);                                                 //mark last cell red
  if (grid[grid.length - 1].id === selected.id) reset();                                 //reset on player touch red

}


function keyPressed() {
  if (key == 'R' || key == 'r') {
    cursorX = 0;
    cursorY = 0;
  }
  else if ((key == 'W' || key == 'w') && cursorY > 0) {
    if (!selected.walls[0]) {
      console.log(selected)
      cursorY--;
    }
  } else if ((key == 'A' || key == 'a') && cursorX > 0) {
    if (!selected.walls[3]) {
      console.log(selected)
      cursorX--;
    }
  } else if ((key == 'S' || key == 's') && cursorY < rows - 1) {
    if (!selected.walls[2]) {
      console.log(selected)
      cursorY++;
    }
  } else if ((key == 'D' || key == 'd') && cursorX < cols - 1) {
    if (!selected.walls[1]) {
      console.log(selected)
      cursorX++;
    }
  }
}

function reset() {
  grid = [];
  cursorX = 0;
  cursorY = 0;
  sets = [];
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
      sets.push([cell.id])
    }
  }
}