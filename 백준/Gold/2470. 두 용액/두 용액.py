N = int(input())
nums = list(map(int, input().split()))

sorted_nums = sorted(nums)

def solution(nums,N) :
    i, j = 0, N - 1
    min = float("inf")
    answer = []
    while i < j :
        value = nums[i] + nums[j]
        if value == 0:
            return [nums[i] , nums[j]]
        elif abs(0 -value ) < abs(0-min):
            # print(min)
            min = value
            answer = [nums[i] , nums[j]]
        if value < 0 :
            i+=1
        else :
            j-=1

    return answer

print(" ".join(map(str,solution(sorted_nums,N))))