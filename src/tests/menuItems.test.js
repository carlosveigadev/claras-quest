import Phaser from 'phaser';
import menuItems from '../js/menuItems';

describe('Test menu select items.', () => {
  const mockItems = {
    item: {
      itemStart: 'Start',
      itemHowToPlay: 'How to Play',
      itemSounds: 'Sounds',
      itemCredits: 'Credits',
      itemScores: 'Scores',
    },
    scene: { start() { return 'test'; } },
    sound: { setMute() { return 'test'; } },
  };
  test('Menu select must be a function', () => {
    expect(typeof menuItems).toBe('function');
  });

  test('When "Start" is passed to menuItems it should return a function', () => {
    expect(menuItems('Start', mockItems, mockItems)).toBe('function');
  });
});
