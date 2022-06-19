

n = int(input());
result = 0;

def oxQuiz(s) :
    global result;
    value=0;
    result=0;
    for i in range(len(s))  :
        if (s[i] == "O") : 
            if(i != 0 and s[i-1] != "X"):       
                value += 1;
            else :
                value= 1 ;
            result += value;
        elif (s[i] == "X") :
            value = 0;

    return result;

for i in range(n):
    s = input();
    result = oxQuiz(s);
    print(result);
