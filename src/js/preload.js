import Phaser from 'phaser';
import WebpackLoader from 'phaser-webpack-loader';
import AssetManifest from '../AssetManifest';

export default class Preload extends Phaser.Scene {
  preload() {
    this.progressBar = {
      x: null,
      y: null,
      width: 300,
      height: 50,
      padding: 10,
      box: null,
      bar: null,
      loadingFontSize: 30,
      percentageFontSize: null,
      loadingText: null,
      completeValue: null,

      init(scene, x, y) {
        this.x = x;
        this.y = y;
        this.percentageFontSize = this.loadingFontSize / 2;
        this.box = scene.add.graphics();
        this.bar = scene.add.graphics();
        this.loadingText = scene.make.text({
          text: 'Loading...',
          style: {
            font: `${this.loadingFontSize}px monospace`,
            fill: '#ffffff',
          },
        });
        this.percentageText = scene.make.text({
          text: '100%',
          style: {
            font: `${this.percentageFontSize}px monospace`,
            fill: '#000000',
          },
        });
        this.box.fillStyle(0x5946B2);
        this.box.fillRect(250, this.y, this.width, this.height);

        this.loadingText.setPosition(325, (y - this.height / 2) - 40, 0);
        this.percentageText.setPosition(400, y + this.height / 2, 0);
        this.percentageText.setOrigin(0.5, 0.5);
      },
      render() {
        this.bar.clear();
        this.bar.fillStyle(0xffffff, 0.8);
        if (this.completeValue != null && this.completeValue > 0) {
          this.bar.fillRect(
            250 + this.padding,
            this.y + this.padding,
            (this.width * this.completeValue) - (this.padding * 2),
            this.height - (this.padding * 2),
          );
        }
        this.percentageText.setText(`${this.completeValue === null ? '0' : Math.round(this.completeValue) * 100}%`);
      },
      step() {
        this.loadedCount += 1;
        this.completeValue = this.loadedCount / this.fileCount;
      },
    };
    this.progressBar.init(this, this.cameras.main.width / 2, this.cameras.main.height / 2);
    this.progressBar.render();
    this.load.scenePlugin('WebpackLoader', WebpackLoader, 'loader', 'loader');
  }

  create() {
    this.progressBar.fileCount = Object.keys(AssetManifest).reduce(
      (r, k) => r.concat(AssetManifest[k]), [],
    ).length;
    this.progressBar.loadedCount = 0;

    this.loader.systems.events.on('load', () => {
      this.progressBar.step();
      this.progressBar.render();
    });
    this.loader.start(AssetManifest);
    this.loader.load().then(() => {
      this.scene.start('BootScene');
    });
  }
}