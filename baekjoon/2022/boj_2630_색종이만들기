T= int(input())

arr = [list(map(int,input().split()))for _ in range(T)]

w_cnt , b_cnt = 0, 0

##N이 블럭의개수
def div_conq(x, y, N):
    global w_cnt, b_cnt
    temp_cnt = 0
    for i in range( x, x + N ):
        for j in range(y , y+N ):
            if arr[i][j] :
                temp_cnt +=1
    if not temp_cnt : ##전부 하얀색이라면
        w_cnt += 1
    elif temp_cnt == N**2 : ##한블럭이 전부 파란색이라면
        b_cnt +=1
    else: ## 애매한 상태라면
        div_conq(x, y, N // 2)
        div_conq(x + N//2, y, N // 2)
        div_conq(x, y + N // 2, N // 2)
        div_conq(x + N//2, y + N // 2, N//2)
        return

div_conq(0, 0, T)

print(w_cnt)
print(b_cnt)
