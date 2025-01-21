import { circleLine, drawTransformedEdge, drawTransformedCircle } from "../../public/js/grapheCreation.js";
//import json from "../../components/test/data.Json";

const graphe = document.querySelector('#graphe');
const ctx = graphe.getContext('2d');


fetch('./data.json')
	.then(response => {
		if (!response.ok) {
			throw new Error('Erreur lors du chargement du fichier JSON');
		}
		return response.json();
	})
	.then(data => {
		let node = data.graph.nodes;
		let edges = data.graph.nodes.edges;
		
		let i = 0;
		for (let i in node) {

			if (!node[i] || !node[i].metadata || !node[i].metadata.decoration || !node[i].metadata.decoration.image) {
				console.error(`Erreur : Le nœud à l'index ${i} ou ses propriétés sont manquantes`, node[i]);
				continue; // Passer au nœud suivant si celui-ci est invalide
			}

			
			const currentNode = node[i];
			let img = new Image();
			img.src = "../../public/img/" + currentNode.metadata.decoration.image;

			drawTransformedCircle(currentNode.metadata.x, currentNode.metadata.y, "lightgrey");

			img.onload = () =>{
				console.log(node[i].metadata.x);
				ctx.drawImage(img, currentNode.metadata.x*quotientWidth - currentNode.metadata.decoration.offsetX*quotientWidth, currentNode.metadata.y*quotientWidth - currentNode.metadata.decoration.offsetY*quotientWidth, 110*quotientWidth, 150*quotientWidth);
			};


			while (edges[i] != undefined) {
				drawTransformedEdge(node[edges[i].source].metadata.x, node[edges[i].source].metadata.y, node[edges[i].target].metadata.x, node[edges[i].target].metadata.y, "dark", 2);
				i++;
			}	
		}	
	})
	.catch(error => {
		console.error('Erreur:', error);
	});

graphe.width = (window.innerWidth / 2);
graphe.height = (window.innerHeight / 1.1);

const resizeCanvas = () => {

	let quotientWidth = window.innerWidth / 1500;
	graphe.width = (window.innerWidth / 2);
	graphe.height = (window.innerHeight / 1.1);

	//redrawGraph();
	//drawTheImage();
};

resizeCanvas();
window.addEventListener("resize", resizeCanvas);