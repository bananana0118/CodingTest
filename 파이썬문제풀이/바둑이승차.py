def DFS(l,total,tsum):
    global maxTotal

    if total + (totalSum - tsum)<maxTotal:
        return
    if total > C :
        return
    if l == n :
        if(total > maxTotal ):
            maxTotal = total
    else :
        DFS(l+1 , total+arr[l], tsum+arr[l])
        DFS(l+1 , total , tsum+arr[l])
        

if __name__ == "__main__" :
    C , n = map(int,input().split())
    arr = [int(input()) for i in range(n) ]
    maxTotal = 0
    totalSum =sum(arr)
    if (sum(arr) ==C):
        print(C)
    else :
        DFS(0 ,0 ,0)
        print(maxTotal)
