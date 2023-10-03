let main_grid = document.querySelector(".grid-container");
let clearCanvasButton = document.getElementById("reset-button");
let changeSizeButton = document.getElementById("change-size-button");


init_canvas(16);

function init_canvas(size) {
    if (size > 100) {
        console.log("Number too large");
        return;
    }

    let totalSize = size**2;
    if (isNaN(totalSize)) {
        console.log("Not a valid number");
        return;
    }

    for (let i = 0; i < totalSize; ++i) {
        let grid_item = document.createElement("div");
        grid_item.setAttribute("class", "grid-item");
        grid_item.addEventListener("click", function(e) {
            change_background(e.target, "red");
        });
        main_grid.appendChild(grid_item);
    }
    init_buttons();
}

function clear_canvas() {
    let nodes = main_grid.getElementsByClassName("grid-item");
    if (nodes === null || nodes.length === 0) {
        return;
    }

    nodes.array.forEach(element => {
        main_grid.removeChild(element);
    })
}
function reset_canvas() {
    main_grid.getElementsByClassName("grid-item").array.forEach(element => {
        change_background(element, "white");
        console.log("help");
    });
}

function resize_canvas(size) {
    clear_canvas();
    init_canvas(size**2)
}

function init_buttons() {
    clearCanvasButton.addEventListener("click", () => { reset_canvas() });
    changeSizeButton.addEventListener("click", function() { init_canvas(get_new_size()); } );    
}

function change_background(grid, color) {
    grid.style.background = color; 
}

function get_new_size() {
    return prompt("Enter number of columns (less than or equal to 100)", 16);
}