const addScores = (username, points) => {
  const data = {
    user: username,
    score: points,
  };
  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/umvG0P0lK5DAo5FlE9Ry/scores', {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
    .then(json => console.log(json));
};

const getScores = () => {
  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/umvG0P0lK5DAo5FlE9Ry/scores', { mode: 'cors' })
    .then((response) => response.json())
    .then((response) => {
      response.result.forEach(element => {
        const scores = document.createElement('div');
        scores.classList = 'scores';
        const h1 = document.createElement('h1');
        const p = document.createElement('p');
        h1.innerHTML = element.user;
        p.innerHTML = element.score;
        document.body.appendChild(scores);
        h1.style.fontSize = 'small';
        p.style.color = 'red';
        scores.appendChild(h1);
        h1.appendChild(p);
      });
    });
};

export { addScores, getScores };

// {"result":"Game with ID: umvG0P0lK5DAo5FlE9Ry added."}