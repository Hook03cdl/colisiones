const canvas = document.getElementById('micanvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Box {
	constructor({
		posicion = { x: 200, y: 200 },
		color = 'black',
		width = 50,
		height = 50,
		velocidad = { x: 0, y: 0 },
	}) {
		this.posicion = posicion;
		this.width = width;
		this.height = height;
		this.color = color;
		this.velocidad = velocidad;
	}

	draw() {
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'black';
		ctx.strokeRect(this.posicion.x, this.posicion.y, this.width, this.height);

		ctx.fillStyle = this.color;
		ctx.fillRect(this.posicion.x, this.posicion.y, this.width, this.height);
	}
}

const center = {
	x: canvas.width / 2,
	y: canvas.height / 2,
};

const box1 = new Box({
	posicion: {
		x: center.x - 150,
		y: center.y - 50,
	},
	height: 100,
	width: 100,
	color: colorRandom(),
	velocidad: {
		x: 10,
		y: 0,
	},
});

const box2 = new Box({
	posicion: {
		x: center.x + 50,
		y: center.y - 50,
	},
	color: 'blue',
});

function limites(box1) {
	if (box1.posicion.x < -box1.width) {
		box1.posicion.x = canvas.width;
	}
	if (box1.posicion.x > canvas.width) {
		box1.posicion.x = 0;
	}

	if (box1.posicion.y < -box1.height) {
		box1.posicion.y = canvas.height;
	}
	if (box1.posicion.y > canvas.height) {
		box1.posicion.y = 0;
	}
}

function colision({ box1, box2 }) {
	return (
		box1.posicion.x + box1.width >= box2.posicion.x &&
		box2.posicion.x + box2.width >= box1.posicion.x &&
		box1.posicion.y + box1.height >= box2.posicion.y &&
		box2.posicion.y + box2.height >= box1.posicion.y
	);
}

window.addEventListener('keydown', (e) => {
	console.log(`${e.key}: ${e.keyCode}`);
	switch (e.keyCode) {
		case 87: //arriba
			box1.velocidad.x = 0;
			box1.velocidad.y = -10;
			break;
		case 83: // abajo
			box1.velocidad.x = 0;
			box1.velocidad.y = 10;
			break;
		case 68: //derecha
			box1.velocidad.y = 0;
			box1.velocidad.x = 10;
			break;
		case 65: //izquierda
			box1.velocidad.y = 0;
			box1.velocidad.x = -10;
			break;

		default:
			break;
	}
});
function animacion() {
	window.requestAnimationFrame(animacion);

	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	box1.draw();
	box2.draw();

	box1.color = colorRandom();
	box1.posicion.x += box1.velocidad.x;
	box1.posicion.y += box1.velocidad.y;

	limites(box1);
	if (colision({ box1, box2 })) {
		box2.posicion.x = Math.floor(Math.random() * canvas.width);
		box2.posicion.y = Math.floor(Math.random() * canvas.height);
	}
}
function colorRandom() {
	let rojo = Math.floor(Math.random() * 256);
	let verde = Math.floor(Math.random() * 256);
	let azul = Math.floor(Math.random() * 256);
	// let alpha = Math.random() * 1;
	// alpha = alpha.toFixed(2);
	let color = `rgb(${rojo},${verde},${azul})`;

	return color;
}

animacion();
