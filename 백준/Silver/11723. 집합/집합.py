#BOJ_11723
#입력받기
import sys;

n = int(sys.stdin.readline());

s = set()
l =[]
for i in range(n):
    l = list(sys.stdin.readline().split());

    if len(l) ==2 :
        l[1] = int(l[1]);

    if l[0] == "add" :
        s.add(l[1]);
    
    elif l[0] == "remove":
        if l[1] in s :
            s.discard(l[1]);
    
    elif l[0] == "check":
        if l[1] in s :
            print(1);
        else : print(0);
    elif l[0] == "toggle" :
        if l[1] in s : 
            s.discard(l[1]);
        else : 
            s.add(l[1]);
    elif l[0] == "all":
        s = set(range(1,21));
    elif l[0] == "empty":
        s = set();


