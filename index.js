// temp map
let map = [
    [1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1]
]

// MIGHT USE LATER +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// helper function to save the current map state
function saveMap(map) {
    let newMap = [[], [], [], [], []];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            newMap[i][j] = map[i][j];
        }
    }
    return newMap;
}


// 3D GLOBAL VARIABLES
// let wallDetection = "1111111111111111";
let wallDetection = Array(18).fill(1);
let dir = 'd';
let currentPos = [1, 1];
let directionRotation = 0;

// checks our direction and approprately turns left
function turnLeft() {
    // facing right
    if (dir === 'r') {
        dir = 'u';
        arrow_frame = 1;
    }// facing left
    else if (dir === 'l') {
        dir = 'd';
        arrow_frame = 0;
    }// facing down
    else if (dir === 'd') {
        dir = 'r';
        arrow_frame = 2;
    }// facing up
    else if (dir === 'u') {
        dir = 'l';
        arrow_frame = 3;
    }
}
// checks our direction and approprately turns right
function turnRight() {
    // facing right
    if (dir === 'r') {
        dir = 'd';
        arrow_frame = 0;
    }// facing left
    else if (dir === 'l') {
        dir = 'u';
        arrow_frame = 1;
    }// facing down
    else if (dir === 'd') {
        dir = 'l';
        arrow_frame = 3;
    }// facing up
    else if (dir === 'u') {
        dir = 'r';
        arrow_frame = 2;
    }
}

// detect walls looking to the left
function checkLeft(maze, CurrPos) {
    const pos = [CurrPos[0],CurrPos[1]];
    const imageKey = Array(18).fill(1);
    const mazeWidth = maze.length;

    // each checks if inbounds of map
    if (pos[0] - 1 >= 0 && maze[pos[0] - 1][pos[1]] === 0)
        // check cell 1 up
        imageKey[1] = 0;
    if (pos[0] + 1 < mazeWidth && maze[pos[0] + 1][pos[1]] === 0) 
        // check cell 1 down
        imageKey[0] = 0;
    if (pos[0] - 1 >= 0 && pos[1] - 1 >= 0 && maze[pos[0] - 1][pos[1] - 1] === 0)
        // check cell up 1 and 1 to left
        imageKey[4] = 0;
    if (pos[0] + 1 < mazeWidth && pos[1] - 1 >= 0 && maze[pos[0] + 1][pos[1] - 1] === 0) 
        // check cell down and 1 to left
        imageKey[2] = 0;
    if (pos[1] - 1 >= 0 && maze[pos[0]][pos[1] - 1] === 0) 
        // check cell 1 to left
        imageKey[3] = 0;
    if (pos[0] - 1 >= 0 && pos[1] - 2 >= 0 && maze[pos[0] - 1][pos[1] - 2] === 0) 
        // check cell up 1 and 2 left
        imageKey[7] = 0;
    if (pos[0] + 1 < mazeWidth && pos[1] - 2 >= 0 && maze[pos[0] + 1][pos[1] - 2] === 0) 
        // check cell down 1 and 2 left
        imageKey[5] = 0;
    if (pos[1] - 2 >= 0 && maze[pos[0]][pos[1] - 2] === 0) 
        // check cell 2 left
        imageKey[6] = 0;
    if (pos[0] - 1 >= 0 && pos[1] - 3 >= 0 && maze[pos[0] - 1][pos[1] - 3] === 0) 
        // check cell up 1 and 3 left
        imageKey[10] = 0;
    if (pos[0] + 1 < mazeWidth && pos[1] - 3 >= 0 && maze[pos[0] + 1][pos[1] - 3] === 0) 
        // check cell down 1 and 3 left
        imageKey[8] = 0;
    if (pos[1] - 3 >= 0 && maze[pos[0]][pos[1] - 3] === 0) 
        // check cell 3 left
        imageKey[9] = 0;
    if (pos[0] - 2 >= 0 && pos[1] - 2 >= 0 && maze[pos[0] - 2][pos[1] - 2] === 0) 
        // check cell up 2 and 2 left
        imageKey[15] = 0;
    if (pos[0] + 2 < mazeWidth && pos[1] - 2 >= 0 && maze[pos[0] + 2][pos[1] - 2] === 0)
        // check cell down 2 and 2 left 
        imageKey[14] = 0;
    if (pos[0] - 2 >= 0 && pos[1] - 3 >= 0 && maze[pos[0] - 2][pos[1] - 3] === 0) 
        // check cell up 2 and 3 left
        imageKey[13] = 0;
    if (pos[0] + 2 < mazeWidth && pos[1] - 3 >= 0 && maze[pos[0] + 2][pos[1] - 3] === 0) 
        // check cell down 2 and 3 left
        imageKey[12] = 0;
    if (pos[1] - 4 >= 0 && maze[pos[0]][pos[1] - 4] === 0) 
        // check cell 4 left
        imageKey[11] = 0;

    return imageKey;
}

