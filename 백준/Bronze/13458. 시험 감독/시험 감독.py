# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import sys
import math

def print_hi():
    n = int(sys.stdin.readline())
    a = list(map(int, sys.stdin.readline().split()))
    b, c = map(int, sys.stdin.readline().split())

    ##1. 시험장의 개수
    ##2. 각 시험장에 있는 응시자의 수
    ##3. b:총감독관이 감독할 수있는 응시자수 d, 부감독관이 감독할 수 있는 응시자 수
    ##큰감독관 기준으로 정렬
    count = 0
    ## b>c
    for i in range(n) :
        current = a[i]
        current -= b
        count+=1
        if current > 0 :
            val = math.ceil(current / c)
            count += val

    ## b<c
    ## b=b
    print(count)
# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    print_hi()

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
