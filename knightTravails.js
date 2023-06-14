import Node from "./node.js";

// set of possible movements for the knight
const directions = [
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2]
];

// function to set the boundaries of the board.
const isInside = (x, y) => {
    if ( x >= 1 && x <= 8 && y >= 1 && y <= 8){
        return true;
    }
    return false; 
}

// function to get the neighbor nodes
const getNeighbors = (row, col) => {
    const neighbors = [];

    for (const direction of directions){
        const [rowChange, colChange] = direction;

        const neighborRow = row + rowChange;
        const neighborCol = col + colChange;

        if (isInside(neighborRow, neighborCol)) {
            neighbors.push([neighborRow, neighborCol])
        }
    }
    return neighbors
}

// function to determine he shortest path 
function getShortestPath(start, finish){
    const startRow = start[0];
    const startCol = start[1];
    const endRow = finish[0];
    const endCol = finish[1];

    if (startRow === endRow && startCol === endCol){
        return { distTraveled: [], steps: 0};   // already at target position
    }

    const queue = [];
    const startNode = new Node(startRow, startCol, []);
    queue.push(startNode);

    const visited = new Set();
    
    while (queue.length > 0) {
        // remove node
        // in practice, we should use a real Queue class so that we can dequeue in O(1)
        // instead of O(n) times.
        const currentNode = queue.shift();
        const { row, col, distTraveled } = currentNode;

        // process node
        if (row === endRow && col === endCol){
            return { distTraveled, steps: distTraveled.length };
        }
        
        const currentPosition = currentNode.getPositionString();
        if ( visited.has(currentPosition) ){
            continue;  // skip if already visited.
        }
        visited.add(currentPosition);

        // add neighbors
        for (const neighbor of getNeighbors(row, col)){
            const [neighborRow, neighborCol] = neighbor;
            const neighborPath = [...distTraveled, [neighborRow, neighborCol]]
            const neighborNode = new Node(neighborRow, neighborCol, neighborPath);
            queue.push(neighborNode);
        }
    }

    return {distTraveled: null, steps: - 1}; // no path found
}

// function to create a visual output of the path in string format
function getPathString(path){
    return path.map(node => `[${node[0]}, ${node[1]}]`).join(" --> ");
}

// output function
function printShortestPath(startArray, endArray) {
    const result = getShortestPath(startArray, endArray);

    if (result.steps === 0 && isInside(startArray[0], startArray[1])) {
        console.log(`Path: [${startArray[0]}, ${startArray[1]}] --> [${startArray[0]}, ${startArray[1]}]}`)
        console.log(`Total steps: ${result.steps}`);
    }
    else if (result.distTraveled !== null && isInside(startArray[0], startArray[1])) {
        console.log(`Path: [${startArray[0]}, ${startArray[1]}] --> ${getPathString(result.distTraveled)}`)
        console.log(`Total steps: ${result.steps}`);
    } else {
        console.log("No valid path found. Make sure your values for start and end is between 1 - 8");
    }
}

export { printShortestPath };