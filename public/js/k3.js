import { circleLine, drawEdge } from "/public/js/grapheCreation.js";

const edges = [];
const color = ["lightgrey", "lightgrey", "lightgrey", "lightgrey", "lightgrey"];
const ctx = graphe.getContext('2d');

let drawTheImage; 

// Determine the current page and dynamically import the appropriate module

const importDrawImageFunction = async () => {
    const currentPage = window.location.pathname; 

    if (currentPage.includes('ririFifiLoulou')) {
        const module = await import('../../components/ririFifiLoulou/ririFifiLoulou.js');
        drawTheImage = module.drawTheImage;
    } else if (currentPage.includes('niche')) {
        const module = await import('../../components/niche/niche.js');
        drawTheImage = module.drawTheImage;
    } else if (currentPage.includes('tutorial')) {
        const module = await import('../../components/tutorial/tutorial.js');
        drawTheImage = module.drawTheImage;
    } else {
        console.error('No matching page for drawTheImage function import');
    }
};

// Crée k3,3
const k3 = async () => {
    await importDrawImageFunction(); 
    if (!drawTheImage) return; 

    edges.length = 0;
    drawTheImage();
    circleLine(200, 250, color, 3, 200,0);
    circleLine(200, 450, color, 3, 200,0);
    for (let i = 0; i < 3; i++) {
        edges.push({ x1: 200 + 200 * i, y1: 250, x2: 200, y2: 450, color: "grey"});
        edges.push({ x1: 200 + 200 * i, y1: 250, x2: 400, y2: 450, color: "grey"});
        edges.push({ x1: 200 + 200 * i, y1: 250, x2: 600, y2: 450, color: "grey"});
    }
    redrawGraph(); 
};


const redrawGraph = () => {
    ctx.clearRect(0, 0, graphe.width, graphe.height);
    if (drawTheImage) drawTheImage(); 
    edges.forEach(edge => {
        drawTransformedEdge(edge.x1, edge.y1, edge.x2, edge.y2, edge.color, edge.largeur);
    });
    circleLine(200, 250, color, 3, 200,0);
    circleLine(200, 450, color, 3, 200,0);
};

// Redessine le graphe après la réinitialisation des couleurs des arêtes

const resetEdgesColor = () => {
    edges.forEach(edge => {
        edge.color = "grey";
        edge.largeur = 4;
    });
    redrawGraph();
};






export { k3, resetEdgesColor, edges, redrawGraph };
