var myGame = myGame || {};

myGame.Game = function() {};

myGame.Game.prototype = {
	preload: function() {
	    this.load.spritesheet('playerSprite', 'assets/player.png', 72, 95, 11);
	    this.load.spritesheet('enemySprite', 'assets/enemy.png', 72, 95, 11);

	    this.load.image('water', 'assets/liquidWater.png')
	    this.load.image('waterTop', 'assets/liquidWaterTop.png')
	    this.load.image('keyGreen', 'assets/keyGreen.png');
	    this.load.image('lockGreen', 'assets/lockGreen.png');

	    // Load the tilemap
	    this.load.tilemap('tilemap', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
	    // Load the tileset
	    this.load.image('tiles', 'assets/tiles.png');
	},

    create: function() {

	    this.stage.backgroundColor = '#d0f4f7';

	     //  Enable physics for the game
	    this.physics.startSystem(Phaser.Physics.ARCADE);

	    //  Add the tilemaps
	    map = this.add.tilemap('tilemap');

	    // Load the tileset image
	    map.addTilesetImage('tileset1', 'tiles');
	    
		// Create the different Tile Layers from the JSON file
	    groundLayer = map.createLayer('ground');
	    waterLayer = map.createLayer('water');
	    bgLayer = map.createLayer('bg');

	    //  Resize world to fit the game screen
	    groundLayer.resizeWorld();

	    // Prevent player falling through the floor
	    map.setCollisionBetween(1, 10000, true, groundLayer);

	    // Add the water group
	    this.water = this.add.group();
	    this.water.enableBody = true;

	    //  Collect all the water objects from the tilemap
	    map.createFromObjects('water object', 100, 'water', 0, true, false, this.water); 

	    // Invisible block that defines where the enemies are allowed to walk
	    this.blocks = this.add.group();
	    this.blocks.enableBody = true;
	    this.blocks.alpha = 0;							// Make group invisible

	    // Get the hidden blocks from tilemap
	    map.createFromObjects('hiddenBlock', 46, 'water', 0, true, false, this.blocks);

		// Create the player
	    this.player = new Player(this.game, 32, this.world.height - 250);

	    // Add entity groups
	    this.enemies = this.game.add.group();
	    this.keys = this.game.add.group();
		this.locks = this.game.add.group();
		this.door = this.game.add.group();

		this.door.enableBody = true;
		this.door.alpha = 0;

	    // Add the objects from the tilemap
		map.createFromObjects('enemies', 110, 'enemySprite', 0, true, false, this.enemies, Enemy);
		map.createFromObjects('keys', 79, 'keyGreen', 0, true, false, this.keys, Key);
		map.createFromObjects('lock', 35, 'lockGreen', 0, true, false, this.locks, Lock);
		map.createFromObjects('door', 118, 'lockGreen', 0, true, false, this.door, Door);

	    // Add the player to the game
	    this.add.existing(this.player);

	    // Make the game view follow the player
	    this.camera.follow(this.player);

	     
	    // Prevent the browser from taking control in some browsers
	    this.game.input.keyboard.addKeyCapture([
	        Phaser.Keyboard.LEFT,
	        Phaser.Keyboard.RIGHT,
	        Phaser.Keyboard.UP,
	        Phaser.Keyboard.DOWN,
	        Phaser.Keyboard.SPACEBAR
	    ]);  
    },
    update: function() {
	    //  Collide the player and the enemies with the ground tiles
	    this.game.physics.arcade.collide(this.player, groundLayer);
	    this.game.physics.arcade.collide(this.enemies, groundLayer);

	    // Collect a key
	    this.game.physics.arcade.overlap(this.player, this.keys, this.collectKey, null, this);

	    // Collision between player and enemy
	    this.game.physics.arcade.collide(this.player, this.enemies, this.collideEnemy, null, this);

	    // Determine when the enemies should swap direction using hidden blocks
	    this.game.physics.arcade.overlap(this.enemies, this.blocks, this.enemySwapDirection, null, this);

	    // Player should not be able to walk through locks
	    this.game.physics.arcade.collide(this.player, this.locks);

	    // Player walks through door
	    this.game.physics.arcade.overlap(this.player, this.door, this.walkThroughDoor, null, this);

	    // Player collides with enemy
	    this.game.physics.arcade.overlap(this.player, this.water, this.playerHitWater, null, this);

	},
	collideEnemy: function(player, enemy) {
	    if (enemy.body.touching.up)
	    {
	        // Make the player jump
	        player.body.velocity.y = -200;
	        // Kill the enemy
	        enemy.kill();
	    }
	    else {
	        player.kill();
	        this.gameOver();
	    }
	},
	walkThroughDoor: function() {
		this.levelComplete();
	},
	levelComplete: function() {
		this.state.start('levelComplete');
	},
	collectKey: function(player, key) {
		key.kill();
		// Remove the locks
		this.locks.destroy();
	},
    playerHitWater: function(player, water) {
		player.kill();
		this.gameOver();
    },
    enemySwapDirection: function(enemy) {
    	enemy.changeDirection();
    },
    gameOver: function() {
    	this.state.start('gameOver');
    }

};