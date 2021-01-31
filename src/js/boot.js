class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    this.logo = {
      image: this.add.image(400, 300, 'logo'),
      init(scene) {
        this.image.displayHeight = 600;
        this.image.displayWidth = 800;
        scene.cameras.main.fadeIn(2000);
      },
    };

    this.button = {
      x: null,
      y: null,
      width: null,
      height: null,
      box: null,
      text: null,
      init(x, y, message, scene, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.box = scene.add.graphics();
        this.box.fillRoundedRect(this.x, this.y, this.width, this.height, 10);
        this.box.fillStyle(0x5946B2);
        this.text = scene.make.text({
          text: message,
          style: {
            font: '25px monospace',
            fill: '#fff',
          },
        });
        this.text.setPosition(this.x + (this.x / 10), this.y + 10, 0);
      },
    };


    this.logo.init(this);
    this.button.init(325, 200, 'Start', this, 150, 50);
    this.button.init(290, 200 + 75, 'How to Play', this, 225, 50);
    this.button.init(325, 200 + 150, 'Sound', this, 150, 50);
    this.button.init(315, 200 + 225, 'Credits', this, 170, 50);
    this.button.init(325, 200 + 300, 'Scores', this, 150, 50);
  }
}

export default BootScene;