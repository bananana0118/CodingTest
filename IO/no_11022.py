
T = int(input());

for i in range(T):
    a = list(map(int, input().split()));
    str = f'Case #{i+1}: {a[0]} + {a[1]} = {a[0]+a[1]}'
    print(str);


##f-string이라고 js의 템플릿 리터럴과 유사함
