import Phaser from 'phaser';

const WorldScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize:

  function WorldScene() {
    Phaser.Scene.call(this, { key: 'WorldScene' });
  },

  update(time, delta) {
    this.player.body.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
    }

    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    }
  },

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const terrain = map.addTilesetImage('Tilesheet-land-v5', 'Tilesheet-land-v5');
    const sea = map.addTilesetImage('Tilesheet-water', 'Tilesheet-water');
    map.createLayer('sea', sea, 0, 0);
    map.createLayer('terrain', terrain, 0, 0);
    const obstacles = map.createLayer('tree', terrain, 0, 0);
    obstacles.setCollisionByExclusion([-1]);

    this.player = this.physics.add.sprite(0, 0, 'girl');
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);


    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;
  },
});

export default WorldScene;