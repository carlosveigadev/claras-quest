class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    const logo = this.add.image(400, 300, 'logo');
    logo.displayHeight = 600;
    logo.displayWidth = 800;
    this.cameras.main.fadeIn(2000);
  }
}

export default BootScene;