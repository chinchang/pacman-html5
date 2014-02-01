// https://github.com/chinchang/pacman-html5
var c = world,
	ctx = c.getContext('2d'),
	mapW = 15,
	mapH = 18,
	tileW = 20,
	tileH = 20,
	w = mapW * tileW,
	h = mapH * tileH,
	Key = {
		UP: 38,
		LEFT: 37,
		DOWN: 40,
		RIGHT: 39
	},
	halfTileW = tileW / 2,
	halfTileH = tileH / 2,
	tileColors = {
		0: '#333',
		1: 'blue',
		2: '#ff0'
	},
	keys = {},
	enemies = [];
	player = {
		x: 100,
		y: 0,
		speed: 1,
		dirX: 1, // 0, -1, 1
		dirY: 0, //0, -1, 1
		nextDirection: null,
		update: function () {
			// Checking for key controls
			if (keys[Key.UP]) {
				this.nextDirection = {x: 0, y: -1};
			}
			if (keys[Key.DOWN]) {
				this.nextDirection = {x: 0, y: 1};
			}
			if (keys[Key.LEFT]) {
				this.nextDirection = {x: -1, y: 0};
			}
			if (keys[Key.RIGHT]) {
				this.nextDirection = {x: 1, y: 0};
			}

			var myCX = this.x + halfTileW,
				myCY = this.y + halfTileH,
				col = ~~(myCX / tileW),
				row = ~~(myCY / tileH),
				tileX = col * tileW + halfTileW,
				tileY = row * tileH + halfTileH,
				mapIndex = col + row * mapW;

			minTileSeparation = 0.1;
			dist = Math.sqrt(Math.pow(myCX - tileX, 2) + Math.pow(myCY - tileY, 2));

			if (this.nextDirection && ((!this.dirX && !this.dirY) || dist < minTileSeparation)) {
				this.x = tileX - halfTileW;
				this.y = tileY - halfTileH;
				this.dirX = this.nextDirection.x;
				this.dirY = this.nextDirection.y;
				this.nextDirection = null;
			}

			this.x += this.dirX * this.speed;
			this.y += this.dirY * this.speed;

			// map collision check
			if (this.x + tileW > w || this.x < 0) {
				this.dirX = 0;
			}
			if (this.y + tileH > h || this.y < 0) {
				this.dirY = 0;
			}

			// Check collectible collision
			if (map[mapIndex] === 2) {
				console.log('collect');
				map[mapIndex] = 0;
			}
		},
		draw: function () {
			ctx.beginPath();
			ctx.fillStyle = '#ff0';
			ctx.arc(this.x + halfTileW, this.y + halfTileH, halfTileW, 0, Math.PI * 2);
			ctx.fill();
			ctx.closePath();
		}
	};

function Enemy (row, col, color) {
	this.x = row * tileH;
	this.y = col * tileW;
	this.speed = 1;
	this.dirX = 0;
	this.dirY = 1;
	this.nextDirection = null;
	this.color = color;
}

Enemy.prototype.update = function () {
	var myCX = this.x + halfTileW,
		myCY = this.y + halfTileH,
		col = ~~(myCX / tileW),
		row = ~~(myCY / tileH),
		tileX = col * tileW + halfTileW,
		tileY = row * tileH + halfTileH,
		mapIndex = col + row * mapW;

	minTileSeparation = 0.5;
	dist = Math.sqrt(Math.pow(this.x - tileX, 2) + Math.pow(this.y - tileY, 2));
	// console.log(dist)

	// console.log(dist)
	if (this.nextDirection /* dist < minTileSeparation*/) {
		this.dirX = this.nextDirection.x;
		this.dirY = this.nextDirection.y;
		this.nextDirection = null;
	}

	var dir = strategy(this, player);
	this.dirX = dir.x;
	this.dirY = dir.y;

	this.x += this.dirX * this.speed;
	this.y += this.dirY * this.speed;

	// map collision check
	if (this.x + tileW > w || this.x < 0) {
		this.dirX = -this.dirX;
	}
	if (this.y + tileH > h || this.y < 0) {
		this.dirY = -this.dirY;
	}
};

Enemy.prototype.draw = function () {
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x + halfTileW, this.y + halfTileH, halfTileW, 0, Math.PI * 2);
	ctx.fill();
	ctx.closePath();
};

function drawMap () {
	for (var i = 0; i < mapW; i++) {
		for (var j = 0; j < mapH; j++) {
			drawTile(map[j * mapW + i], i, j);
		}
	}
}

function drawTile (type, x, y) {
	switch(type) {
		case 2:
			ctx.beginPath();
			ctx.fillStyle = '#333';
			ctx.rect(x * tileW, y * tileH, tileW, tileH);
			ctx.fill();
			ctx.closePath();
			ctx.beginPath();
			ctx.fillStyle = '#ff0';
			ctx.rect(x * tileW + halfTileW, y * tileH + halfTileH, 3, 3);
			ctx.fill();
			ctx.closePath();
			break;
		default:
			ctx.beginPath();
			ctx.fillStyle = tileColors[type];
			ctx.rect(x * tileW, y * tileH, tileW, tileH);
			ctx.fill();
			ctx.closePath();
	}
}

function draw () {
	drawMap();
	for (var i = enemies.length; i--;) {
		enemies[i].draw();
	}
	player.draw();
}

function update () {
	for (var i = enemies.length; i--;) {
		enemies[i].update();
	}
	player.update();
}

function animate () {
	ctx.clearRect(0, 0, w, h);
	update();
	draw()
	requestAnimationFrame(animate);
}


// Keydown and keyup events
window.onkeydown = function (e) {
	keys[e.which] = true;
}

window.onkeyup = function (e) {
	delete keys[e.which];
}

enemies.push(new Enemy(2, 2, 'red'));
enemies.push(new Enemy(6, 1, 'pink'));
enemies.push(new Enemy(1, 7, 'blue'));
enemies.push(new Enemy(13, 7, 'orange'));
animate();
