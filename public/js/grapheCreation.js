const ctx = graphe.getContext('2d');


// Crée un sommet 
const drawCircle = (x, y, color) => {
	ctx.beginPath();
	ctx.lineWidth = "2";
	ctx.fillStyle = color;
	ctx.arc(x, y, 20, 0, 2 * Math.PI);
	ctx.strokeStyle = "black";
	ctx.setLineDash([]);
	ctx.stroke();
	ctx.fill();
};

// Ligne de sommets
const circleLine = (x, y, color, k, spaceBetween, rotation) => {
	for (let i = 0; i < k; i++) {
		drawCircle(x + spaceBetween * i, y + rotation * i, color[i]);
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
	ctx.lineWidth = largeur;
	ctx.stroke();
};





const resizeCanvas = () => {
	const { width, height } = graphe.getBoundingClientRect();
	graphe.width = width;
	graphe.height = height;

	// Reset the transformation matrix to the identity matrix
	ctx.setTransform(1, 0, 0, 1, 0, 0);

	// Scale the context to match the new canvas size
	const scaleX = width / graphe.offsetWidth;
	const scaleY = height / graphe.offsetHeight;
	ctx.scale(scaleX, scaleY);
};

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial call to set up the canvas size



export { circleLine, drawEdge };