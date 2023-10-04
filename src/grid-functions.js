let main_grid = document.querySelector(".grid-container");
let clearCanvasButton = document.getElementById("reset-button");
let changeSizeButton = document.getElementById("change-size-button");


init_canvas(16);
init_buttons();

function init_canvas(size) {
    let totalSize = size**2;

    let width_height = main_grid.clientHeight/size;
    
    for (let i = 0; i < totalSize; ++i) {
        let grid_item = document.createElement("div");
        grid_item.setAttribute("class", "grid-item");
        grid_item.style.height = `${width_height}px`;
        grid_item.style.width = `${width_height}px`;
        grid_item.addEventListener("mouseover", e => {
            if(e.buttons !== 0) {
                change_background(e.target, "red");
            }
        })
        main_grid.appendChild(grid_item);
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