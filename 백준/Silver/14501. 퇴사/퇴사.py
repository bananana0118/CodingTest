import sys

N = int(sys.stdin.readline())
schedule = [list(map(int, sys.stdin.readline().split())) for i in range(N)]
## 상담기간/ 비용
dp = [0 for i in range(N + 1)]

for i in range(N-1, -1, -1):  ## i번째까지 일했을떄 얻는 최대 수익
    if i + schedule[i][0] > N :
        dp[i] = dp[i+1]
    else :## i일에 상담을 하는것과, 상담을 안하는것중에 큰 값 선택
        dp[i] = max(dp[i+1], schedule[i][1] + dp[i+ schedule[i][0]])

print(dp[0])