import { k3, resetEdgesColor,edges,redrawGraph } from "/public/js/k3.js";


const graphe = document.querySelector('#graphe');
const ctx = graphe.getContext('2d');
const img1 = new Image();
img1.src = "/public/picture/riri.png";
const img2 = new Image();
img2.src = "/public/picture/fifi.png";
const img3 = new Image();
img3.src = "/public/picture/loulou.png";
const img4 = new Image();
img4.src = "/public/picture/chat.png";
const img5 = new Image();
img5.src = "/public/picture/hamster.png";
const img6 = new Image();
img6.src = "/public/picture/peroquet.png";
const images = [img1, img2, img3, img4, img5, img6];


// Intégration des images
const drawTheImage = () => {
	const positions = [
		{ x: 145, y: 50 },
		{ x: 345, y: 50 },
		{ x: 545, y: 50 },
		{ x: 145, y: 475 },
		{ x: 345, y: 475 },
		{ x: 545, y: 475 }
	];

	images.forEach((img, index) => {
		if (img.complete) {
			ctx.drawImage(img, positions[index].x, positions[index].y, 150, 190);
		} else {
			img.addEventListener("load", () => {
				ctx.drawImage(img, positions[index].x, positions[index].y, 150, 190);
			});
		}
	});
};



// Validation des arrêtes 
const validateEdges = () => {
	if (edges[2].color === "green" && edges[3].color === "green" && edges[7].color === "green") {
		swal({
			title: "Bien joué !",
			text: "Voulez-vous rejouer ou passer à la suite ?",
			icon: "success",
			buttons: ["Rejouer", "Menu"],
		  })
		  .then((menu) => {
			if (menu) {
			  window.location.href = "/public/html/menu.html";
			} else {
				resetEdgesColor();
			}
		  });
	}
	else {
		alert("PERDU ce n'est pas la bonne réponse !");
	}
};


//changement d'état des arêtes
graphe.addEventListener("click", (event) => {
	const clickX = event.clientX - graphe.offsetLeft;
	const clickY = event.clientY - graphe.offsetTop;

	edges.forEach(edge => {
		const { x1, y1, x2, y2 } = edge;
		const distanceToStart = Math.sqrt((clickX - x1) ** 2 + (clickY - y1) ** 2);
		const distanceToEnd = Math.sqrt((clickX - x2) ** 2 + (clickY - y2) ** 2);
		const edgeLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

		// Vérifie si le point cliqué est proche de l'arête
		if (Math.abs(distanceToStart + distanceToEnd - edgeLength) < 1) {
			if (edge.color === "black") {
				edge.color = "red";
			} else if (edge.color === "red") {
				edge.color = "green";
			} else if (edge.color === "green") {
				edge.color = "black";
			}
			redrawGraph();
		}
	});
});

images.forEach(img => img.addEventListener("load", k3));
document.getElementById("recommencer").addEventListener("click", resetEdgesColor);
document.getElementById("valider").addEventListener("click", validateEdges);


export { drawTheImage};