import WorldScene from '../js/world';

require('jest-canvas-mock');

jest.mock('../js/world');

beforeEach(() => {
  WorldScene.mockClear();
});

test('expects addScores to be a function', () => {
});