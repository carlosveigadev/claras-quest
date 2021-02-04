import { logScores } from './scores';

const menuItems = (item, scene, sound) => {
  if (item.text === 'Start') {
    scene.scene.start('WorldScene');
  } else if (item.text === 'How to Play') {
    scene.scene.start('Tutorial');
  } else if (item.text === 'Sounds') {
    sound.setMute(true);
  } else if (item.text === 'Credits') {
    scene.scene.start('Credits');
  } else if (item.text === 'Scores') {
    logScores();
  }
};

export default menuItems;