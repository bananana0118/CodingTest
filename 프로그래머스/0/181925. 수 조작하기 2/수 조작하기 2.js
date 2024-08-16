function solution(numLog) {
    var answer = '';
    let count = 0 ;
    while(count <numLog.length-1){
        let start = numLog[count]
        let next =  numLog[count +1]

        switch (next-start){
            case 1 :
                answer +="w"
              break;
            case -1 :
                answer +="s"
                break;
            case 10 :
                answer +="d"
                break;
            case -10 :
                answer +="a"
                break;
        
        }
    count+=1
        
    }
    return answer;
}