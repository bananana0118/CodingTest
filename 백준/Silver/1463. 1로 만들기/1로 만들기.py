import sys
from collections import deque

x = int(input())
count = 0

q = deque()
q.append((x,0))
visited = set([x]) ## 방문한 곳 다시 안방문하게


while q :
    x, step = q.popleft()
    if x == 1 :
        print(step)

    nx = x-1
    if nx not in visited and x >= 1 :
        visited.add(nx)
        q.append((nx,step+1))

    if x %2==0:
        nx = x//2
        if nx not in visited:
            visited.add(nx)
            q.append((nx,step+1))
    if x % 3 == 0:
        nx = x // 3
        if nx not in visited:
            visited.add(nx)
            q.append((nx, step + 1))

