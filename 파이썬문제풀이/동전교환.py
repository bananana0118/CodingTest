
def DFS(L , cnt ,total) :
    global minAmount
    if (total > amount or cnt > minAmount ): 
        return
    if( total == amount ):
        if (minAmount > cnt) :
            minAmount = cnt
    else : 
        for i in (coins) :
            DFS(L+1 , cnt+1, total + i)


if __name__ =="__main__":
    N = int(input())
    coins = list(map(int,input().split()))
    amount = int(input())
    count = 0
    minAmount = 10000000
    coins.sort(reverse=True)
    #DFS L / count
    DFS(0,count, 0) 

    print(minAmount)
