function solution(my_string, is_prefix) {
    var answer = 0;
    let prefixes = []
    for(let i = 0 ; i < my_string.length ;i++){
        prefixes.push(my_string.slice(0,i+1))
    }
    
    
    return prefixes.indexOf(is_prefix) !== -1? 1: 0;
}