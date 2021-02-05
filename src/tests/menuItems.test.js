import menuItems from '../js/menuItems';

describe('Test menu select items.', () => {
  const mockItems = {
    itemStart: { text: 'Start' },
    itemTuto: { text: 'How to Play' },
    itemSounds: { text: 'Sounds' },
    itemCredits: { text: 'Credits' },
    itemScores: { text: 'Scores' },
    itemOther: { text: 'Other' },
  };
  test('Menu select must be a function', () => {
    expect(typeof menuItems).toBe('function');
  });

  test('When "Start" is passed to menuItems it should return a string', () => {
    expect(menuItems(mockItems.itemStart)).toBe('WorldScene');
  });

  test('When "Tutorial" is passed to menuItems it should return a string', () => {
    expect(menuItems(mockItems.itemTuto)).toBe('Tutorial');
  });

  test('When "Sounds" is passed to menuItems it should return a string', () => {
    expect(menuItems(mockItems.itemSounds)).toBe('Sounds');
  });

  test('When "Credits" is passed to menuItems it should return a string', () => {
    expect(menuItems(mockItems.itemCredits)).toBe('Credits');
  });

  test('When "Scores" is passed to menuItems it should return a string', () => {
    expect(menuItems(mockItems.itemScores)).toBe('Scores');
  });

  test('When any other type of string is passed to menuItems it should return false', () => {
    expect(menuItems(mockItems.itemOther)).toBe(false);
  });
});