// detect walls looking to the right
function checkRight(maze, CurrPos) {
    const pos = [CurrPos[0],CurrPos[1]];
    const imageKey = Array(16).fill(1);
    const mazeHeight = maze[0].length;
    const mazeWidth = maze.length;

    if (pos[0] - 1 >= 0 && maze[pos[0] - 1][pos[1]] === 0) 
        // check cell 1 up
        imageKey[0] = 0;
    if (pos[0] + 1 < mazeWidth && maze[pos[0] + 1][pos[1]] === 0) 
        // check cell 1 down
        imageKey[1] = 0;
    if (pos[0] - 1 >= 0 && pos[1] + 1 < mazeHeight && maze[pos[0] - 1][pos[1] + 1] === 0)
        // check cell 1 up and 1 right 
        imageKey[2] = 0;
    if (pos[0] + 1 < mazeWidth && pos[1] + 1 < mazeHeight && maze[pos[0] + 1][pos[1] + 1] === 0) 
        // check cell 1 down and 1 right
        imageKey[4] = 0;
    if (pos[1] + 1 < mazeHeight && maze[pos[0]][pos[1] + 1] === 0) 
        // check cell 1 right
        imageKey[3] = 0;
    if (pos[0] - 1 >= 0 && pos[1] + 2 < mazeHeight && maze[pos[0] - 1][pos[1] + 2] === 0) 
        // check cell 1 up and 2 right
        imageKey[5] = 0;
    if (pos[0] + 1 < mazeWidth && pos[1] + 2 < mazeHeight && maze[pos[0] + 1][pos[1] + 2] === 0) 
        // check cell 1 down and 2 right
        imageKey[7] = 0;
    if (pos[1] + 2 < mazeHeight && maze[pos[0]][pos[1] + 2] === 0) 
        // check cell 2 right
        imageKey[6] = 0;
    if (pos[0] - 1 >= 0 && pos[1] + 3 < mazeHeight && maze[pos[0] - 1][pos[1] + 3] === 0) 
        // check cell 1 up and 3 right
        imageKey[8] = 0;
    if (pos[0] + 1 < mazeWidth && pos[1] + 3 < mazeHeight && maze[pos[0] + 1][pos[1] + 3] === 0) 
        // check cell 1 down and 3 right
        imageKey[10] = 0;
    if (pos[1] + 3 < mazeHeight && maze[pos[0]][pos[1] + 3] === 0) 
        // check cell 3 right
        imageKey[9] = 0;
    if (pos[0] - 2 >= 0 && pos[1] + 2 < mazeHeight && maze[pos[0] - 2][pos[1] + 2] === 0) 
        // check cell 2 up and 2 right
        imageKey[14] = 0;
    if (pos[0] + 2 < mazeWidth && pos[1] + 2 < mazeHeight && maze[pos[0] + 2][pos[1] + 2] === 0) 
        // check cell 2 down and 2 right
        imageKey[15] = 0;
    if (pos[0] - 2 >= 0 && pos[1] + 3 < mazeHeight && maze[pos[0] - 2][pos[1] + 3] === 0) 
        // check cell 2 up and 3 right
        imageKey[12] = 0;
    if (pos[0] + 2 < mazeWidth && pos[1] + 3 < mazeHeight && maze[pos[0] + 2][pos[1] + 3] === 0) 
        // check cell 2 down and 3 right
        imageKey[13] = 0;
    if (pos[1] + 4 < mazeHeight && maze[pos[0]][pos[1] + 4] === 0) 
        // check cell 4 right
        imageKey[11] = 0;

    return imageKey;
}

