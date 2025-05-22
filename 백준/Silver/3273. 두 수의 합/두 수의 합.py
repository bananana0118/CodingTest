N = int(input())
nums = list(map(int, input().split()))
target = int(input())


# def hash_count(nums,target):
#     seen = set()
#     count = 0
#     for a in nums:
#         b = target -a
#         if b in seen :
#             count +=1
#         seen.add(a)
#     return count

def count_two_pointer(nums, target):
    nums.sort()
    i, j = 0, len(nums) - 1
    count = 0
    while i<j :
        s = nums[i] + nums[j]
        if s == target :
            count+=1
            i +=1
            j-=1
        elif s<target :
            i+=1
        else :
            j-=1
    return count

count = count_two_pointer(nums, target)
print(count)
