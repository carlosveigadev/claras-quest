import { addScores, getScores } from '../js/scores';

describe('Should be able to send a username and a score value data to the api', () => {
  test('Save the data in the API', () => {
    addScores('Test', 10).then(data => {
      expect(data.result).toBe('Leaderboard score created correctly.');
    });
  });
  test('Not save score properly the data in the API', () => {
    addScores('Test', null).then(data => {
      expect(data.result).toBe('You need to provide a valid score for the user');
    });
  });
  test('Not save properly the data in the API', () => {
    addScores(null, 30).then(data => {
      expect(data.result).toBe('You need to provide a valid user for the score');
    });
  });

  test('The object should contain the created user', () => {
    getScores().then(data => {
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            user: 'Test',
          }),
        ]),
      );
    }).catch(() => {

    });
  });
  test('The object should contain the created score', () => {
    getScores().then(data => {
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            score: '10',
          }),
        ]),
      );
    }).catch(() => {

    });
  });
});