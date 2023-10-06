// global variables for grid, clear button, and change size button
let main_grid = document.getElementById("main-grid");
let canvasColorPicker = document.getElementById("color-selection-item");

let lastActiveDrawingButton = null;
let paintColor;

function setDrawingButton(button) {
    let buttonFunction = button.getAttribute('ro-function');

    switch (buttonFunction) {
        case "draw":
            paintColor = canvasColorPicker.value;
            break;
        case "erase":
            paintColor = "white";
            break;
    };

    // if buttons are same, return, don't do anything
    if (button === lastActiveDrawingButton) {
        console.log("Buttons are the same; returning...");
        return;
    }

    button.classList.toggle('active-draw-button');
    if (lastActiveDrawingButton !== null) {
        lastActiveDrawingButton.classList.toggle('active-draw-button');
    }
    lastActiveDrawingButton = button;
} 



// does the work of actually painting to the canvas
let paintFunc = function(event) {
    if(event.buttons !== 0) {
        change_background(event.target, paintColor);
    }
}

// initializes the canvas and grid items
function init_canvas(size) {
    // total size is size*size (square)
    let totalSize = size**2;

    let gridStyle = getComputedStyle(main_grid);

    // the width/height of the grid-items should be the height of the main grid divided by the 
    // number of items per row/col
    let width_height = parseInt(gridStyle.getPropertyValue("width"))/size;

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
        clone.addEventListener("mousedown", e => { paintFunc(e) });
        clone.addEventListener("mousemove", e => { paintFunc(e) });
        main_grid.appendChild(clone);
    }
}

// converts nodes to array and clears them from main grid
function clear_canvas() {
    let nodes = Array.from(main_grid.getElementsByClassName("grid-item"));
    if (nodes === null || nodes.length === 0) {
        return;
    }

    // remove child from grid, clearing the main grid out
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
    let clearCanvasButton = document.getElementById("reset-button");
    let changeSizeButton = document.getElementById("change-size-button");

    clearCanvasButton.addEventListener("click", () => { reset_canvas() });
    changeSizeButton.addEventListener("click", function() { 
        let size = get_new_size();
        resize_canvas(size);
    }); 
    
    let drawButton = document.getElementById("pen-button");
    let eraseButton = document.getElementById("eraser-button");

    drawButton.classList.toggle("active-draw-button");
    eraseButton.classList.toggle("active-draw-button");

    drawButton.addEventListener("click", (e) => { setDrawingButton(e.target) });
    eraseButton.addEventListener("click", (e) => { setDrawingButton(e.target) });

    setDrawingButton(drawButton);
}

function change_background(grid, color) {
    grid.style.backgroundColor = color; 
}

function get_new_size() {
    let changeSizeInput = document.getElementById("new-size-input");
    return changeSizeInput.value;
}

// Perform setup functions after declaring all
init_canvas(16);
canvasColorPicker.value = "#000000";
canvasColorPicker.addEventListener("input", (e) => {
    paintColor = e.target.value;
})
init_buttons();
