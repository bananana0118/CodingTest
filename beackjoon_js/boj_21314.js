const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

let mkn = input[0].split('');

const solution = () => {
  findMaxNum(mkn);
  findMinNum(mkn);
};
solution();
function findMaxNum(mkn) {
  let start = 0;
  let end = 0;
  let numM = 0;
  let result = '';
  while (start < mkn.length && end < mkn.length) {
    if (mkn[end] === 'M') {
      while (end < mkn.length) {
        if (mkn[end] === 'K') {
          //M()K일때
          end += 1;
          start = end;
          result += '5';

          result += '0'.repeat(numM);

          numM = 0;
          break;
        } else {
          numM += 1;
          end += 1;
        }
      }
      if (numM !== 0) {
        result += '1'.repeat(numM);
        numM = 0;
      }
    } else if (mkn[end] === 'K') {
      end += 1;
      start = end;
      result += '5';
    }
  }
  if (numM > 0) result += '1';
  if (numM - 1 > 0) result += '0'.repeat(numM - 1);
  console.log(result);
}

function findMinNum(mkn) {
  let end = 0;
  let numM = 0;
  let result = '';
  while (end < mkn.length) {
    if (mkn[end] === 'M') {
      numM += 1;
    } else if (mkn[end] === 'K') {
      if (numM > 0) {
        result += '1';
        if (numM - 1 > 0) result += '0'.repeat(numM - 1);
        numM = 0;
      }
      result += '5';
    }
    end += 1;
  }
  if (numM > 0) result += '1';
  if (numM - 1 > 0) result += '0'.repeat(numM - 1);
  console.log(result);
}
