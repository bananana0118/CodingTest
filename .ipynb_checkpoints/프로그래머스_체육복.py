def solution(n, lost, reserve):
    dic1 = {}
    
    for x in range(1,n+1 ):
        dic1[x] = dic1.get(x,1)

    for x in lost : 
        dic1[x] = dic1.get(x , 0) -2


    for x in reserve:
        dic1[x] = dic1.get(x,0) +1
    
    for x in range (1,n+1) :
        if (dic1[x] <0 ):
            if (x > 1 and x < n):
                if (dic1[x-1] > 1 ):
                    dic1[x] = 1
                    dic1[x-1] -= 1
                elif (dic1[x+1] > 1):
                    dic1[x] =  1
                    dic1[x+1] -= 1
            elif (x == 1):    
                if (dic1[x+1] > 1):
                    dic1[x] =  1
                    dic1[x+1] -= 1
            elif (x==n) :
                if(dic1[x-1] > 1):
                    dic1[x] =  1
                    dic1[x-1] -= 1

            
    count = [k for k ,v in dic1.items() if v >= 0]

    return len(count)
