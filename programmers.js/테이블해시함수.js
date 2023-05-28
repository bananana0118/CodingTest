function solution(data, col, row_begin, row_end) {
  var answer = 0;

  //1. 정렬
  const sortedData = data.sort((a, b) => {
    if (a[col - 1] === b[col - 1]) return b[0] - a[0];
    else return a[col - 1] - b[col - 1];
  });
  const S = [];
  for (let i = 0; i < sortedData.length; i++) {
    const v = i + 1;
    const rowValue = sortedData[i].reduce((acc, curr) => {
      return acc + parseInt(curr % v);
    }, 0);
    S.push(rowValue);
  }
  for (let i = row_begin - 1; i <= row_end - 1; i++) {
    answer = answer === 0 ? S[i] : answer ^ S[i];
  }

  return answer;
}
