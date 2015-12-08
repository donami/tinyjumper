//  Here is a custom game object
Enemy = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'enemySprite');

    // The player animations
    this.animations.add('walk');
    this.animations.play('walk', 10, true);

    this.speed = 150;

    game.physics.arcade.enable(this);

    //  Enemy physics properties
    this.body.bounce.y = 0.2;
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;

    // Which direction the player is facing
    this.facing = 'right';

};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * Handling updates of the player 
 */
Enemy.prototype.update = function() {
    if (this.facing == 'right') {
        this.body.velocity.x = this.speed;
    }
    else {
        this.body.velocity.x = -this.speed;
    }
};

Enemy.prototype.changeDirection = function() {
    // Swap the direction 
    this.facing = (this.facing == 'right')? 'left' : 'right';
};