// detect walls looking down
function checkDown(maze, CurrPos) {
    const pos = [CurrPos[0],CurrPos[1]];
    const imageKey = Array(16).fill(1);
    const mazeHeight = maze[0].length;
    const mazeWidth = maze.length;

    // each checks if inbounds of map
    if (pos[1] - 1 >= 0 && maze[pos[0]][pos[1] - 1] === 0) 
        // check cell 1 left
        imageKey[1] = 0;
    if (pos[1] + 1 < mazeHeight && maze[pos[0]][pos[1] + 1] === 0) 
        // check cell 1 right
        imageKey[0] = 0;
    if (pos[0] + 1 < mazeWidth && pos[1] - 1 >= 0 && maze[pos[0] + 1][pos[1] - 1] === 0) 
        // check cell 1 down and 1 left
        imageKey[4] = 0;
    if (pos[0] + 1 < mazeWidth && pos[1] + 1 < mazeHeight && maze[pos[0] + 1][pos[1] + 1] === 0) 
        // check cell 1 down and 1 right
        imageKey[2] = 0;
    if (pos[0] + 1 < mazeWidth && maze[pos[0] + 1][pos[1]] === 0) 
        // check cell 1 down
        imageKey[3] = 0;
    if (pos[0] + 2 < mazeWidth && pos[1] - 1 >= 0 && maze[pos[0] + 2][pos[1] - 1] === 0) 
        // check cell 2 down and 1 left
        imageKey[7] = 0;
    if (pos[0] + 2 < mazeWidth && pos[1] + 1 < mazeHeight && maze[pos[0] + 2][pos[1] + 1] === 0) 
        // check cell 2 down and 1 right
        imageKey[5] = 0;
    if (pos[0] + 2 < mazeWidth && maze[pos[0] + 2][pos[1]] === 0) 
        // check cell 2 down
        imageKey[6] = 0;
    if (pos[0] + 3 < mazeWidth && pos[1] - 1 >= 0 && maze[pos[0] + 3][pos[1] - 1] === 0) 
        // check cell down 3 and left 1
        imageKey[10] = 0;
    if (pos[0] + 3 < mazeWidth && pos[1] + 1 < mazeHeight && maze[pos[0] + 3][pos[1] + 1] === 0) 
        // check cell down 3 and right 1
        imageKey[8] = 0;
    if (pos[0] + 3 < mazeWidth && maze[pos[0] + 3][pos[1]] === 0) 
        // check cell down 3
        imageKey[9] = 0;
    if (pos[0] + 2 < mazeWidth && pos[1] - 2 >= 0 && maze[pos[0] + 2][pos[1] - 2] === 0) 
        // check cell down 2 and left 2
        imageKey[15] = 0;
    if (pos[0] + 2 < mazeWidth && pos[1] + 2 < mazeHeight && maze[pos[0] + 2][pos[1] + 2] === 0) 
        // check cell down 2 and right 2
        imageKey[14] = 0;
    if (pos[0] + 3 < mazeWidth && pos[1] - 2 >= 0 && maze[pos[0] + 3][pos[1] - 2] === 0) 
        // check cell down 3 and left 2
        imageKey[13] = 0;
    if (pos[0] + 3 < mazeWidth && pos[1] + 2 < mazeHeight && maze[pos[0] + 3][pos[1] + 2] === 0) 
        // check cell down 3 and right 2
        imageKey[12] = 0;
    if (pos[0] + 4 < mazeWidth && maze[pos[0] + 4][pos[1]] === 0) 
        // check cell down 4
        imageKey[11] = 0;

    return imageKey;
}

