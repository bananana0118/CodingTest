#실버3 계단오르기
#최댓값 구하는 프로그램
#조건 1. 한번에 한계단 또는 두계단 한번에 오르기 가능
import sys

n = int(sys.stdin.readline());
stairs = [0]*301;

for i in range(n):
    stairs[i] = int(sys.stdin.readline());

step = [0]*(301);

step[0]= stairs[0];
step[1]= stairs[1] + step[0];
step[2]= max(stairs[1] + stairs[2], stairs[0]+stairs[2]);

for i in range(3,n):
    maxx = max(step[i-2]+stairs[i], stairs[i]+stairs[i-1]+step[i-3]);
    step[i] = maxx;


print(step[n-1]);

