#sz : = 확인
#c= : c= c- 확인
#dz = d- dz= 확인
#lj - lj
#nj : nj
#s = s=
#z = z=

#그 외의 알파벳은 1개


dict = {
    "c=" :0,
    "c-" : 0,
    "dz=":0,
    "d-" : 0,
    "lj" : 0,
     "nj": 0,
     "s=" :0,
     "z=" :0    }

import sys

alphaList = [100];

#입력받기
str = sys.stdin.readline().rstrip()
keys = dict.keys();

print(str);


#길이만큼 돈 후, 두글자씩 읽는데,
#두글자가 key에 속하면 ++
#dz일때, =이 있으면 +1
# = 이없으면 +2

start = 0;
end = 2;
count = 0;
for i in range(len(str)):
    if(str[start:end] =="") : break;
    if(str[start:end] in keys):
        dict[str[start:end]] +=1;
        count += 1;
        start = end;
        end += 2;
    elif(str[start:end] == "dz"):
        end+=1;
        if(str[start:end] == "dz="):
            dict["dz="] +=1;
            count +=1;
            start = end;
            end +=2;
        else :
            count+=2;
            start = end-1;
            end += 1;
    else : 
        count +=1;
        start += 1;
        end += 1;
print(count);



### 누군가 한줄로 멋진 코드를 짯으나 적지않는다.