// detect walls looking up
function checkUp(maze, CurrPos) {
    const pos = [CurrPos[0],CurrPos[1]];
    const imageKey = Array(16).fill(1);
    const mazeHeight = maze.length;

    if (pos[1] - 1 >= 0 && maze[pos[0]][pos[1] - 1] === 0) 
        // check cell 1 left 
        imageKey[0] = 0;
    if (pos[1] + 1 < mazeHeight && maze[pos[0]][pos[1] + 1] === 0) 
        // check cell 1 right
        imageKey[1] = 0;
    if (pos[0] - 1 >= 0 && pos[1] - 1 >= 0 && maze[pos[0] - 1][pos[1] - 1] === 0) 
        // check cell 1 up and 1 left
        imageKey[2] = 0;
    if (pos[0] - 1 >= 0 && pos[1] + 1 < mazeHeight && maze[pos[0] - 1][pos[1] + 1] === 0) 
        // check cell 1 up and 1 right
        imageKey[4] = 0;
    if (pos[0] - 1 >= 0 && maze[pos[0] - 1][pos[1]] === 0) 
        // check cell 1 up
        imageKey[3] = 0;
    if (pos[0] - 2 >= 0 && pos[1] - 1 >= 0 && maze[pos[0] - 2][pos[1] - 1] === 0) 
        // check cell 2 up and 1 left
        imageKey[5] = 0;
    if (pos[0] - 2 >= 0 && pos[1] + 1 < mazeHeight && maze[pos[0] - 2][pos[1] + 1] === 0) 
        // check cell 2 up and 1 riight
        imageKey[7] = 0;
    if (pos[0] - 2 >= 0 && maze[pos[0] - 2][pos[1]] === 0) 
        // check cell 2 up
        imageKey[6] = 0;
    if (pos[0] - 3 >= 0 && pos[1] - 1 >= 0 && maze[pos[0] - 3][pos[1] - 1] === 0) 
        // check cell 3 up and 1 left
        imageKey[8] = 0;
    if (pos[0] - 3 >= 0 && pos[1] + 1 < mazeHeight && maze[pos[0] - 3][pos[1] + 1] === 0) 
        // check cell 3 up and 1 right
        imageKey[10] = 0;
    if (pos[0] - 3 >= 0 && maze[pos[0] - 3][pos[1]] === 0) 
        // check cell 3 up
        imageKey[9] = 0;
    if (pos[0] - 2 >= 0 && pos[1] - 2 >= 0 && maze[pos[0] - 2][pos[1] - 2] === 0) 
        // check cell 2 up and 2 left
        imageKey[14] = 0;
    if (pos[0] - 2 >= 0 && pos[1] + 2 < mazeHeight && maze[pos[0] - 2][pos[1] + 2] === 0) 
        // check cell 2 up and 2 right
        imageKey[15] = 0;
    if (pos[0] - 3 >= 0 && pos[1] - 2 >= 0 && maze[pos[0] - 3][pos[1] - 2] === 0) 
        // check cell 3 up and 2 left
        imageKey[12] = 0;
    if (pos[0] - 3 >= 0 && pos[1] + 2 < mazeHeight && maze[pos[0] - 3][pos[1] + 2] === 0) 
        // check cell 3 up and 2 right
        imageKey[13] = 0;
    if (pos[0] - 4 >= 0 && maze[pos[0] - 4][pos[1]] === 0) 
        // check cell 4 up
        imageKey[11] = 0;

    return imageKey;
}

// function to move player in a direction
function move(dir) {
    // check if the move is valid based on the direction
    if (dir == 'u' && currentPos[0] - 1 >= 0 && map[currentPos[0] - 1][currentPos[1]] != 1) {
        // move the player
        currentPos[0] = currentPos[0] - 1;
        // face the mini map in correct direction
        arrow_frame = 1;
    }
    if (dir == 'd' && currentPos[0] + 1 < map.length && map[currentPos[0] + 1][currentPos[1]] != 1) {
        currentPos[0] = currentPos[0] + 1;
        arrow_frame = 0;
    }
    if (dir == 'r' && currentPos[1] + 1 < map[0].length && map[currentPos[0]][currentPos[1] + 1] != 1) {
        currentPos[1] = currentPos[1] + 1;
        arrow_frame = 2;
    }
    if (dir == 'l' && currentPos[1] - 1 >= 0 && map[currentPos[0]][currentPos[1] - 1] != 1) {
        currentPos[1] = currentPos[1] - 1;
        arrow_frame = 3;
    }
}

