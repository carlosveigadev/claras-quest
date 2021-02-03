import Phaser from 'phaser';
import Preload from './js/preload';
import BootScene from './js/boot';
import WorldScene from './js/world';
import Credits from './js/credits';
import Tutorial from './js/tutorial';

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'content',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [
    Preload,
    BootScene,
    WorldScene,
    Credits,
    Tutorial,
  ],
};
const game = new Phaser.Game(config);
game();