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
			
			let img = new Image();
			img.src = "../../public/img/" + node[i].metadata.decoration.image;
			console.log(i);
			drawTransformedCircle(node[i].metadata.x, node[i].metadata.y, "lightgrey");
			img.onload = () =>{
				console.log(node[i].metadata.x);
				ctx.drawImage(img, node[i].metadata.x, node[i].metadata.y);
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