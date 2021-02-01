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

    if (this.cursors.left.isDown) {
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('down', true);
    } else {
      this.player.anims.stop();
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

    this.player = this.physics.add.sprite(50, 50, 'girl');
    this.player.setScale(0.75);
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: 'left',
      frameRate: 10,
      frames: this.anims.generateFrameNames('girl', {
        prefix: 'girl-',
        suffix: '.png',
        start: 9,
        end: 17,
      }),
      repeat: -1,
    });
    this.anims.create({
      key: 'right',
      frameRate: 10,
      frames: this.anims.generateFrameNames('girl', {
        prefix: 'girl-',
        suffix: '.png',
        start: 27,
        end: 35,
      }),
      repeat: -1,
    });
    this.anims.create({
      key: 'up',
      frameRate: 10,
      frames: this.anims.generateFrameNames('girl', {
        prefix: 'girl-',
        suffix: '.png',
        start: 0,
        end: 8,
      }),
      repeat: -1,
    });
    this.anims.create({
      key: 'down',
      frameRate: 10,
      frames: this.anims.generateFrameNames('girl', {
        prefix: 'girl-',
        suffix: '.png',
        start: 18,
        end: 26,
      }),
      repeat: -1,
    });

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    this.physics.add.collider(this.player, obstacles);

    this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    for (let i = 0; i < 30; i += 1) {
      const x = Phaser.Math.RND.between(50, this.physics.world.bounds.width - 50);
      const y = Phaser.Math.RND.between(50, this.physics.world.bounds.height - 50);
      this.spawns.create(x, y, 20, 20);
    }
    this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
  },
  onMeetEnemy(player, zone) {
    zone.x = Phaser.Math.RND.between(50, this.physics.world.bounds.width - 50);
    zone.y = Phaser.Math.RND.between(50, this.physics.world.bounds.height - 50);

    this.cameras.main.shake(300);
    this.cameras.main.flash(300);

    this.scene.switch('BattleScene');
  },
});


export default WorldScene;