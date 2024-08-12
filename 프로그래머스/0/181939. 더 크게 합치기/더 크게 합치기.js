function solution(a, b) {
    const ab = `${a}${b}`
    const ba = `${b}${a}`
    
    
    var answer = Number(ab) >= Number(ba) ? Number(ab) : Number(ba);
    return answer;
}