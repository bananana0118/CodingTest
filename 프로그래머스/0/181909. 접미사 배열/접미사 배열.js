function solution(my_string) {
    var answer = [];
    const arr = [...my_string]
    for(let i = 0 ; i <arr.length;i++){
        const slice = arr.slice(i).join("")
        answer.push(slice)
    }
    answer.sort()
    return answer
}