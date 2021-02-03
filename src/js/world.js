import Phaser from 'phaser';
import gameOver from './gameOver';

const WorldScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize:

  function WorldScene() {
    Phaser.Scene.call(this, { key: 'WorldScene' });
  },

  update() {
    const cam = this.cameras.main;

    const time = Math.round(100 - this.timedEvent.getProgress().toString().substr(0, 4) * 100);

    this.timedEventTxt.setText(`Time: ${time}`);

    if (cam.scrollX > 0 || cam.scrollY > 0) {
      this.scoreText.destroy();
      this.scoreText = this.add.text(cam.scrollX + 16, cam.scrollY + 16, `Score: ${this.score}`, { fontSize: '32px', fill: '#000' });

      this.timedEventTxt.destroy();
      this.timedEventTxt = this.add.text(cam.scrollX + 625, cam.scrollY + 16, `Time: ${time}`, { fontSize: '32px', fill: '#000' });
    }

    this.player.body.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-180);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(180);
    }

    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-180);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(180);
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
    const map = this.make.tilemap({ key: 'map2' });
    const terrain = map.addTilesetImage('Serene_Village_32x32', 'Serene_Village_32x32');

    map.createLayer('terrain', terrain, 0, 0);
    map.createLayer('walk', terrain, 0, 0);
    const obstacles = map.createLayer('objects', terrain, 10, 10);
    obstacles.setCollisionByExclusion([-1]);

    this.player = this.physics.add.sprite(50, 50, 'girl');
    this.player.setScale(0.8);
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
    this.anims.create({
      key: 'bounce',
      frameRate: 7,
      frames: this.anims.generateFrameNames('egg_red', {
        prefix: 'egg_red-',
        suffix: '.png',
        start: 0,
        end: 1,
      }),
      repeat: -1,
    });

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    this.physics.add.collider(this.player, obstacles);

    this.spawns = this.physics.add.group();

    for (let i = 0; i < 30; i += 1) {
      const x = Phaser.Math.RND.between(50, this.physics.world.bounds.width - 50);
      const y = Phaser.Math.RND.between(50, this.physics.world.bounds.height - 50);

      this.eggs = this.spawns.create(x, y, 'egg_red');
      this.eggs.setScale(0.5);
      this.eggs.anims.play({ key: 'bounce', repeatDelay: i * 10 });

      this.physics.add.overlap(this.player, this.eggs, this.onMeetEnemy, false, this);
    }

    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    this.timedEvent = this.time.delayedCall(3000, () => {
      this.scene.pause();
      gameOver(this.score);
    }, [], this);

    this.timedEventTxt = this.add.text(625, 16, '', { fontSize: '32px', fill: '#000' });
  },

  onMeetEnemy(_player, zone) {
    zone.x = Phaser.Math.RND.between(50, this.physics.world.bounds.width - 50);
    zone.y = Phaser.Math.RND.between(50, this.physics.world.bounds.height - 50);

    const cam = this.cameras.main;
    cam.shake(100);

    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);
  },

});


export default WorldScene;