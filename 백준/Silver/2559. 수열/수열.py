N, K = map(int,input().split())
nums = list(map(int,input().split()))

w = [0]*(N-K+1)
s = sum(nums[0:K])
w[0] = s
for i in range(1, N-K+1,1):
    s+= nums[i+K-1]
    s-= nums[i-1]
    w[i] = s

print(max(w))
