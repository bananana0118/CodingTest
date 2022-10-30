def solution(participant, completion):
    answer = ''
    dic = {}
    for x in participant:
        dic[x] = dic.get(x,0)+1
    for x in completion :
        dic[x] -= 1
        
        
    answer = [k for k, v in dic.items() if v > 0]
    return answer[0]
