let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '\\example.txt')
  .toString()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');
let index = 0;
function solution() {
  const str1 = input[index++].split('');
  const str2 = input[index++].split('');
  const T = str2.length;
  const target = new Map();
  const candidates = new Map();
  let count = 0;

  for (const s of str2) {
    if (target.has(s)) target.set(s, target.get(s) + 1);
    else target.set(s, 1);
  }

  //부분문자열 돌면서
  for (let i = 0; i < T; i++) {
    if (candidates.has(str1[i]))
      candidates.set(str1[i], candidates.get(str1[i]) + 1);
    else candidates.set(str1[i], 1);
    //일치하는지 확인
    if (isAnagram(candidates, target)) count++;
  }
  for (let i = T; i < str1.length; i++) {
    //슬라이딩윈도우
    const key = str1[i - T];
    candidates.set(key, candidates.get(key) - 1);

    if (candidates.get(key) === 0) candidates.delete(key);

    if (candidates.has(str1[i]))
      candidates.set(str1[i], candidates.get(str1[i]) + 1);
    else candidates.set(str1[i], 1);

    //일치하는지 확인
    if (isAnagram(candidates, target)) count++;
  }

  console.log(count);
}

const isAnagram = (candidates, target) => {
  if (candidates.size !== target.size) return false;
  for (const [key, value] of target) {
    if (target.get(key) !== candidates.get(key) || !candidates.has(key))
      return false;
  }
  return true;
};

solution();
