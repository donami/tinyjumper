var myGame = myGame || {};

myGame.gameOver = function() {};

myGame.gameOver.prototype = {
    create: function() {
    	this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'gameOverBG');

     	var startBtn = this.game.add.button(this.game.width / 2, 360, 'btnStartGame', this.startGame, this);
     	startBtn.anchor.set(0.5, 0.5);   

    },
    update: function() {

    },
    startGame: function() {
    	this.game.state.start('Game');
    }
};