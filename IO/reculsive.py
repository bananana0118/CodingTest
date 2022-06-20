


str = input();

n = len(str);
visited = [0]*n
right = 0;
left = 0;

result = [""  for i in range(len(str))];

def hello(left,right):
    if left == right:
        return;

    min_spell = min(str[left:right]);
    idx = str[left:right].index(min_spell) + left ;
    
    visited[idx] = 1 ;
    
    for i in range(n):
        if(visited[i] == 1):
            print(str[i], end="");

    print()
    hello(idx+1, right);
    hello(left, idx);

hello(0 , n);
