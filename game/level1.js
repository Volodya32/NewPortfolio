
 var level1 = {

     left: null,
     right: null,
     up: null,
     flag: null,
     box: null,
     mush: null,
     coin: null,
     metal: null,
     mush2: null,
     fone: null,
     hero: null,
     score: 0,
     block: null,
     x: [600, 1700],
     y: [280, 280],
     platf1: null,
     platf2: null,
     xm: [250, 890],
     ym: [430, 430],
     xC: [290, 930, 650, 1750],
     yC: [380, 380, 230, 230],


     preload: function () {
         game.load.image('fone', 'img/bg_shroom.png');
         game.load.image('mush', 'img/mushroom.png');
         game.load.image('coin', 'img/hud_p1.png');
         game.load.image('mush2', 'img/mushroom2.png');
         game.load.image('left', 'img/arrowLeft.png');
         game.load.image('up', 'img/arrowUp.png');
         game.load.image('right', 'img/arrowRight.png');
         game.load.spritesheet('hero', 'img/blueSprite.png', 100, 100);
         game.load.image('flag', 'img/flagRed.png');
         game.load.image('box', 'img/box2.png');
         game.load.image('block', 'img/grassBlock.png');
     },

     create: function () {
         game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         game.physics.startSystem(Phaser.Physics.ARCADE);

         this.fone = game.add.image(0, 0, 'fone');
         this.hero = game.add.sprite(0, 400, 'hero');
         this.box = game.add.sprite(0, 180, 'box');
         this.block = game.add.sprite(0, 540, 'block');
         this.flag = game.add.sprite(100, 110, 'flag');

         this.mush = game.add.group();
         this.mush.enableBody = true;
         this.fone.height = 700;
         game.physics.arcade.enable([this.hero, this.box, this.flag, this.block]);

         this.block.body.immovable = true;
         this.block.body.colliddWorldBounds = true;

         this.box.scale.setTo(0.8, 0.8);
         this.box.body.immovable = true;
         this.box.body.colliddWorldBounds = true;

         this.flag.body.immovable = true;
         this.flag.body.colliddWorldBounds = true;


         this.mush2 = game.add.group();
         this.mush2.enableBody = true;

         this.coin = game.add.group();
         this.coin.enableBody = true;

         this.hero.body.collideWorldBounds = true;
         this.hero.body.gravity.y = 300;

         for (var i = 0; i < this.x.length; i++) {
             var m = this.mush.create(this.x[i], this.y[i], 'mush');
             m.body.immovable = true;
             m.body.collideWorldBounds = true;
         }

         for (var i = 0; i < this.xm.length; i++) {
             var mu = this.mush2.create(this.xm[i], this.ym[i], 'mush2');
             mu.body.immovable = true;
             mu.body.collideWorldBounds = true;
         }

         for (var i = 0; i < this.xC.length; i++) {
             var c = this.coin.create(this.xC[i], this.yC[i], 'coin');
             c.body.immovable = true;
             c.body.collideWorldBounds = true;
         }

         this.left = game.add.sprite(50, 520, 'left');
         this.right = game.add.sprite(150, 520, 'right');
         this.up = game.add.sprite(350, 520, 'up');
         game.camera.follow(this.hero);

         this.hero.animations.add('right', [4, 5, 6], 10, true);
         this.hero.animations.add('left', [0, 1, 2, ], 10, true);
         this.hero.animations.add('stop', [3], 10, true);

         game.world.setBounds(0, 0, 1600, 600);
         this.fone.scale.setTo(1.7, 2);

         this.left.inputEnabled = true;
         this.right.inputEnabled = true;
         this.up.inputEnabled = true;

         this.up.fixedToCamera = true;
         this.left.fixedToCamera = true;
         this.right.fixedToCamera = true;

         this.left.events.onInputDown.add(this.isDownLeft);
         this.right.events.onInputDown.add(this.isDownRight);
         this.up.events.onInputDown.add(this.isDownUp);

         this.left.events.onInputUp.add(this.stop);
         this.right.events.onInputUp.add(this.stop);
         this.up.events.onInputUp.add(this.stop);


     },

     isDownUp: function () {

         if (level1.hero.body.onFloor() || level1.platf1 || level1.platf2 || level1.platf3) {
             level1.hero.body.velocity.y = -400;
         }
     },

     isDownRight: function () {
         level1.hero.body.velocity.x = 200;
         level1.hero.animations.play('right');
     },

     isDownLeft: function () {
         level1.hero.body.velocity.x = -200;
         level1.hero.animations.play('left');
     },
     stop: function () {
         level1.hero.body.velocity.x = 0;
         level1.hero.animations.stop();
     },

     update: function () {
         this.platf1 = game.physics.arcade.collide(this.hero, this.mush);
         this.platf2 = game.physics.arcade.collide(this.hero, this.mush2);
         this.platf3 = game.physics.arcade.collide(this.hero, this.block);
         game.physics.arcade.collide(this.hero, this.box);
         game.physics.arcade.collide(this.hero, this.block);
         game.physics.arcade.collide(this.hero, this.flag, this.take2);
         game.physics.arcade.collide(this.hero, this.coin, this.take);
         if (this.hero.body.onFloor()) {
             this.hero.kill();
             this.score=0;
             game.state.start("lev1");
         }
     },

     take: function (a, b) {
         level1.score++;
         console.log(level1.score);
         b.kill();
     },

     take2: function (a, b) {

         if (level1.score == 4) {
             game.state.start("lev2");
         }
     }
 }
