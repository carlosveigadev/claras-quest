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
      width: 100,
      height: 50,
      box: null,
      text: null,
      init(x, y, message, scene) {
        this.x = x;
        this.y = y;
        this.box = scene.add.graphics();
        this.box.fillRect(this.x, this.y, this.width, this.height);
        this.box.fillStyle(0x5946B2);
        this.text = scene.make.text({
          text: message,
          style: {
            font: `${this.percentageFontSize}px monospace`,
            fill: '#000000',
          },
        });
      },
    };


    this.logo.init(this);
    this.button.init(300, 400, 'Start', this);
  }
}

export default BootScene;