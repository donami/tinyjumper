//  Here is a custom game object
Lock = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'lockGreen');

    game.physics.arcade.enable(this);

    //  Physics properties so that player is able to pick it up
    this.body.collideWorldBounds = true;

    // So that the player can not push the object..
	this.body.immovable = true;
	this.body.moves = false;
};

Lock.prototype = Object.create(Phaser.Sprite.prototype);
Lock.prototype.constructor = Lock;