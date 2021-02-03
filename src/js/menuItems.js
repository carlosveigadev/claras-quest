import Phaser from 'phaser';
import { getScores } from './scores';

const menuItems = (item, scene, sound) => {
  if (item.text === 'Start') {
    scene.scene.start('WorldScene');
  } else if (item.text === 'How to Play') {
    console.log('How to Play');
  } else if (item.text === 'Sounds') {
    sound.setMute(true);
  } else if (item.text === 'Credits') {
    console.log('credits');
  } else if (item.text === 'Scores') {
    getScores();
  }
};

export default menuItems;