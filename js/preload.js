var myGame = myGame || {};

myGame.Preload = function() {};

myGame.Preload.prototype = {
    preload: function() {
 
 		this.load.image('background', 'assets/mainMenuBG.jpg');
 		this.load.image('gameOverBG', 'assets/gameOverBG.jpg');
 		this.load.image('levelCompleteBG', 'assets/levelCompleteBG.jpg');
        this.load.image('btnStartGame', 'assets/play.png');


    },
    create: function() {
        this.state.start('MainMenu');
    }
};