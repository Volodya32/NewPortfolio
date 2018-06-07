var level2 = {

    fone: null,
    hero: null,
    left: null,
    right: null,
    up: null,
    box: null,
    enamy: null,
    coin: null,
    bullet: null,
    bulletTime: 0,
    btn: null,
    block: null,
    score: 0,
    flag: null,
    x: [200, 500, 900, 1700, 50, 700],
    y: [500, 380, 450, 350, 150, 150],
    xC: [300, 600, 1000, 1800, 150, 800],
    yC: [450, 330, 400, 300, 100, 100],

    preload: function () {
        game.load.image('fone', 'img/bg_desert.png');
        game.load.spritesheet('hero', 'img/blueSprite.png', 100, 100);
        game.load.image('left', 'img/arrowLeft.png');
        game.load.image('up', 'img/arrowUp.png');
        game.load.image('right', 'img/arrowRight.png');
        game.load.image('box', 'img/box2.png');
        game.load.image('coin', 'img/hud_p1.png');
        game.load.image('flag', 'img/flagRed.png');
        game.load.image('enamy', 'img/flyFly2.png');
        game.load.image('bullet', 'img/laserBlueBurst.png');
        game.load.image('btn', 'img/shadedDark36.png');
        game.load.image('block', 'img/grassBlock.png');


    },
    create: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.physics.startSystem(Phaser.Physics.ARCADE);


        this.fone = game.add.image(0, 0, 'fone');
        this.fone.scale.setTo(1.7, 2);

        this.flag = game.add.sprite(100, 80, 'flag');

        this.hero = game.add.sprite(0, 500, 'hero');
        game.physics.arcade.enable([this.hero, this.flag]);

        this.box = game.add.group();
        this.box.enableBody = true;

        this.coin = game.add.group();
        this.coin.enableBody = true;

        this.enamy = game.add.group();
        this.enamy.enableBody = true;

        this.bullet = game.add.weapon(300, 'bullet');
        this.bullet.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.bullet.bulletSpeed = 600;

        
        level2.bullet.trackSprite(this.hero, 50, 50, true);



        for (var i = 0; i < this.x.length; i++) {
            var b = this.box.create(this.x[i], this.y[i], 'box');
            b.body.immovable = true;
            b.body.collideWorldBounds = true;
        }

        for (var i = 0; i < this.xC.length; i++) {
            var c = this.coin.create(this.xC[i], this.yC[i], 'coin');
            c.body.immovable = true;
            c.body.collideWorldBounds = true;
        }

        for (var i = 0; i < 4; i++) {
            var e = this.enamy.create(game.world.randomX, game.world.randomY, 'enamy');
            e.body.velocity.setTo(200, 200);
            e.body.bounce.set(1);
            e.body.collideWorldBounds = true;
        }
        this.hero.body.collideWorldBounds = true;
        this.hero.body.gravity.y = 300;
        this.fone.height = 700;

        this.left = game.add.sprite(50, 520, 'left');
        this.btn = game.add.sprite(450, 520, 'btn');
        this.right = game.add.sprite(150, 520, 'right');
        this.up = game.add.sprite(350, 520, 'up');

        this.hero.animations.add('right', [4, 5, 6], 10, true);
        this.hero.animations.add('left', [0, 1, 2, ], 10, true);
        this.hero.animations.add('stop', [3], 10, true);

        game.world.setBounds(0, 0, 1600, 600);

        this.left.inputEnabled = true;
        this.right.inputEnabled = true;
        this.btn.inputEnabled = true;
        this.up.inputEnabled = true;
        game.camera.follow(this.hero);

        this.up.fixedToCamera = true;
        this.left.fixedToCamera = true;
        this.btn.fixedToCamera = true;
        this.right.fixedToCamera = true;

        this.left.events.onInputDown.add(this.isDownLeft);
        this.right.events.onInputDown.add(this.isDownRight);
        this.btn.events.onInputDown.add(this.isDownFire);
        this.up.events.onInputDown.add(this.isDownUp);

        this.left.events.onInputUp.add(this.stop);
        this.right.events.onInputUp.add(this.stop);
        this.up.events.onInputUp.add(this.stop);
        

    },
    

    isDownUp: function () {

        if (level2.hero.body.onFloor() || level2.platf1) {
            level2.hero.body.velocity.y = -400;

        }
    },

    isDownRight: function () {
        level2.hero.body.velocity.x = 200;
        level2.hero.animations.play('right');



    },

    isDownLeft: function () {
        level2.hero.body.velocity.x = -200;
        level2.hero.animations.play('left');

    },
    stop: function () {
        level2.hero.body.velocity.x = 0;
        level2.hero.animations.stop();
    },
    isDownFire: function () {
        console.log(level2.hero.frame);
         if (level2.hero.frame >= 4) {
             level2.bullet.fire(); 
          level2.bullet.fireAngle = 180;
       
        } 

    },


    update: function () {
        this.platf1 = game.physics.arcade.collide(this.hero, this.box);
        game.physics.arcade.collide(this.hero, this.coin, this.take);
        game.physics.arcade.collide(this.hero, this.flag, this.take2);
        game.physics.arcade.collide(this.hero, this.enamy, this.take3);
        game.physics.arcade.collide(this.enamy, this.box);
        game.physics.arcade.overlap(this.bullet.bullets, this.enamy, this.hitEnemy, null, this);

    },
    take: function (a, b) {
        level2.score++;
        console.log(level2.score);
        b.kill();
    },
    take2: function (a, b) {
        if (level2.score == 6) {
            game.state.start("lev3");
        }
    },
    take3: function (a, b) {
        a.kill();
         level2.score = 0;
         game.state.start("lev2");
    },
    hitEnemy: function (a, b) {
        a.kill();
        b.kill();
        console.log()
    },

}
