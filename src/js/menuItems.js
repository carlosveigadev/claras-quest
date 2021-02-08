const menuItems = (item) => {
  if (item.text === 'Start') {
    return 'WorldScene';
  } if (item.text === 'How to Play') {
    return 'Tutorial';
  } if (item.text === 'Sounds') {
    return 'Sounds';
  } if (item.text === 'Credits') {
    return 'Credits';
  } if (item.text === 'Scores') {
    return 'Scores';
  }
  return false;
};

export default menuItems;