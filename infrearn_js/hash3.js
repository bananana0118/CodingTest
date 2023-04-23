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
  const ana = {};

  let count = 0;
  for (const s of str2) {
    ana[s] = (ana[s] ?? 0) + 1;
  }

  const ana2 = {};
  //부분문자열 돌면서
  for (let i = 0; i < T; i++) {
    ana2[str1[i]] = (ana2[str1[i]] ?? 0) + 1;
    if (isAnagram(ana, ana2)) count++;
  }
  for (let i = T; i < str1.length; i++) {
    ana[str1[i]] = (ana[str1[i]] ?? 0) + 1;
    const key = str1[i - T];
    ana[key] -= 1;
    if (ana[key] === 0) delete ana[key];

    if (isAnagram(ana, ana2)) count++;
  }

  console.log(count);
}

const isAnagram = (ana1, ana2) => {
  for (const [key, value] of Object.entries(ana1)) {
    if (ana1[key] !== ana2[key] || ana2[key] === undefined) return false;
  }
  return true;
};

solution();
