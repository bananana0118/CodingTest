#!/usr/bin/env python
# coding: utf-8

# In[37]:


#프로그래머스 LV1 체육복
#탐욕법, 그리디 알고리즘 사용
#그리디 알고리즘 : 순간순간의 최적의 판단을 함, 정렬기법과 함께 사용
#다음부턴 람다식과 리스트 내포를 사용해서 해보자. 
#현재 내가 짠 코드는 O(n**3)
n = 6
lost = [2,4,5,6]
reserve = [1, 3, 5]



def solution(n, lost, reserve):
    
        #lost == reserve인 값은 배열에서 제외시킴
        match = set(lost) & set(reserve)
        lost = list(set(lost) - match)
        reserve = list(set(reserve) - match)
 
    
        #lost 배열의 -1값, +1값이 reserve에 존재하는지 검사
        for num in lost :
            if num-1 in reserve :
                reserve.remove(num-1)
                
            elif num+1 in reserve :
                reserve.remove(num+1)
                
            else:
                n = n- 1
                
            answer = n
        
        return answer

a = solution(n,lost,reserve)

print(a)


# In[46]:

#O(n)인 사람의 코드
#못푸는 경우가 있는데 , 하나씩 비교를 한다면 해결됨

def solution(n, lost, reserve):

    reserve = set(reserve)
    cnt = 0
    for size in [0, 1, -2]:
        print("cnt:",cnt)
        cnt = cnt+1
        print(lost)
        print(reserve)
        lost = set(map(lambda x : x+size, lost))
        reserve, lost = reserve - lost, lost - reserve
        print()
        print()

    return n - len(lost)


aa = solution(n,lost,reserve)
print(aa)


# In[47]:


l1 = [1,2,3,4,5]
l2 = [3,4,5,6]

a = set(l1)-set(l2)
print(a)


# In[53]:
#리스트 내포 연

result = [x*y for x in range(2,10) if x%2 == 0
          for y in range(1,10)]

for i in result :
    print(i, end= " ")

