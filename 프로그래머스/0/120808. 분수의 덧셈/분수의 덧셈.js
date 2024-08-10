const gcd=(a,b) => {
    while(b!==0){
        const value = a%b
        a = b;
        b = value
    }
    return a
}

function solution(numer1, denom1, numer2, denom2) {
    let lcm = denom1 * denom2 / gcd(denom1,denom2);
    
    const newBunja1 = numer1 * (lcm/denom1)
    const newBunja2 = numer2 * (lcm/denom2)
    
    const totalBunja = newBunja1 + newBunja2
    
    const finalGcd = gcd(totalBunja,lcm)
    
  const answer = [totalBunja/finalGcd, lcm/finalGcd]
    return answer;
}