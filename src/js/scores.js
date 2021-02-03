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
      holder.style.backgroundColor = 'rgba(0,0,0, 0.6)';
      holder.style.top = '0';

      const scores = document.createElement('div');
      scores.style.width = '400px';
      scores.style.padding = '1em 1em ';
      scores.style.backgroundColor = 'rgba(255,255,255, 0.8)';
      scores.style.borderRadius = '1em';
      scores.classList = 'scores';
      scores.style.position = 'relative';
      scores.style.left = '35%';
      scores.style.top = '0.5em';

      const closeButton = document.createElement('span');
      closeButton.style.position = 'absolute';
      closeButton.style.top = '10px';
      closeButton.style.right = '10px';
      closeButton.classList.add('delete');
      closeButton.style.cursor = 'pointer';
      closeButton.classList.toggle = 'close';
      closeButton.innerHTML = '&times;';
      closeButton.addEventListener('click', () => {
        holder.remove();
      });

      const topScoresHeader = document.createElement('h2');
      topScoresHeader.textContent = 'Top Scores';
      topScoresHeader.style.marginLeft = '45%';
      topScoresHeader.style.fontSize = '36px';
      topScoresHeader.style.color = 'rgb(89, 70, 178)';
      topScoresHeader.style.textShadow = '2px 2px #000';

      response.result.sort((a, b) => b.score - a.score);
      for (let index = 0; index < 10; index += 1) {
        const element = response.result[index];
        const scoreHolder = document.createElement('div');
        scoreHolder.style.padding = '10px';
        scoreHolder.style.display = 'flex';
        scoreHolder.style.justifyContent = 'center';
        const name = document.createElement('span');
        const score = document.createElement('span');
        name.style.fontWeight = '900';
        name.innerHTML = element.user;
        name.style.paddingRight = '0.5em';
        score.innerHTML = ` with ${element.score} egg points`;

        scoreHolder.append(name, score);
        scores.append(scoreHolder, closeButton);
      }
      document.body.append(holder);
      holder.append(topScoresHeader, scores);
    });
};

export { addScores, getScores };

// {"result":"Game with ID: umvG0P0lK5DAo5FlE9Ry added."}