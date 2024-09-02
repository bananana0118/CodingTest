function solution(my_string) {
    const num_index=[1,2,3,4,5,6,7,8,9,0];
    
   const answer =  [...my_string].filter((item,idx)=>num_index.includes(Number(item)))
   const answer2 = answer.sort((a,b)=>a-b).map(Number);
   return answer2
}