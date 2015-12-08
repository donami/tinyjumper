//  Here is a custom game object
Door = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'lockGreen');

    game.physics.arcade.enable(this);
};

Door.prototype = Object.create(Phaser.Sprite.prototype);
Door.prototype.constructor = Door;