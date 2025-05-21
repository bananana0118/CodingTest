N = int(input())
nums = []
for i in range(N):
    nums.append(int(input()))
dp = [0] * (N + 1)

dp[1] = nums[0]
if N >= 2:
    dp[2] = dp[1] + nums[1]

for i in range(3, N + 1):
    dp[i] = max(dp[i - 1], dp[i - 2] + nums[i-1], dp[i - 3] + nums[i - 2] + nums[i-1])

print(dp[N])