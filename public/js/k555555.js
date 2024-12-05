import { circleLine, drawEdge, drawTransformedEdge, quotientWidth} from "/public/js/grapheCreation.js";	

const edges = [];
const color = ["lightgrey", "lightgrey", "lightgrey", "lightgrey", "lightgrey"];
const ctx = graphe.getContext('2d');

let drawTheImage;

const importDrawImageFunction = async () => {
	const currentPage = window.location.pathname;

	if (currentPage.includes('motos')) {
		const module = await import('../../components/motos/motos.js');
		drawTheImage = module.drawTheImage;	

	} else if (currentPage.includes('hackers')) {
		const module = await import('../../components/hackers/hackers.js');
		drawTheImage = module.drawTheImage;
	
	} else {
		console.error('No matching page for drawTheImage function import');
	}
};

const k555555 = async () => {
	await importDrawImageFunction();2

	edges.length = 0;

	circleLine(150, 150, color, 5, 65,-25);
	circleLine(500, 50, color, 5, 65,25);
	circleLine(100, 250, color, 5, 0,70);
	circleLine(800, 250, color, 5, 0,70);
	circleLine(500, 720, color, 5, 65,-25);
	circleLine(150, 620, color, 5, 65,25);


//redrawGraph();
}; 

const redrawGraph = () => {
	ctx.clearRect(0, 0, graphe.width, graphe.height);
	if (drawTheImage) drawTheImage(); 
	edges.forEach(edge => {
		drawTransformedEdge(edge.x1, edge.y1, edge.x2, edge.y2, edge.color, edge.largeur);
	});
	
	circleLine(150, 150, color, 5, 65,-25);
	circleLine(500, 50, color, 5, 65,25);
	circleLine(100, 250, color, 5, 0,70);
	circleLine(800, 250, color, 5, 0,70);
	circleLine(500, 720, color, 5, 65,-25);
	circleLine(150, 620, color, 5, 65,25);
};



k555555();

export {k555555};