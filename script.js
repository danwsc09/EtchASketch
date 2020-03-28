const container = document.querySelector(".container");
const resetButton = document.querySelector("#reset");
const clearButton = document.querySelector("#clear");
const randomButton = document.querySelector("#random");
const darkButton = document.querySelector("#dark");
const modeText = document.querySelector(".mode h2");
modeText.textContent = "Mode: Default";

let randomMode = false;
let darkMode = false;
let darkCount = 0;

// initializes size of grid
let containerWidth = 600;
let containerHeight = 600;
container.style.width = `${containerWidth}px`;
container.style.height = `${containerHeight}px`;

// initializes the initial 16x16 grid and stores in an array

let gridArray = [...Array(16)];
for (let i = 0; i < 16; i++) {
    gridArray[i] = [...Array(16)];
}

for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
        gridArray[i][j] = document.createElement("div");
        gridArray[i][j].classList.add("grid");
        gridArray[i][j].style.width = `${containerWidth / 16}px`;
        gridArray[i][j].style.height = `${containerHeight / 16}px`;
        container.appendChild(gridArray[i][j]);
        gridArray[i][j].addEventListener("mouseenter", changeColor);
    }
}

// changes color when hover mouse over grid
function changeColor(e) {
    if (randomMode) {
        let randomColor = Array(3);
        for (let i = 0; i < 3; i++) {
            randomColor[i] = Math.floor(Math.random() * 256)
        }
        e.target.style.backgroundColor = "rgb(" + randomColor[0] 
        + ", " + randomColor[1] + ", " + randomColor[2] + ")";
    } else if (darkMode) {
        // rgb (255, 255, 0) is color yellow
        // everytime count goes up, subtract 10% (around 25) to get a darker color
        // if count is 10 or greater, color in black
        darkCount += 1;
        if (darkCount >= 10) {
            e.target.style.backgroundColor = "black";
        } else {
            e.target.style.backgroundColor = "rgb(" + (255 - 25 * darkCount) 
            + ", " + (255 - 25 * darkCount) + ", " + 0 + ")"
        }
        
    } else {
        e.target.style.backgroundColor = "yellow";
    }
}

// Enters random mode
// If clicked again, sets back to default
function randomColor() {
    randomMode = !randomMode;
    darkMode = false;
    if (randomMode) {
        modeText.textContent = "Mode: Random";
    } else {
        modeText.textContent = "Mode: Default";
    }
}

// Enters dark mode
// If clicked again, sets back to default
function darkColor() {
    darkMode = !darkMode;
    randomMode = false;
    if (darkMode) {
        modeText.textContent = "Mode: Dark";
        darkCount = 0;
    } else {
        modeText.textContent = "Mode: Default";
    }
}

// clears the grid
function clearGrid() {
    gridArray.forEach(row => row.forEach(square => {
        square.style.backgroundColor = "";
    }));
    modeText.textContent = "Mode: Default";
    darkCount = 0;
}

// prompts for number of squares on a side in the grid
// forms a new grid with same overall width but with new number of grids
function resetGrid() {
    let numSide = prompt("How many squares per row would you like?\nEnter a number between 10 ~ 100")
    let num = parseInt(numSide);
    container.textContent = ""; // makes the grid disappear
    
    // Initializes the 2 dimensional square grid in gridArray
    // Can access each square in the grid 
    gridArray = [...Array(num)];
    for (let i = 0; i < num; i++) {
        gridArray[i] = [...Array(num)];
    }

    // Initializes an array with each element representing
    // div containing each row
    const rowArray = [...Array(num)];

    // n x n grid generated through 2 for-loops
    // rowArray contains each row as its elements 
    // gridArray contains each square as 2D array
    for (let i = 0; i < num ; i++) {
        rowArray[i] = document.createElement("div");
        rowArray[i].classList.add("row");
        rowArray[i].style.height = `${containerHeight / num}px`;

        for (let j = 0; j < num; j++) {
            gridArray[i][j] = document.createElement("div");
            gridArray[i][j].classList.add("grid");
            gridArray[i][j].style.width = `${containerWidth / num}px`;
            gridArray[i][j].addEventListener("mouseenter", changeColor);
            rowArray[i].appendChild(gridArray[i][j]);
        }

        container.appendChild(rowArray[i]);
    }
    
    // initializes dark count
    darkCount = 0;
}

resetButton.addEventListener("click", resetGrid);
clearButton.addEventListener("click", clearGrid);
randomButton.addEventListener("click", randomColor);
darkButton.addEventListener("click", darkColor)
