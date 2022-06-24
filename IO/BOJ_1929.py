# 소수구하기
#에라토스테네스의 체 정도는 안보고 구현할 수 있게 되었다.
#이제 에토체 리스트를 안보고 구현할 수 있도록 노력하자.
import sys
import math
mini, maxy = map(int,(sys.stdin.readline().split()));

def isPrime(n):
    num = int(math.sqrt(n));
    if n < 2:
        return False;
        
    for i in range(2,num+1):
        if( n% i == 0):
            return False;
    return True;


for i in range(mini, maxy+1):
    print(i) if( isPrime(i) ) else ""; 
    
