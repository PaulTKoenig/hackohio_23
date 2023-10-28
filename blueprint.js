class Cell {
    constructor() {
        this.OPEN = 0;
        this.WALL = 1;
        this.DOOR = 2;

        this.top = this.OPEN;
        this.left = this.OPEN;
        this.right = this.OPEN;
        this.bottom = this.OPEN;

        this.enabled = false;
    }
}

class Blueprint {
    constructor() {
        const empty_array = Array(20).fill().map(() => Array(20).fill())
        this.blueprint = empty_array.map(nested => nested.map(element => new Cell()));
    }

    printBlueprint() {
        console.log(this.blueprint);
    }

    displayBlueprint() {
        var blueprint = document.createElement("TABLE");
        blueprint.setAttribute("id", "blueprint");
        blueprint.style.borderCollapse = "collapse";
        document.body.appendChild(blueprint);
        document.body.insertBefore(blueprint, document.body.firstChild);

        for (let i = 0; i < this.blueprint.length; i++) {
            var row = document.createElement("TR");

            for (let j = 0; j < this.blueprint[i].length; j++) {

                var cell = document.createElement("TD");
                cell.setAttribute("id", `cell_${i}_${j}`);
                cell.style.height = "25px";
                cell.style.width = "25px";
                cell.style.border = "1px solid";
                cell.style.borderColor = "black";
                cell.setAttribute('onclick', 
                    `if (event.metaKey) { 
                        blueprint.enableRightBorder(${i},${j})
                    } else if (event.ctrlKey) {
                        blueprint.enableLeftBorder(${i},${j})
                    } else if (event.shiftKey) {
                        blueprint.enableTopBorder(${i},${j})
                    } else if (event.altKey) {
                        blueprint.enableBottomBorder(${i},${j})
                    } else { 
                        blueprint.enableCell(${i},${j}) 
                    };`);
                row.appendChild(cell);
            }
            blueprint.appendChild(row);
        }
    }

    enableTopBorder(i, j) {
        var cell = document.getElementById(`cell_${i}_${j}`);
        if (this.blueprint[i][j].top == 0) {
            cell.style.borderTop = "2px solid";
            this.blueprint[i][j].top = 1
        } else {
            cell.style.borderTop = "0";
            this.blueprint[i][j].top = 0
        }
    }

    enableBottomBorder(i, j) {
        var cell = document.getElementById(`cell_${i}_${j}`);
        if (this.blueprint[i][j].bottom == 0) {
            cell.style.borderBottom = "2px solid";
            this.blueprint[i][j].bottom = 1
        } else {
            cell.style.borderBottom = "0";
            this.blueprint[i][j].bottom = 0
        }
    }

    enableRightBorder(i, j) {
        var cell = document.getElementById(`cell_${i}_${j}`);
        if (this.blueprint[i][j].right == 0) {
            cell.style.borderRight = "2px solid";
            this.blueprint[i][j].right = 1
        } else {
            cell.style.borderRight = "0";
            this.blueprint[i][j].right = 0
        }
    }

    enableLeftBorder(i, j) {
        var cell = document.getElementById(`cell_${i}_${j}`);
        if (this.blueprint[i][j].left == 0) {
            cell.style.borderLeft = "2px solid";
            this.blueprint[i][j].left = 1
        } else {
            cell.style.borderLeft = "0";
            this.blueprint[i][j].left = 0
        }
    }

    enableCell(i, j) {
        var cell = document.getElementById(`cell_${i}_${j}`);

        if (this.blueprint[i][j].enabled == true) {
            cell.style.background = "black";
            this.blueprint[i][j].enabled = false;
        } else {
            cell.style.background = "white";
            this.blueprint[i][j].enabled = true;
        }
    }

    displayBorderMenu(edit_borders_div, border_location, i, j) {

        // Create array of options to be added
        var options = ["Wall", "Opening", "Door"];

        //Create and append select list
        var div = document.createElement("div");
        edit_borders_div.appendChild(div);

        var label = document.createElement("label");
        label.innerHTML = border_location + " Border";

        var selectList = document.createElement("select");
        selectList.id = border_location + "-Border";
        div.appendChild(label);
        div.appendChild(selectList);

        //Create and append the options
        for (var i = 0; i < options.length; i++) {
            var option = document.createElement("option");
            option.value = options[i];
            option.text = options[i];
            selectList.appendChild(option);
        }

        selectList.setAttribute('onChange', `blueprint.updateCell(${i},${j}, ${border_location}); blueprint.displayCellDetails(${i},${j});`);
    }

    updateCell(i, j, border_location) {

        let border_id = 0;

        if (border_location == "Top") {
            this.blueprint[i][j].top = 0;
        } else if (border_location == "Right") {
            this.blueprint[i][j].right = 0;
        } else if (border_location == "Bottom") {
            this.blueprint[i][j].bottom = 0;
        } else if (border_location == "Left") {
            this.blueprint[i][j].left = 0;
        }
    }

    displayCellDetails(i, j) {
        var cell_div = document.getElementById(`square`);
        cell_div.style.display = "block";

        var cell = this.blueprint[i][j];
        console.log(cell.top)


        if (cell.enabled == true) {
            cell_div.style.background = "blue";
        } else {
            cell_div.style.background = "white";
        }

        if (cell.top == 1) {
            cell_div.style.borderTop = "0";
        } else if (cell.top == 2) {
            cell_div.style.borderTop = "4px dotted";
        }

        if (cell.right == 1) {
            cell_div.style.borderRight = "0";
        } else if (cell.right == 2) {
            cell_div.style.borderRight = "4px dotted";
        }

        if (cell.left == 1) {
            cell_div.style.borderLeft = "0";
        } else if (cell.left == 2) {
            cell_div.style.borderLeft = "4px dotted";
        }

        if (cell.bottom == 1) {
            cell_div.style.borderBottom = "0";
        } else if (cell.bottom == 2) {
            cell_div.style.borderBottom = "4px dotted";
        }

        var edit_borders_div = document.getElementById('edit-borders');
        edit_borders_div.innerHTML = "";

        // Create array of options to be added
        var border_locations = ["Top", "Right", "Bottom", "Left"];

        //Create and append the options
        for (var border_location = 0; border_location < border_locations.length; border_location++) {
            this.displayBorderMenu(edit_borders_div, border_locations[border_location], i, j);
        }

        console.log(this.blueprint[i][j]);
    }
}


const blueprint = new Blueprint();
blueprint.displayBlueprint();