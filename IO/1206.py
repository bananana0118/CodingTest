N, M, start = list(map(int,input().split()));

graph = [[]*N for _ in range(N+1)];

for _ in range(M) :
    a,b = map(int , input().split());
    graph[a].append(b);
    graph[b].append(a);

def bfs(graph, start):
    visit=list()
    queue=list()
    queue.append(start);

    while queue:
        node = queue.pop(0);
        if node not in visit:
            visit.append(node);
            sorted = graph[node];
            sorted.sort();
            queue.extend(graph[node]);

    return visit;
    

def dfs(graph,start):
    visit=list()
    stack=list()
    stack.append(start);

    while stack :
        node = stack.pop();
        if node not in visit:
            visit.append(node);
            sorted = graph[node];
            sorted.sort(reverse=True); #stack이니까 내림차순으로 정렬해주기
            stack.extend(sorted);
    return visit;

b = bfs(graph, start);
d = dfs(graph,start);
print(*d);
print(*b);
