function solution(number) {
    var answer = Number(number)%9;
    let numbers = [...number]
    let value = 0
    for(let i = 0 ; i < numbers.length ; i++){
        value += Number(numbers[i])
    }
    return value%9;
}