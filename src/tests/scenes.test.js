import BootScene from '../js/boot';
import GameOver from '../js/gameOver';
import menuItems from '../js/menuItems';
import Tutorial from '../js/tutorial';
import WorldScene from '../js/world';
import Credits from '../js/credits';

describe('Test phaser object scenes.', () => {
  test('All scenes must be functions', () => {
    expect(typeof BootScene).toBe('function');
    expect(typeof Credits).toBe('function');
    expect(typeof GameOver).toBe('function');
    expect(typeof menuItems).toBe('function');
    expect(typeof Tutorial).toBe('function');
    expect(typeof WorldScene).toBe('function');
  });
});