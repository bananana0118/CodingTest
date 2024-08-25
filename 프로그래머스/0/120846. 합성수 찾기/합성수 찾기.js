function solution(n) {
    const docs = {}
    for(let i = 2 ; i <= n ;i++){
        for(let j =1 ; j <= i ;j++){
        if(i%j === 0 ) docs[i] = docs[i]+1 || 1
        }
    }
    const answer = Object.keys(docs).filter((key)=>docs[key] >= 3)
    return answer.length;
}