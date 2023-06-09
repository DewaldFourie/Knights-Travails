
export default class Node{
    constructor(row, col, distTraveled){
        this.row = row;
        this.col = col;
        this.distTraveled = distTraveled;
    }

    getPositionString(){
        return `${this.row}, ${this.col}`;
    }
}

