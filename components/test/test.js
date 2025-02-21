import { circleLine, drawTransformedEdge, quotientWidth, drawTransformedCircle } from "../../public/js/grapheCreation.js";
//import json from "../../components/test/data.Json";

const graphe = document.querySelector('#graphe');
const ctx = graphe.getContext('2d');
const edgesTab = [];




const redrawGraph = () => {

	fetch('./data.json')
		.then(response => {
			if (!response.ok) {
				throw new Error('Erreur lors du chargement du fichier JSON');
			}
			return response.json();
		})
		.then(data => {
			ctx.clearRect(0, 0, graphe.width, graphe.height);
			let node = data.graph.nodes;
			let edges = data.graph.nodes.edges;
			const edgeCount = edges ? edges.length : 0;
			let j = 0;
			for (let i in node) {

				console.log(i);
				const currentNode = node[i];
				let img = new Image();
				img.src = "../../public/img/" + currentNode.metadata.decoration.image;

				drawTransformedCircle(currentNode.metadata.x, currentNode.metadata.y, "lightgrey");

				img.onload = () =>{
					ctx.drawImage(img, currentNode.metadata.x*quotientWidth - currentNode.metadata.decoration.offsetX*quotientWidth, currentNode.metadata.y*quotientWidth - currentNode.metadata.decoration.offsetY*quotientWidth, 110*quotientWidth, 150*quotientWidth);
				};

				
				while (edges[j] != undefined) {

					if (edgesTab.length <= edgeCount) {

						edgesTab.push({ x1: node[edges[j].source].metadata.x, y1: node[edges[j].source].metadata.y, x2: node[edges[j].target].metadata.x, y2: node[edges[j].target].metadata.y, color: "grey", largeur: 4 , win: edges[j].directed});
						drawTransformedEdge(edgesTab[j].x1, edgesTab[j].y1, edgesTab[j].x2, edgesTab[j].y2, edgesTab[j].color, edgesTab[j].largeur);

					}else {
						drawTransformedEdge(edgesTab[j].x1, edgesTab[j].y1, edgesTab[j].x2, edgesTab[j].y2, edgesTab[j].color, edgesTab[j].largeur);
					}
					j++;
				}	
					
			}	
		})
		.catch(error => {
			console.error('Erreur:', error);
		});
};



// Changement d'état des arêtes
graphe.addEventListener("click", (event) => {
	const clickX = (event.clientX - graphe.offsetLeft)/quotientWidth;
	const clickY = (event.clientY - graphe.offsetTop)/quotientWidth;
	
	edgesTab.forEach(edge => {
		let { x1, y1, x2, y2 } = edge;
		const distanceToStart = Math.sqrt((clickX - x1) ** 2 + (clickY - y1) ** 2);
		const distanceToEnd = Math.sqrt((clickX - x2) ** 2 + (clickY - y2) ** 2);
		const edgeLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);	

		// Vérifie si le point cliqué est proche de l'arête
		if (Math.abs(distanceToStart + distanceToEnd - edgeLength) < 0.1 ) {
			if (edge.color === "grey") {
				edge.color = "green";
				edge.largeur = 6;
			} else if (edge.color === "red") {
				edge.color = "grey";
				edge.largeur = 4;
			} else if (edge.color === "green") {
				edge.color = "red";
			}
			redrawGraph();
		}
	});
});




//const validateEdges = () => {
   

//    const allAuthorizedEdgesGreen = authorizedGreenEdges.every(index => edges[index].color === "green");

//    if (allAuthorizedEdgesGreen) {
//        swal({
//            title: "Bien joué !",
//            text: "Voulez-vous rejouer ou passer à la suite ?",
//            icon: "success",
//            buttons: ["Rejouer", "Menu"],
//        })
//        .then((menu) => {
//            if (menu) {
//				updateInfo(0, 1);
//                window.location.href = "../../index.html";
//            } else {
//				updateInfo(0, 1);
//            }
//        });

		
//    } else {
//        swal({
//            title: "Dommage !",
//            text: "Voulez-vous réessayer ou passer à la suite ?",
//            icon: "error",
//            buttons: ["Réessayer", "Menu"],
//        })
//        .then((menu) => {
//            if (menu) {
//                window.location.href = "../../index.html";
//            } else {
//                resetEdgesColor();
//            }
//        });
//    }
//};





graphe.width = (window.innerWidth / 2);
graphe.height = (window.innerHeight / 1.1);

const resizeCanvas = () => {

	let quotientWidth = window.innerWidth / 1500;
	graphe.width = (window.innerWidth / 2);
	graphe.height = (window.innerHeight / 1.1);

	redrawGraph();
};
resizeCanvas();	

window.addEventListener("resize", resizeCanvas);