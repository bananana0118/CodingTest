function solution(a, b, c, d) {
const tree = {}
    var answer = 0;
    
    for(let item of [a, b, c, d]) {
        tree[item] = tree[item] ? tree[item] + 1 : 1;
    }

    const arr = Object.keys(tree).map(Number)
    const values = Object.values(tree)
    if(values.length ===1){
        return 1111*arr[0]
    }else if(values.includes(2)&&arr.length===2){
            return ((arr[0]+arr[1]) * (Math.abs(arr[0]-arr[1])))
    }else if(values.includes(3)){
          const triple = arr[values.indexOf(3)];
        const single = arr.find(key => tree[key] === 1);
        return Math.pow(10 * triple + single, 2);                 
    }
    else if(values.length ===3){
     const count1 = [a,b,c,d].filter((item,idx)=>tree[item]!== 2).map(Number)
        return count1[0]*count1[1]
    }else{
        return Math.min(...arr)
    }
    
}
