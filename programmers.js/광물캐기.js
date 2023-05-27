const tired = { dia: [1, 1, 1], iron: [5, 1, 1], stone: [25, 5, 1] };

function solution(picks, minerals) {
  const label = ['dia', 'iron', 'stone'];
  let newPicks = picks.map(el => [el, 'dia']);
  const mineralSet = [];
  const allPicks = picks.reduce((acc, cur) => acc + cur, 0);
  for (let i = 0; i < allPicks * 5; i += 5) {
    mineralSet.push(minerals.slice(i, i + 5));
  }
  const scores = new Array(mineralSet.length).fill(0);

  for (let i = 0; i < mineralSet.length; i++) {
    const mine = mineralSet[i];

    //돌기준으로 가중치 세우기
    for (let j = 0; j < mine.length; j++) {
      if (mine[j] === 'diamond') scores[i] += 25;
      else if (mine[j] === 'iron') scores[i] += 5;
      else scores[i] += 1;
    }
    mineralSet[i].push(scores[i]);
  }
  const newSort = mineralSet.sort((a, b) => b[b.length - 1] - a[a.length - 1]);
  let idx = 0;
  let answer = 0;

  for (let i = 0; i < 3; i++) {
    //곡괭이 교체
    let count = picks[i];
    let p = label[i];
    while (count > 0 && mineralSet.length > 0) {
      const mine = mineralSet.shift();
      for (let k = 0; k < mine.length - 1; k++) {
        //값넣기
        if (mine[k] === 'diamond') answer += tired[p][0];
        else if (mine[k] === 'iron') answer += tired[p][1];
        else answer += tired[p][2];
      }
      count--;
    }
  }

  return answer;
}
