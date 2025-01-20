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
		let edges = data.graph.nodes.edges;
		let nbnode = node[0].metadata.nbnode;
		for (let i in node) {
			console.log(i);
			drawTransformedCircle(node[i].metadata.x, node[i].metadata.y, "lightgrey");
			console.log(`Node ${i} : x = ${node[i].metadata.x}, y = ${node[i].metadata.y}`);
			//console.log(data.graph.nodes.edges);
			


		}

		for(let i in edges) {
			drawEdge(edges[i].source.x, edges[i].source.y, edges[i].target.x, edges[i].target.y, "grey", 2);
			console.log(`Edge ${i} : source = ${edges[i].source}, target = ${edges[i].target}`);
		}


/// TESTS


function traverseEdges(jsonData) {
	const edges = jsonData.graph.nodes.edges;
	edges.forEach(edge => {
		console.log(`Source: ${edge.source}, Target: ${edge.target}, Directed: ${edge.directed}`);
		if (edge.metadata && edge.metadata.decoration) {
			console.log(`Decoration Text: ${edge.metadata.decoration.text}, OffsetY: ${edge.metadata.decoration.offsetY}`);
		}
	});
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