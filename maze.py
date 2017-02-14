def index(row, col, N):
	return row*N+col

def dispPath(path, N):
	for p in reversed(path):
		print (p/N, p%N)

def DFS(maze, visited, parent, row, col, N):

	visited[row][col] = 1
	
	if col-1 > 0:
		if visited[row][col-1] == 0 and maze[row][col-1] != 'x':
			parent[index(row, col-1, N)] = index(row, col, N)
			DFS(maze, visited, parent, row, col-1, N)
	if col+1 < len(maze[0]):
		if visited[row][col+1] == 0 and maze[row][col+1] != 'x': 
			parent[index(row, col+1, N)] = index(row, col, N)
			DFS(maze, visited, parent, row, col+1, N)
	if row -1 > 0:
		if visited[row-1][col] == 0 and maze[row-1][col] != 'x':
			parent[index(row-1, col, N)] = index(row, col, N)
			DFS(maze, visited, parent, row-1, col, N)
	if row+1 < len(maze):
		if visited[row+1][col] == 0 and maze[row+1][col] != 'x':
			parent[index(row+1, col, N)] = index(row, col, N)
			DFS(maze, visited, parent, row+1, col, N)

	return visited


def main():
	maze = [["", "x", "x", "x"], ["", "", "", ""], ["", "x", "", ""]]
	visited = [[0 for x in range(len(maze[0]))] for y in range(len(maze))] 
	parent = [0]*len(maze)*len(maze[0])
	#print visited
	DFS(maze, visited, parent, 0, 0, len(maze[0]))
	path = []
	if visited[len(maze)-1][len(maze[0])-1] == 1:
		k = len(maze)*len(maze[0])-1
		path.append(k)
		while parent[k]!=0:
			path.append(parent[k])
			k = parent[k]
		path.append(0)
		print path
		dispPath(path, len(maze[0]))
	else:
		print "Path not found"

if __name__ == '__main__':
	main()
