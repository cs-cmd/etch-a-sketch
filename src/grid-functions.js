// global variables for grid, clear button, and change size button
let main_grid = document.querySelector(".grid-container");
let clearCanvasButton = document.getElementById("reset-button");
let changeSizeButton = document.getElementById("change-size-button");

// on script load, initialize canvas and buttons
init_canvas(16);
init_buttons();

// initializes the canvas and grid items
function init_canvas(size) {
    // total size is size*size (square)
    let totalSize = size**2;

    // the width/height of the grid-items should be the height of the main grid divided by the 
    // number of items per row/col
    let width_height = main_grid.clientHeight/size;
    
    // put basic info about node in origin
    let originNode = document.createElement("div");
    originNode.setAttribute("class", "grid-item");
    originNode.style.height = `${width_height}px`;
    originNode.style.width = `${width_height}px`;


    // for 0 to totalSize (size*size), add a div (grid item) element with specified height
    // and width, and mouseover event for 
    for (let i = 0; i < totalSize; ++i) {
        // clone node and add listeners before adding to main grid
        let clone = originNode.cloneNode(true);
        // listeners are not included in cloning, must add before adding
        // to document
        clone.addEventListener("mouseover", e => {
            console.log("help");
            if(e.buttons !== 0) {
                change_background(e.target, "red");
            }
        });
        main_grid.appendChild(clone);
    }
}

function clear_canvas() {
    let nodes = Array.from(main_grid.getElementsByClassName("grid-item"));
    if (nodes === null || nodes.length === 0) {
        return;
    }

    nodes.forEach(element => {
        main_grid.removeChild(element);
    });
}

// Reset canvas to blank slate
function reset_canvas() {
    let children = Array.from(main_grid.getElementsByClassName("grid-item"));

    children.forEach(element => {
        change_background(element, "white");
    });
}

// Resize canvas after clearing
function resize_canvas(size) {
    if (size > 100) {
        console.log("Number too large");
        return;
    }

    if (isNaN(size**2)) {
        console.log("Not a valid number");
        return;
    }

    console.log("clearing...");
    clear_canvas();
    init_canvas(size);
}

function init_buttons() {
    clearCanvasButton.addEventListener("click", () => { reset_canvas() });
    changeSizeButton.addEventListener("click", function() { 
        let size = get_new_size();
        resize_canvas(size);
    });    
}

function change_background(grid, color) {
    grid.style.backgroundColor = color; 
}

function get_new_size() {
    return prompt("Enter number of columns (less than or equal to 100)", 16);
}