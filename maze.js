function zeros(dimensions) {
    var array = [];
    for (var i = 0; i < dimensions[0]; ++i) {
        array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
    }
    return array;
}

function index(row, col, N){
	return row*N+col;
}

function dispPath(path, N){
	for(var i=path.length-1; i>=0; i--){
		console.log([Math.floor(path[i]/N), path[i]%N]);
	}
}

function DFS(maze, visited, parent, row, col, M, N){
	visited[row][col] = 1;

	if(col-1 > 0){
		if (visited[row][col-1] == 0 && maze[row][col-1] != 'x'){
			parent[index(row, col-1, N)] = index(row, col, N);
			DFS(maze, visited, parent, row, col-1, M, N);
		}
	}

	if(col+1 < N){
		if (visited[row][col+1] == 0 && maze[row][col+1] != 'x'){ 
			parent[index(row, col+1, N)] = index(row, col, N);
			DFS(maze, visited, parent, row, col+1, M, N);
		}
	}

	if (row -1 > 0){
		if (visited[row-1][col] == 0 && maze[row-1][col] != 'x'){
			parent[index(row-1, col, N)] = index(row, col, N);
			DFS(maze, visited, parent, row-1, col, M, N);
		}
	}

	if (row+1 < M){
		if (visited[row+1][col] == 0 && maze[row+1][col] != 'x'){
			parent[index(row+1, col, N)] = index(row, col, N);
			DFS(maze, visited, parent, row+1, col, M, N);
		}
	}
	return [visited, parent];
}

function mazeSolver(maze){
	maze = maze;
	m = maze.length;
	n = maze[0].length;
	visited = zeros([m,n]);
	for(var i=m*n,parent=[];i--;)	parent[i]=0;
	//for (var i = 0; i < m*n; i++)	console.log(parent[i]);

	[visited, parent] = DFS(maze, visited, parent, 0, 0, m, n);
	path = [];
	if (visited[m-1][n-1] == 1){
		var k = m*n-1;
		path.push(k);
		while(parent[k]!=0){
			path.push(parent[k]);
			k = parent[k];
		}
		path.push(0);
		dispPath(path, n);
	}
	else{
		console.log("Path not found");
	}

}

