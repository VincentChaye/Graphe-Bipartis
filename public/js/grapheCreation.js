const ctx = graphe.getContext('2d');

let matrix = ctx.getTransform();	
let quotientWidth = window.innerWidth / 1500;
let circle = 0;


// Crée un sommet 
const drawCircle = (x, y, color) => {
	ctx.beginPath();
	ctx.lineWidth = "2";
	ctx.fillStyle = color;
	ctx.arc(x, y, 20*quotientWidth, 0, 2 * Math.PI);
	ctx.strokeStyle = "black";
	ctx.setLineDash([]);
	ctx.stroke();
	ctx.fill();
};

// Ligne de sommets
const circleLine = (x, y, color, k, spaceBetween, rotation) => {
	for (let i = 0; i < k; i++) {
		drawTransformedCircle(x + spaceBetween * i, y + rotation * i, color[i]);
	}
};

// Dessine une arête
const drawEdge = (x1, y1, x2, y2, color, largeur) => {
	ctx.beginPath();

	if (color === "grey") {
		ctx.setLineDash([8, 5]);
		ctx.lineWidth = "4";
	} else if (color === "red") {
		ctx.setLineDash([]);
		ctx.lineWidth = "5";
	} else if (color === "green") {
		ctx.setLineDash([]);
		ctx.lineWidth = "6";
	}

	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.strokeStyle = color;
	ctx.lineWidth = largeur*quotientWidth;
	ctx.stroke();
};

const transformPoint = (x, y, matrix) => {
	return {
		x: x * quotientWidth + y * matrix.c + matrix.e,
		y: x * matrix.b + y * quotientWidth + matrix.f
	};
};

const drawTransformedCircle = (x, y, color) => {
	const point = transformPoint(x, y, matrix);
	drawCircle(point.x, point.y, color);
	circle++;
};

const drawTransformedEdge = (x1, y1, x2, y2, color, largeur) => {
	const point1 = transformPoint(x1, y1, matrix);
	const point2 = transformPoint(x2, y2, matrix);
	drawEdge(point1.x, point1.y, point2.x, point2.y, color, largeur);
};

const resizeSize = () => {

	if (quotientWidth >= '0.90'){
		quotientWidth = '0.89';

	}else if (quotientWidth <= '0.40'){
		quotientWidth = '0.41';

	}else{
		quotientWidth = window.innerWidth / 1500;
	}

	matrix = ctx.getTransform();
};


resizeSize();
window.addEventListener("resize", resizeSize);



export { circleLine, drawEdge, quotientWidth, drawTransformedEdge, 	resizeSize, drawCircle }; 