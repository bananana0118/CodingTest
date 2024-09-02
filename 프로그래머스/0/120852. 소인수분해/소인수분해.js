function solution(n) {
    var answer = new Set();
    
    if(n%2==0){
        answer.add(2)
        while(n%2==0){
            n /=2
        }
    }
    
    for(let i = 3 ; i <= Math.sqrt(n);i+=2){
        if(n%i==0) {
            answer.add(i)
            while(n%i ===0) n/=i;       
                   }
    }
    
    if(n>2) answer.add(n)
    
    return Array.from(answer);
}