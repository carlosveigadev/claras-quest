import Phaser from 'phaser';

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

    const addEvent = (value, whatToDo) => {
      value.setInteractive({ useHandCursor: true })
        .on('pointerout', () => {
          value.setStyle({
            fill: 'white',
          });
        })
        .on('pointerover', () => {
          value.setStyle({
            fill: 'fuchsia',
          });
        })
        .on('pointerdown', () => {
          value.setStyle({
            fill: 'gray',
          });
        });
    };

    this.button = {
      x: null,
      y: null,
      text: null,
      init(x, y, message, scene) {
        this.x = x;
        this.y = y;
        this.bgBox = scene.add.graphics();
        this.box = scene.add.graphics();
        this.text = scene.add.text(this.x, this.y, message, {
          fill: '#fff',
          fontFamily: 'monoscape',
          fontSize: 30,
        });
        addEvent(this.text, message);
        this.text.setPadding(25, 15, 25, 15);
        this.text.setX(this.x - (this.text.width / 2));
        this.bgBox.fillRoundedRect(
          this.x - (this.text.width / 2) + 3,
          this.y - 3,
          this.text.width,
          this.text.height,
          10,
        );
        this.bgBox.fillStyle(0x5946B2);
        this.box.fillRoundedRect(
          this.x - (this.text.width / 2),
          this.y,
          this.text.width,
          this.text.height,
          10,
        );
        this.box.fillStyle(0x45feff);
        this.text.setInteractive({ useHandCursor: true });
      },
    };


    this.logo.init(this);

    this.button.init(400, 200, 'Start', this);
    this.button.init(400, 200 + 75, 'How to Play', this);
    this.button.init(400, 200 + 150, 'Sounds', this);
    this.button.init(400, 200 + 225, 'Credits', this);
    this.button.init(400, 200 + 300, 'Scores', this);
    this.scene.start('WorldScene');
  }
}

export default BootScene;