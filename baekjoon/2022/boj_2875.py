#boj_2875
#아이디어 여학생수를 2로 나눈값으로 남학생수에서 뺀다.

n, m, k = map(int, input().split());
result , remains = 0 ,0


if(n < 2 or m <1):
    print(0)
else : 

    if((n - m * 2) > 0):
        result = m
        remains = n - m *2
    elif((n - m * 2) == 0):
        result = n //2
        remains = 0;
    elif ( n - m * 2 < 0):
        result = n //2
        remains = (n - result*2) + m - result #여학생의 수 + 남학생의 수
    
    k -= remains
    if ( k > 0 and k <=3 ):
        result -= 1
    elif (k>0  and k%3 == 0) :
        result -= (k//3 )
    elif (k > 0 and k %3 >0):
        result -= (k//3 +1)
    
    if (result <= 0):
        print(0)
    else :
        print(result)


