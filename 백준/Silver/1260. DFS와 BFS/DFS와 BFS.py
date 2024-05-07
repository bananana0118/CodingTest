from collections import deque

bfs_list = []
dfs_list = []
def DFS(graph,start,V):
    visited=[0]*(V+1)

    stack=[start] #pop

    #expand
    while stack:
        v = stack.pop();
        if not visited[v]:
            visited[v] = 1
            dfs_list.append(v);
            for i in sorted(graph[v], reverse=True):
                if(i!=0):
                    stack.append(i)

def BFS(graph,start,V):
    visited = [0]*(V+1)
    queue = deque()

    queue.append(start)
    visited[start] = 1
    while queue:
        v = queue.popleft()
        bfs_list.append(v)
        for i in sorted(graph[v]):
            if not visited[i] and i != 0:
                queue.append(i)
                visited[i] = 1

import sys

V,E,start = map(int, sys.stdin.readline().split())


adj = [[] for i in range(V+1)];

for i in range(1,E+1) :
    s, e = map(int, sys.stdin.readline().split());
    adj[s].append(e)
    adj[e].append(s)



DFS(adj,start,V)
BFS(adj,start,V)
print(*dfs_list)
print(*bfs_list)


