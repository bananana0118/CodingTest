n = int(input());

space = " ";
star = "*"

spaces = 1;
count = 1; 

for i in range (n, 0, -1):
    if(count == 1 ):
        print(space * (i-1) + star);
    elif(count == n):
        print(star*(2*n -1));
    else:
        print(space * (i -1 ) + star  + (space * spaces) + star );
        spaces +=2;
    count= count+1;
