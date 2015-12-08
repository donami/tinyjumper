//  Here is a custom game object
Key = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'keyGreen');

    game.physics.arcade.enable(this);

    //  Physics properties so that player is able to pick it up
    this.body.collideWorldBounds = true;
};

Key.prototype = Object.create(Phaser.Sprite.prototype);
Key.prototype.constructor = Key;