// creates multiple images from single image
function sprite_sheet(img, numFrames, numFramesInRow, sourceX, sourceY, frameWidth, frameHeight, destX, destY) {
    let sSheet = [];
    for (let i = 0; i < numFrames; i++) {
        // The horizontal position in the spritesheet row
        let posInColmn = i % numFramesInRow; // ex. first row of sheet has 3 frames so we can rotate through 0, 1, 2
        // The vertical offset in the spritesheet
        let rowNumber = Math.floor(i / numFramesInRow); // ex. say i=5 & numFramesInRow=3, then rowNumber = 1 (5/3 = 1.66, floor(1.66) = 1) the second row
        sSheet[i] = {
            image: img,
            sx: sourceX + posInColmn * frameWidth,
            sy: sourceY + rowNumber * frameHeight,
            sWidth: frameWidth,
            sHeight: frameHeight,
            dx: destX,
            dy: destY,
            dWidth: frameWidth,
            dHeight: frameHeight
        };
    }
    return sSheet;
}

// create miniMap sprite sheet
const playerImg = new Image();
playerImg.src = "./images/arrow-sheet.png";
let frameWidth = 10;  // width of a single frame
let frameHeight = 10; // height of a single frame
let numFrames = 4;    // total number of frames
let framesInRow = 4;
let arrow_spritesheet = sprite_sheet(playerImg, numFrames, framesInRow, 0, 0, frameWidth, frameHeight, 50, 50);
let arrow_frame = 0;

// create 3D view sprite sheet
const view3D_image = new Image();
view3D_image.src = "./images/walls-sheet.png";
frameWidth = 194;  // width of a single frame
frameHeight = 194; // height of a single frame
numFrames = 27;    // total number of frames
framesInRow = 27;
let view3D_spritesheet = sprite_sheet(view3D_image, numFrames, framesInRow, 0, 0, frameWidth, frameHeight, 50, 50);
let view3D_frame = 0;

// create 3D view of lines dipictiong motion
const shadow_image = new Image();
shadow_image.src = "./images/shadow-sheet.png";
frameWidth = 194;  // width of a single frame
frameHeight = 194; // height of a single frame
numFrames = 2;    // total number of frames
framesInRow = 2;
let shadow_spritesheet = sprite_sheet(shadow_image, numFrames, framesInRow, 0, 0, frameWidth, frameHeight, 50, 50);
let shadow_frame = 0;

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

let nodes = {}

function getNeighbors(col,row){
    let neighbors = [];
    // down
    if (col+2 < map.length && nodes[(col+2).toString()+row.toString()][2] == 'f'){
        neighbors.push([col+2,row,'d']);
    } 
    // up
    if (col-2 > 0 && nodes[(col-2).toString()+row.toString()][2] == 'f'){
        neighbors.push([col-2,row,'u']);
    } 
    // right
    if (row+2 < map.length && nodes[col.toString()+(row+2).toString()][2] == 'f'){
        neighbors.push([col,row+2,'r']);
    } 
    // left
    if (row-2 > 0 && nodes[col.toString()+(row-2).toString()][2] == 'f'){
        neighbors.push([col,row-2,'l']);
    } 
    return neighbors;
}

function makeMap(width, height){
    let map = [];
    for(let i = 0; i < height; i++){
        map[i] = Array(width).fill(1);
    }
    for(let i = 1; i < height; i += 2){
        for(let j = 1; j < width; j += 2){
            map[i][j] = 0;
            nodes[i.toString()+j.toString()] = [i,j,'f'];
        }
    }
    return map;
}

let w = 15;
let h = 15;

map = makeMap(w,h);

// Set internal canvas size
miniMapCanvas.width = w*25; 
miniMapCanvas.height = h*25;

