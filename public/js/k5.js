import { circleLine, drawEdge, drawTransformedEdge, quotientWidth } from "/public/js/grapheCreation.js";

const edges = [];
let color = ["lightgrey", "lightgrey", "lightgrey", "lightgrey", "lightgrey"];
let color1 = ["red", "blue", "green", "yellow", "purple"];

const ctx = graphe.getContext('2d');

let drawTheImage;

const importDrawImageFunction = async () => {
	const currentPage = window.location.pathname;

	if (currentPage.includes('animalCross')) {
		const module = await import('../../components/animalCross/animalCross.js');
		drawTheImage = module.drawTheImage;

	} else if (currentPage.includes('projecteurs')) {
		const module = await import('../../components/projecteurs/projecteurs.js');
		drawTheImage = module.drawTheImage;
		color = color1;
	
	} else if (currentPage.includes('asterix')) {
		const module = await import('../../components/Asterix/asterix.js');
		drawTheImage = module.drawTheImage;

	} else {
		console.error('No matching page for drawTheImage function import');
	}
};


const k5 = async () => {
	await importDrawImageFunction(); 
	if (!drawTheImage) return;
	edges.length = 0; 
	drawTheImage();
	circleLine(125, 175, color, 5, 150,0);
	circleLine(100, 550, color, 5, 150,0);
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 5; j++) {
			edges.push({ x1: 100 + 150 * i, y1: 175, x2: 100 + 150 * j, y2: 525, color: "grey"});
		}
	}
	redrawGraph();
};

const redrawGraph = () => {
	ctx.clearRect(0, 0, graphe.width, graphe.height);
	if (drawTheImage) drawTheImage(); 
	edges.forEach(edge => {
		drawTransformedEdge(edge.x1, edge.y1, edge.x2, edge.y2, edge.color, edge.largeur);
	});
	circleLine(100, 175, color, 5, 150,0);
	circleLine(100, 525, color, 5, 150,0);
};

// Redessine le graphe après la réinitialisation des couleurs des arêtes
const resetEdgesColor = () => {
	edges.forEach(edge => {
		edge.color = "grey";
	});
	redrawGraph();
};

export { k5, resetEdgesColor, edges, redrawGraph,color };
