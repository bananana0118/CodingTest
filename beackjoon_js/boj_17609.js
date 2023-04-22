let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .trim()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

function solution(input) {
  input.shift();

  function findPalindrome(word, left, right, count) {
    while (left < right) {
      if (word[left] === word[right]) {
        left++;
        right--;
      } else {
        //xabbaxc 같은 경우때문에 좌우로 검사
        if (count === 0) {
          const countLeft = findPalindrome(word, left + 1, right, count + 1);
          const countRight = findPalindrome(word, left, right - 1, count + 1);

          return Math.min(countLeft, countRight);
        } else {
          return 2;
        }
      }
    }

    return count;
  }
  //회문 하나씩 검사
  //결과 인덱스에 저장

  const result = [];
  for (const word of input) {
    const left = 0;
    const right = word.length - 1;

    result.push(findPalindrome(word.split(''), left, right, 0));
  }
  console.log(result.join('\n'));
}

solution(input);