function changeMap(map){
    for(let i = 1; i < map.length; i += 2){
        for(let j = 1; j < map.length; j += 2){
            n = getNeighbors(i,j);
            
            if (n.length > 0){
                num = getRandomInt(0,n.length);
                path = n[num];
                if(path[2] == 'd'){
                    map[i+1][j]=0;
                    nodes[i.toString()+j.toString()][2] = 't';
                }
                if(path[2] == 'u'){
                    map[i-1][j]=0;
                    nodes[i.toString()+j.toString()][2] = 't';
                }
                if(path[2] == 'r'){
                    map[i][j+1]=0;
                    nodes[i.toString()+j.toString()][2] = 't';
                }
                if(path[2] == 'l'){
                    map[i][j-1]=0;
                    nodes[i.toString()+j.toString()][2] = 't';
                }
            }
            
        }
    }
}
changeMap(map);

for(let i = 1; i < map.length; i ++){
    for(let j = 1; j < map.length; j ++){
        let ran = getRandomInt(1,100);
        if (ran > 90 && j < w){
            map[i][j] = 0
        }
    }
}

function update_display() {
    // for display mini map
    const miniMapCanvas = document.getElementById("miniMapCanvas");

// // Set internal canvas size
// miniMapCanvas.width = 900; 
// miniMapCanvas.height = 900;

const miniMap = miniMapCanvas.getContext("2d");

// Optional: Set the CSS size (display size)
// miniMapCanvas.style.width = "400px";
// miniMapCanvas.style.height = "400px";

    const cellSize = 25;

    // for display 3D view of game
    const map3DCanvas = document.getElementById("map3DCanvas");
    const map3D = map3DCanvas.getContext("2d");
    function drawWall(index, sheet=view3D_spritesheet) {
        map3D.drawImage(
            sheet[index]['image'],
            sheet[index]['sx'], sheet[index]['sy'],
            sheet[index]['sWidth'], sheet[index]['sHeight'], 0, 0, 194 * 2, 194 * 2,
        );
    }

    // facing right
    if (dir == 'r') {
        wallDetection = checkRight(map, currentPos);
    }// facing left
    else if (dir == 'l') { 
        wallDetection = checkLeft(map, currentPos);
    }// facing down
    else if (dir == 'd') {
        wallDetection = checkDown(map, currentPos);
    }// facing up
    else if (dir == 'u') { 
        wallDetection = checkUp(map, currentPos);
    }

    // draw 3D background
    view3D_frame = 0;
    drawWall(view3D_frame);

    // rotates the images on floor to simulate movement
    if(directionRotation % 2 == 0){
        shadow_frame = 0;
        drawWall(shadow_frame,shadow_spritesheet);
    }
    else{
        shadow_frame = 1;
        drawWall(shadow_frame,shadow_spritesheet);
    }

    // row 4 ---------------------------------------------------------------
    //  render back most wall infront of player
    if (wallDetection[11] == '1') {
        view3D_frame = 18;
        drawWall(view3D_frame);
        view3D_frame = 23;
        drawWall(view3D_frame);
        view3D_frame = 24;
        drawWall(view3D_frame);
        view3D_frame = 25;
        drawWall(view3D_frame);
        view3D_frame = 26;
        drawWall(view3D_frame);
    }
    if (wallDetection[13] == '1') {
        view3D_frame = 21;
        drawWall(view3D_frame);

    } if (wallDetection[12] == '1') {
        view3D_frame = 22;
        drawWall(view3D_frame);

    }
    if (wallDetection[15] == '1') {
        view3D_frame = 19;
        drawWall(view3D_frame);

    } if (wallDetection[14] == '1') {
        view3D_frame = 20;
        drawWall(view3D_frame);

    }
    //  row 3 ---------------------------------------------------------------
    //  wall to player front left+2
    if (wallDetection[8] == '1') {
        //  render its front face and side face
        view3D_frame = 2;
        drawWall(view3D_frame);

        view3D_frame = 4;
        drawWall(view3D_frame);

    }//  wall to player front right+2
    if (wallDetection[10] == '1') {
        //  render its front face and side face
        view3D_frame = 1;
        drawWall(view3D_frame);

        view3D_frame = 5;
        drawWall(view3D_frame);

    }//  render wall infront of player
    if (wallDetection[9] == '1') {
        view3D_frame = 3;
        drawWall(view3D_frame);

    }
    //  row 2 ---------------------------------------------------------------
    //  wall to player front left+1
    if (wallDetection[5] == '1') {
        //  render its front face and side face
        view3D_frame = 6;
        drawWall(view3D_frame);

        view3D_frame = 8;
        drawWall(view3D_frame);

    }//  wall to player front right+1
    if (wallDetection[7] == '1') {
        //  render its front face and side face
        view3D_frame = 7;
        drawWall(view3D_frame);

        view3D_frame = 9;
        drawWall(view3D_frame);

    }//  render wall infront of player
    if (wallDetection[6] == '1') {
        view3D_frame = 12;
        drawWall(view3D_frame);

    }
    //  row 1 in front of player --------------------------------------------
    //  wall to player front left
    if (wallDetection[2] == '1') {
        //  render its front face and side face
        view3D_frame = 10;
        drawWall(view3D_frame);

        view3D_frame = 16;
        drawWall(view3D_frame);

    }//  wall to player front right
    if (wallDetection[4] == '1') {
        //  render its front face and side face
        view3D_frame = 11;
        drawWall(view3D_frame);

        view3D_frame = 17;
        drawWall(view3D_frame);

    }//  render wall directly infront of player
    if (wallDetection[3] == '1') {
        view3D_frame = 13;
        drawWall(view3D_frame);

    }

    //  row 0 containging player --------------------------------------------
    //  render wall to your left peripheral
    if (wallDetection[0] == '1') {
        view3D_frame = 15;
        drawWall(view3D_frame);

    }//  render wall to your right peripheral
    if (wallDetection[1] == '1') {
        view3D_frame = 14;
        drawWall(view3D_frame);
    }

    // draws mini map
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === 1) {
                miniMap.fillStyle = "black";
            } else {
                miniMap.fillStyle = "white";
            }
            miniMap.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);

            if (currentPos[0] === i && currentPos[1] === j) {
                miniMap.drawImage(
                    arrow_spritesheet[arrow_frame]['image'],
                    arrow_spritesheet[arrow_frame]['sx'], arrow_spritesheet[arrow_frame]['sy'],
                    arrow_spritesheet[arrow_frame]['sWidth'], arrow_spritesheet[arrow_frame]['sHeight'],
                    j * cellSize + 5,
                    i * cellSize + 5,
                    cellSize - 10,
                    cellSize - 10
                );
            }

            // Draw grid lines
            miniMap.strokeStyle = "gray";
            miniMap.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
    }
}

