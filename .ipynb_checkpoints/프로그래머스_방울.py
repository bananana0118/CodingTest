from itertools import accumulate

def solution(bell):    
    coors_start = {}
    coors_end = {}
    
    for i, x in enumerate(accumulate([0] + [-1 if b == 1 else 1 for b in bell])):
        if(x not in coors_start):
            coors_start[x] = i
        coors_end[x] = i
        
    return max(coors_end[x] - coors_start[x] for x in coors_end)
