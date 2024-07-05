import { circleLine, drawEdge } from "/public/js/grapheCreation.js";
import { drawTheImage } from "/public/js/ririFifiLoulou.js";

const edges = [];
const color = ["red", "blue", "green", "yellow", "purple"];
const ctx = graphe.getContext('2d');

// Crée k3,3
const k3 = () => {
	edges.length = 0; // Réinitialise les arêtes
	drawTheImage();
	circleLine(200, 250, color, 3, 200);
	circleLine(200, 450, color, 3, 200);
	for (let i = 0; i < 3; i++) {
		edges.push({ x1: 200 + 200 * i, y1: 250, x2: 200, y2: 450, color: "black" });
		edges.push({ x1: 200 + 200 * i, y1: 250, x2: 400, y2: 450, color: "black" });
		edges.push({ x1: 200 + 200 * i, y1: 250, x2: 600, y2: 450, color: "black" });
	}
	redrawGraph(); // Dessine le graphe initial
};

// Redessine le graphe avec les arêtes mises à jour
const redrawGraph = () => {
	ctx.clearRect(0, 0, graphe.width, graphe.height);
	drawTheImage();
	edges.forEach(edge => {
		drawEdge(edge.x1, edge.y1, edge.x2, edge.y2, edge.color);
	});
	circleLine(200, 250, color, 3, 200);
	circleLine(200, 450, color, 3, 200);
};



// Redessine le graphe après la réinitialisation des couleurs des arêtes
const resetEdgesColor = () => {
	edges.forEach(edge => {
		edge.color = "black";
	});
	redrawGraph();
};


export { k3, resetEdgesColor,edges, redrawGraph };