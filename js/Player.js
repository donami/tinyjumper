//  Here is a custom game object
Player = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'playerSprite');

    // The player animations
    this.animations.add('walk');

    this.speed = 250;



    game.physics.arcade.enable(this);

    //  Player physics properties
    this.body.bounce.y = 0.2;
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;

    // Which direction the player is facing
    this.facing = 'right';


};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

/**
 * Handling updates of the player 
 */
Player.prototype.update = function() {

    //  Reset the players velocity (movement)
    this.body.velocity.x = 0;

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        this.body.velocity.x = -this.speed;
        this.animations.play('walk', 10, true);
        this.facing = 'left';
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        this.body.velocity.x = this.speed;
        this.animations.play('walk', 10, true);
        this.facing = 'right';
    }
    else if (this.game.input.activePointer.isDown) {
        //this.animations.play('shoot');
    }
    else {
        //  Stand still
        this.animations.stop();

        this.frame = (this.facing == 'right')? 4 : 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.body.blocked.down)
    {
        this.body.velocity.y = -350;
    }

/*    if (this.game.input.activePointer.isDown) {
        this.fire();
    }*/

};

Player.prototype.fire = function(x, y) {	
/*    if (this.game.time.now > nextFire && bullets.countDead() > 0) {
        nextFire = this.game.time.now + fireRate;
        var bullet = bullets.getFirstDead();

        bullet.reset(this.x, this.y);

        this.game.physics.arcade.moveToPointer(bullet, 300);
    }*/
}