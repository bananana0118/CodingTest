from collections import deque


def DFS(graph, v, visited):
    visited[v] = True
    dfs_list.append(v)
    for i in sorted(graph[v]):
        if not visited[i]:
            DFS(graph, i, visited)


def BFS(graph, start, visited):
    queue = deque([start])

    visited[start] = True

    ##큐가 빌 떄까지 반복
    while queue:
        v = queue.popleft()
        bfs_list.append(v)
        ##해당원소와 연결된, 아직 방문안한 원소들을 큐에 넣는다.
        for i in sorted(graph[v]):
            if not visited[i]:
                queue.append(i)
                visited[i] = True


import sys

N, M, start = map(int, sys.stdin.readline().split())
graph = [[] for _ in range(N + 1)]
for _ in range(M):
    a, b = map(int, sys.stdin.readline().split())
    graph[a].append(b)
    graph[b].append(a)

dfs_list = []
bfs_list = []
visited = [False] * (N + 1)

DFS(graph, start, visited)
visited = [False] * (N + 1)
BFS(graph, start, visited)

print(*dfs_list)
print(*bfs_list)