// load images before displaying
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}
Promise.all([
    loadImage("./images/arrow-sheet.png"),
    loadImage("./images/walls-sheet.png"),
    loadImage("./images/shadow-sheet.png")
]).then(() => {
    console.log("All images loaded");
    // start displaying game when ready
    // setInterval(()=>{
        update_display();
    // },1000);
});

// main game loop to handle button clicks
for (let i = 0; i < document.querySelectorAll(".DirButton").length; i++) {
    document.querySelectorAll(".DirButton")[i].addEventListener("click", function () {
        let direction = document.querySelectorAll(".DirButton")[i].className;
        // Get the direction from the class name
        direction = direction.split(' ')[1];
        switch (direction) {
            // key to go forward
            case 'move':
                // rotates the images on floor to simulate movement
                directionRotation++;
                move(dir);
                update_display();
                break;

            // key to turn left
            case 'left':
                turnLeft();
                update_display();
                break;

            // key to turn right
            case 'right':
                turnRight();
                update_display();
                break;
        }
    });
}

// Alt keyboard controls
// Keyboard input
document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowLeft':
            turnLeft();
            update_display();
            break;

        case 'ArrowRight':
            turnRight();
            update_display();
            break;

        case 'ArrowUp':
            // rotates the images on floor to simulate movement
            directionRotation++;
            move(dir);
            update_display();
            break;
    }
});
