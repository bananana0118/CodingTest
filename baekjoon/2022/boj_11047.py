##입력받기
##boj_11047
##알고리즘 - 그리디
##아이디어 : 큰수부터 값을 빼되, 나눠지면 나눈다. 빼기는 나누기보다 오래걸리니 사용하지 않는걸로
import sys

n, k = map(int,input().split())
coins = []
result = 0


coins = list(map(int,sys.stdin.read().splitlines()))

for i in range(len(coins)-1, -1, -1) :
    if k >= coins[i] :
        result += k // coins[i]      # 코인의 개수
        k = k %coins[i]             # 남은 금액

print(result)