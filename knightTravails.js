import Node from "./node.js";

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

const isInside = (x, y) => {
    if ( x >= 1 && x <= 8 && y >= 1 && y <= 8){
        return true;
    }
    return false; 
}

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

function getPathString(path){
    return path.map(node => `[${node[0]}, ${node[1]}]`).join(" --> ");
}

function printShortestPath(startArray, endArray) {
    const result = getShortestPath(startArray, endArray);

    if (result.distTraveled !== null) {
        console.log(`Path: [${startArray}] --> ${getPathString(result.distTraveled)}`)
        console.log(`Total steps: ${result.steps}`);
    } else {
        console.log("No valid path found.");
    }
}

export { printShortestPath };