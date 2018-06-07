var level3 = {
    
    preload:function(){
        game.load.image('fone','img/you.png');
    },
      
    create:function(){
         game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         this.fone = game.add.image(0, 0, 'fone');
        
        this.fone.height = 600;
        this.fone.width = 800;
    },
    update:function(){
        
    },
}