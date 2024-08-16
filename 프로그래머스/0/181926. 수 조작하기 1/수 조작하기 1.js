function solution(n, control) {
    var answer = 0;
    let count = 0 
    while(count < control.length){
        switch (control[count]){
            case "w":
                n +=1
                break;
            case "a":
                n-=10;
                break;
            case "s":
                n-=1;
                break;
            case "d":
                n+=10;
                break;
        }
        count+=1   
    }
    return n;
}