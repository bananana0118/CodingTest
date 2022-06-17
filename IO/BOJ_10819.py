N = int(input()) #노드의 개수
M = int(input())#간선의 개수

visited=[]
need_visited = []

graph = [[]*N for _ in range(N+1)]

for _ in range(M):
    a ,b = map(int , input().split())
    graph[a].append(b);
    graph[b].append(a);


cnt = 0
visited = [0]*(N+1)
def dfs (var):
    global cnt
    visited[var] = 1;
    for i in graph[var]:
        if( visited[i] == 0):
            visited[i] =1;
            cnt+=1;
            dfs(i);

dfs(1);
print(cnt);


