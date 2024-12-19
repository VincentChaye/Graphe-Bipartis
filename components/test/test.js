import { circleLine, drawEdge, drawTransformedCircle } from "../../public/js/grapheCreation.js";
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
		let nbnode = node[0].metadata.nbnode;
		for (let i = 0; i < nbnode; i++) {
			drawTransformedCircle(node[i].metadata.x, node[i].metadata.y, "lightgrey");
		}
		

	})
	.catch(error => {
		console.error('Erreur:', error);
	});

	graphe.width = (window.innerWidth/2);
	graphe.height = (window.innerHeight/1.1);
	
	const resizeCanvas = () => {
	
		let quotientWidth = window.innerWidth / 1500;
		graphe.width = (window.innerWidth/2);
		graphe.height = (window.innerHeight/1.1);	
	
		console.log(graphe.width, graphe.height);

		//redrawGraph();
		//drawTheImage();
	};
	
	resizeCanvas();
	window.addEventListener("resize", resizeCanvas);