var myGame = myGame || {};

myGame.game = new Phaser.Game(800, 630, Phaser.AUTO, '');

myGame.game.state.add('Preload', myGame.Preload);
myGame.game.state.add('MainMenu', myGame.MainMenu);
myGame.game.state.add('Game', myGame.Game);
myGame.game.state.add('levelComplete', myGame.levelComplete);
myGame.game.state.add('gameOver', myGame.gameOver);

myGame.game.state.start('Preload');