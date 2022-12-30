import sys
N = int(sys.stdin.readline())
arr = list(map(int,(sys.stdin.readline().split())))
arr_set = sorted(list(set(arr)))

#binary search를 사용했지만 딕셔너리도 가능
def binary_search(target,data):
    start = 0 
    end = len(data)-1
    while start<= end:
        mid = (start+end) // 2

        if data[mid] == target :
            return mid
        elif data[mid] < target:
            start = mid +1
        else :
            end = mid -1

for i in range(N):
    idx = binary_search(arr[i],arr_set)
    print(idx,end=" ")
