class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    const logo = this.add.image(400, 300, 'logo');
    logo.displayHeight = 600;
    logo.displayWidth = 800;
  }
}

export default BootScene;