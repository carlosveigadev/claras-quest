import Phaser from 'phaser';

const Unit = new Phaser.Class({
  Extends: Phaser.GameObjects.Sprite,

  initialize:

    function Unit(scene, x, y, texture, frame, type, hp, damage) {
      Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame);
      this.type = type;
      this.maxHp = this.hp;
      this.hp = hp;
      this.damage = damage;
    },
  attack(target) {
    target.takeDamage(this.damage);
  },
  takeDamage(damage) {
    this.hp -= damage;
  },
});

const Enemy = new Phaser.Class({
  Extends: Unit,

  initialize:
    function Enemy(scene, x, y, texture, frame, type, hp, damage) {
      Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    },
});

const PlayerCharacter = new Phaser.Class({
  Extends: Unit,

  initialize:
  function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage) {
    Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    this.flipX = true;

    this.setScale(2);
  },
});

const MenuItem = new Phaser.Class({
  Extends: Phaser.GameObjects.Text,

  initialize:

    function MenuItem(x, y, text, scene) {
      Phaser.GameObjects.Text.call(this, scene, x, y, text, { color: '#ffffff', align: 'left', fontSize: 15 });
    },

  select() {
    this.setColor('#f8ff38');
  },

  deselect() {
    this.setColor('#ffffff');
  },

});

const Menu = new Phaser.Class({
  Extends: Phaser.GameObjects.Container,

  initialize:

  function Menu(x, y, scene, heroes) {
    Phaser.GameObjects.Container.call(this, scene, x, y);
    this.menuItems = [];
    this.menuItemIndex = 0;
    this.heroes = heroes;
    this.x = x;
    this.y = y;
  },
  addMenuItem(unit) {
    const menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
    this.menuItems.push(menuItem);
    this.add(menuItem);
  },
  moveSelectionUp() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex--;
    if (this.menuItemIndex < 0) this.menuItemIndex = this.menuItems.length - 1;
    this.menuItems[this.menuItemIndex].select();
  },
  moveSelectionDown() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex++;
    if (this.menuItemIndex >= this.menuItems.length) this.menuItemIndex = 0;
    this.menuItems[this.menuItemIndex].select();
  },
  select(index) {
    if (!index) index = 0;
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = index;
    this.menuItems[this.menuItemIndex].select();
  },
  deselect() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = 0;
  },
  confirm() {

  },
});

const HeroesMenu = new Phaser.Class({
  Extends: Menu,

  initialize:

    function HeroesMenu(x, y, scene) {
      Menu.call(this, x, y, scene);
    },
});

const ActionsMenu = new Phaser.Class({
  Extends: Menu,

  initialize:

    function ActionsMenu(x, y, scene) {
      Menu.call(this, x, y, scene);
      this.addMenuItem('Attack');
    },
  confirm() {

  },

});

const EnemiesMenu = new Phaser.Class({
  Extends: Menu,

  initialize:

    function EnemiesMenu(x, y, scene) {
      Menu.call(this, x, y, scene);
    },
  confirm() {

  },
});

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

const BattleScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function BattleScene() {
    Phaser.Scene.call(this, { key: 'BattleScene' });
  },
  create() {
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
    this.scene.launch('UIScene');
    const timeEvent = this.time.addEvent({ delay: 2000, callback: this.exitBattle, callbackScope: this });
    // this.sys.events.on('wake', this.wake, this);
    // change the background to green
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

    // player character - warrior
    const warrior = new PlayerCharacter(this, 250, 50, 'player', 1, 'Warrior', 100, 20);
    this.add.existing(warrior);

    // player character - mage
    const mage = new PlayerCharacter(this, 250, 100, 'player', 4, 'Mage', 80, 8);
    this.add.existing(mage);

    const dragonblue = new Enemy(this, 50, 50, 'dragonblue', null, 'Dragon', 50, 3);
    this.add.existing(dragonblue);

    const dragonOrange = new Enemy(this, 50, 100, 'dragonorrange', null, 'Dragon2', 50, 3);
    this.add.existing(dragonOrange);

    // array with heroes
    this.heroes = [warrior, mage];
    // array with enemies
    this.enemies = [dragonblue, dragonOrange];
    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);
  },
  // exitBattle() {
  //   this.scene.sleep('UIScene');
  //   this.scene.switch('WorldScene');
  // },
  // wake() {
  //   this.scene.run('UIScene');
  //   this.time.addEvent({ delay: 2000, callback: this.exitBattle, callbackScope: this });
  // },
});

const UIScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function UIScene() {
    Phaser.Scene.call(this, { key: 'UIScene' });
  },

  create() {
    const menu = [
      this.graphics = this.add.graphics(),
      this.graphics.lineStyle(1, 0xffffff),
      this.graphics.fillStyle(0x031f4c, 1),

      this.graphics.strokeRect(5, 300, 250, 295),
      this.graphics.fillRect(5, 300, 250, 295),

      this.graphics.strokeRect(260, 300, 250, 295),
      this.graphics.fillRect(260, 300, 250, 295),

      this.graphics.strokeRect(515, 300, 280, 295),
      this.graphics.fillRect(515, 300, 280, 295),
    ];
    this.menus = this.add.container();

    this.heroesMenu = new HeroesMenu(715, 320, this);
    this.actionsMenu = new ActionsMenu(430, 320, this);
    this.enemiesMenu = new EnemiesMenu(180, 320, this);

    this.currentMenu = this.actionsMenu;

    this.menus.add(this.heroesMenu);
    this.menus.add(this.actionsMenu);
    this.menus.add(this.enemiesMenu);
  },
});

export { WorldScene, BattleScene, UIScene };