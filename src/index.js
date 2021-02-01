import Phaser from 'phaser';
import Preload from './js/preload';
import BootScene from './js/boot';
import WorldScene from './js/world';

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
  scene: [Preload, BootScene, WorldScene],
};

const game = new Phaser.Game(config);
game();