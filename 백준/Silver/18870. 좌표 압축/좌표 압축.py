
N = int(input())
nums = list(map(int,input().split()))
## 정렬한 후 개수대로 다시 정렬
## map 자료구조 쓰면 될 것 같은데

myMap = {}

copy = sorted(nums)
index = 0
for idx in range(len(nums)) :
    value = copy[idx]
    if not value in myMap :
        myMap[value] = index
        index +=1

result = []
for i in range(len(nums)):
    index = myMap[nums[i]]
    result.append(f'{index}')

ans = " ".join(result)

print(ans)