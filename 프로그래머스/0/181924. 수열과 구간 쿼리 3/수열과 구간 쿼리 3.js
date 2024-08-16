function solution(arr, queries) {
    var answer = [
    ];
    
    queries.forEach((item)=>{
       
        const [i,j] = item;
        const temp = arr[i];
        arr[i] = arr[j]
        arr[j] = temp
    })
                    
    answer = arr
    return answer; 
        
}