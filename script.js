
const container = document.querySelector(".container");
const gridArray = [...Array(256)];
const resetButton = document.querySelector("#reset");

let containerWidth = 700;
container.style.width = "700px"; // `${containerWidth} px`;

for (let i = 0; i < 256; i++) {
    gridArray[i] = document.createElement("div");
    gridArray[i].classList.add("grid");
    gridArray[i].style.width = `${containerWidth / 17}px`;
    gridArray[i].style.height = `${containerWidth / 17}px`;

    container.appendChild(gridArray[i]);
    gridArray[i].addEventListener("mouseenter", changeColor);
}

// changes color when hover mouse over grid
function changeColor(e) {
    e.target.classList.add("hover");
}

// resets grid when button pressed
function resetGrid(e) {
    
}

resetButton.addEventListener("click", resetGrid);

