

import sys

V = int(sys.stdin.readline())
E = int(sys.stdin.readline())
graph = [[] for i in range(V+1)]

for i in range(1,E+1):
    s, e = map(int, sys.stdin.readline().split())
    graph[s].append(e)
    graph[e].append(s)



def dfs(graph, start, V):
    stack = [start]
    visited = [0]*(V+1)
    visited[start] = 1
    count = 0
    while stack:
        v = stack.pop()
        for i in (graph[v]):
            if not visited[i]:
                stack.append(i);
                count +=1;
                visited[i] = 1

    return count
count = dfs(graph,1,V)
print(count)



