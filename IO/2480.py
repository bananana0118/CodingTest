a = list(map(int,input().split() ))

if(a[0] == a[1] == a[2]) :
    print(a[0]*1000 + 10000);
elif ( a[0] == a[1] ) :
    print(a[0]*100 +1000);
elif (a[0] == a[2]) : 
    print(a[0]*100 +1000);
elif (a[1] == a[2]) :
    print(a[1]*100 +1000);
else:
    maxNum = max(a);
    print(maxNum*100);
