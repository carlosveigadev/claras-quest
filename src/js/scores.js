const addScores = (username, points) => {
  const data = {
    user: username,
    score: `${points}`,
  };
  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/umvG0P0lK5DAo5FlE9Ry/scores', {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json());
};

const getScores = () => {
  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/umvG0P0lK5DAo5FlE9Ry/scores', { mode: 'cors' })
    .then((response) => response.json())
    .then((response) => {
      const holder = document.createElement('div');
      holder.style.position = 'absolute';
      holder.style.width = '100%';
      holder.style.height = '100%';
      holder.style.backgroundColor = 'red';
      holder.style.top = '0';
      const scores = document.createElement('div');
      scores.style.width = '400px';
      scores.style.border = '1px solid green';
      scores.classList = 'scores';
      scores.style.position = 'relative';
      scores.style.left = '35%';
      response.result.sort((a, b) => b.score - a.score);
      for (let index = 0; index < 10; index += 1) {
        const element = response.result[index];
        const h1 = document.createElement('h1');
        const p = document.createElement('p');
        h1.innerHTML = element.user;
        p.innerHTML = element.score;
        h1.style.fontSize = 'small';
        p.style.color = 'blue';
        scores.appendChild(h1);
        h1.appendChild(p);
      }
      document.body.append(holder);
      holder.append(scores);
    });
};

export { addScores, getScores };

// {"result":"Game with ID: umvG0P0lK5DAo5FlE9Ry added."}