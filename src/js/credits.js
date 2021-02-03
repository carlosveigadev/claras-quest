import Phaser from 'phaser';

export default class Preload extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.credits = {
      image: this.add.image(400, 300, 'credits'),

      init(scene) {
        this.image.displayHeight = 600;
        this.image.displayWidth = 800;
        scene.cameras.main.fadeIn(2000);
        this.timedEvent = scene.time.delayedCall(6000, () => {
          scene.scene.start('BootScene');
        }, [], this);
      },
    };
    this.credits.init(this);
  }
}