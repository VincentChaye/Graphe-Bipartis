import { circleLine, drawEdge, drawTransformedEdge, quotientWidth} from "/public/js/grapheCreation.js";

const edges = [];
const color = ["red", "blue", "green", "yellow", "purple"];
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



const tripartie = async () => {
	await importDrawImageFunction(); 
	if (!drawTheImage) return;

	edges.length = 0; 
	drawTheImage();
	
	circleLine(250, 100, color, 3, 150,0);
	circleLine(100, 350, color, 3, 50,120);
	circleLine(600, 600, color, 3, 50,-120);

	for (let i = 0; i < 3; i++) {
        edges.push({ x1: 250 + 150 * i, y1: 100, x2: 100, y2: 350, color: "grey"  });
        edges.push({ x1: 250 + 150 * i, y1: 100, x2: 150, y2: 475, color: "grey"  });
        edges.push({ x1: 250 + 150 * i, y1: 100, x2: 200, y2: 600, color: "grey"  });
    }
	for (let i = 0; i < 3; i++) {
        edges.push({ x1: 250 + 150 * i, y1: 100, x2: 700, y2: 350, color: "grey"  });
        edges.push({ x1: 250 + 150 * i, y1: 100, x2: 650, y2: 475, color: "grey"  });
        edges.push({ x1: 250 + 150 * i, y1: 100, x2: 600, y2: 600, color: "grey" });
    }

	for (let i = 0; i < 3; i++) {
        edges.push({ x1: 100 + 50 * i, y1: 350 + 125 * i, x2: 700, y2: 350, color: "grey" });
        edges.push({ x1: 100 + 50 * i, y1: 350 + 125 * i, x2: 650, y2: 475, color: "grey" });
        edges.push({ x1: 100 + 50 * i, y1: 350 + 125 * i, x2: 600, y2: 600, color: "grey" });
    }
	redrawGraph(); 
};

const redrawGraph = () => {
	ctx.clearRect(0, 0, graphe.width, graphe.height);
	if (drawTheImage) drawTheImage(); 
	edges.forEach(edge => {
		drawTransformedEdge(edge.x1, edge.y1, edge.x2, edge.y2, edge.color, edge.largeur);
	});
	
	circleLine(250, 100, color, 3, 150,0);
	circleLine(100, 350, color, 3, 50,120);
	circleLine(600, 600, color, 3, 50,-120);
};


// Redessine le graphe après la réinitialisation des couleurs des arêtes
const resetEdgesColor = () => {
	edges.forEach(edge => {
		edge.color = "grey";
	});
	redrawGraph();
};

export { tripartie, resetEdgesColor, edges, redrawGraph };