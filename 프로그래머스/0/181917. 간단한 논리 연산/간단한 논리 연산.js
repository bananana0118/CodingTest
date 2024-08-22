function solution(x1, x2, x3, x4) {
    let answer = true;
    
    answer =and(or(x1,x2), or(x3,x4));
    
    return answer;
}

function and(x,y){
    return x && y 
}


function or(x,y){
    return x || y 
}