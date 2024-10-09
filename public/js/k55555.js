//LE NIVEAU DE L'ENFER !

import { circleLine, drawEdge } from "/public/js/grapheCreation.js";

const edges = [];
const color = ["lightgrey", "lightgrey", "lightgrey", "lightgrey", "lightgrey"];
const ctx = graphe.getContext('2d');

let drawTheImage;

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
	redrawGraph(); // Dessine le graphe initial
};

const redrawGraph = () => {
	ctx.clearRect(0, 0, graphe.width, graphe.height);
	if (drawTheImage) drawTheImage(); 
	edges.forEach(edge => {
		drawEdge(edge.x1, edge.y1, edge.x2, edge.y2, edge.color, edge.largeur);
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