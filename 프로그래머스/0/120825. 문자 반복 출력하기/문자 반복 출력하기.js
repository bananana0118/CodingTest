function solution(my_string, n) {
    var answer = '';
    [...my_string].forEach((spell)=>{
        answer+=spell.repeat(n)
    })
    return answer;
}