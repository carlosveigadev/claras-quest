import { addScores, logScores } from './scores';

function gameOver(score) {
  const inputBox = document.getElementById('utext');
  inputBox.addEventListener('keyup', (e) => {
    const username = inputBox.value;
    if (e.key === 'Enter' && username !== '') {
      addScores(username, score);
      logScores();
      inputBox.style.display = 'none';
    }
  });
  inputBox.style.display = 'inline';
}

export default gameOver;
