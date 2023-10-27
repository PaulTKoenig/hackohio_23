class Cell {
    constructor() {
        this.WALL = 0;
        this.OPEN = 1;
        this.DOOR = 2;

        this.top = this.WALL;
        this.left = this.OPEN;
        this.right = this.OPEN;
        this.bottom = this.DOOR;

        this.enabled = false;
    }
}

class Blueprint {
    constructor() {
        const empty_array = Array(20).fill().map(() => Array(20).fill())
        console.log(empty_array)
        this.blueprint = empty_array.map(nested => nested.map(element => new Cell()));
    }

    printBlueprint() {
        console.log(this.blueprint);
    }

    displayBlueprint() {
        var blueprint = document.createElement("TABLE");
        blueprint.setAttribute("id", "blueprint");
        document.body.appendChild(blueprint);
        document.body.insertBefore(blueprint, document.body.firstChild);

        for (let i = 0; i < this.blueprint.length; i++) {
            var row = document.createElement("TR");

            for (let j = 0; j < this.blueprint[i].length; j++) {

                var cell = document.createElement("TD");
                cell.setAttribute("id", `cell_${i}_${j}`);
                cell.style.border = "2px solid";
                cell.style.height = "25px";
                cell.style.width = "25px";
                cell.setAttribute('onclick', `if(event.ctrlKey) { 
                    blueprint.displayCellDetails(${i},${j});
                   } else { blueprint.enableCell(${i},${j}) };`);
                row.appendChild(cell);
            }
            blueprint.appendChild(row);
        }
    }

    enableCell(i, j) {
        var cell = document.getElementById(`cell_${i}_${j}`);
        
        if (this.blueprint[i][j].enabled == true) {
            cell.style.background = "white";
            this.blueprint[i][j].enabled = false;
        } else {
            cell.style.background = "blue";
            this.blueprint[i][j].enabled = true;
        }
    }

    displayCellDetails(i, j) {
        var cell_div = document.getElementById(`square`);
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

        console.log(this.blueprint[i][j]);
    }

}


const blueprint = new Blueprint();
blueprint.displayBlueprint();