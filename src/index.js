import 'phaser';
import SimpleScene from './scenes/simple-scene';

const gameConfig = {
  width: 680,
  height: 400,
  scene: SimpleScene,
};

document.addEventListener('DOMContentLoaded', () => {
  const phaserInit = new Phaser.Game(gameConfig);
  phaserInit();
});
