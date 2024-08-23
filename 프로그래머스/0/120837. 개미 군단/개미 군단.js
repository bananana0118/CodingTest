function solution(hp) {
    var answer = 0;
    const power = [5, 3, 1]
    answer += Math.floor(hp/power[0])
    
    let divide = hp%power[0]
    
    if(divide>=power[1]){
        answer += Math.floor(divide/power[1])
        divide = divide%power[1]
    }
    answer += divide
    
    
    return answer;
}