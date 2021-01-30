import Phaser from 'phaser';
import Preload from './js/preload';

class MyGame extends Phaser.Scene {
  constructor() {
    super('MyGame');
  }
}

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
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: Preload,
};


const game = new Phaser.Game(config);
game();