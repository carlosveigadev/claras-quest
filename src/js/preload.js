import Phaser from 'phaser';

class Preload extends Phaser.Scene {
  preload() {
    this.load.image('logo', 'src/assets/logo.png');
    this.load.spritesheet('dinoBoss', 'src/assets/sprites/boss_dino.png', {
      frameWidth: 63.66,
      frameHeight: 60,
    });
    this.load.spritesheet('dino', 'src/assets/sprites/dinos.png', {
      frameWidth: 36,
      frameHeight: 35,
    });
    this.load.spritesheet('eggs', 'src/assets/sprites/eggs.png', {
      frameWidth: 68,
      frameHeight: 70,
    });
    this.load.spritesheet('girl', 'src/assets/sprites/girl.png', {
      // frameWidth: 68,
      // frameHeight: 70,
    });
    this.load.spritesheet('girlBow', 'src/assets/sprites/girl_with_bow.png', {
      // frameWidth: 68,
      // frameHeight: 70,
    });
    this.load.spritesheet('girlSword', 'src/assets/sprites/girl_with_sword.png', {
      // frameWidth: 68,
      // frameHeight: 70,
    });
    this.load.spritesheet('girlWand', 'src/assets/sprites/girl_with_wand.png', {
      // frameWidth: 68,
      // frameHeight: 70,
    });
  }

  create() {
    const logo = this.add.image(400, 300, 'logo');
    logo.displayHeight = 600;
    logo.displayWidth = 800;

    // this.dinoBoss = this.add.sprite(400, 300, 'eggs');
    // this.anims.create({
    //   key: 'eggs',
    //   frames: this.anims.generateFrameNumbers('eggs'),
    //   frameRate: 1,
    //   repeat: -1,
    // });
    // this.dinoBoss.play('eggs');
  }
}

export default Preload;