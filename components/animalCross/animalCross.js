import { k5, resetEdgesColor, edges, redrawGraph } from "../../public/js/k5.js";

const graphe = document.querySelector('#graphe');
const ctx = graphe.getContext('2d');
const img1 = new Image();
img1.src = "/public/img/aborigene.png";
const img2 = new Image();
img2.src = "/public/img/chinoise.png";
const img3 = new Image();
img3.src = "/public/img/inuit.png";
const img4 = new Image();
img4.src = "/public/img/peruvien.png";
const img5 = new Image();
img5.src = "/public/img/touareg.png";
const img6 = new Image();
img6.src = "/public/img/kangourou.png";
const img7 = new Image();
img7.src = "/public/img/panda.png";
const img8 = new Image();
img8.src = "/public/img/ours-blanc.png";
const img9 = new Image();
img9.src = "/public/img/lama.png";
const img10 = new Image();
img10.src = "/public/img/dromadaire.png";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

// Intégration des images
const drawTheImage = () => {
	const positions = [
		{ x: 50, y: 0 },
		{ x: 200, y: 0 },
		{ x: 350, y: 0 },
		{ x: 500, y: 0 },
		{ x: 650, y: 0 },
		{ x: 50, y: 550 },
		{ x: 200, y: 550 },
		{ x: 350, y: 550 },
		{ x: 500, y: 550 },
		{ x: 650, y: 550 },
	];

	images.forEach((img, index) => {
		if (img.complete) {
			ctx.drawImage(img, positions[index].x, positions[index].y, 100, 140);
		} else {
			img.addEventListener("load", () => {
				ctx.drawImage(img, positions[index].x, positions[index].y, 100, 140);
			});
		}
	});
};

/* resoudre la triches possible de mettre toutes les arretes en vert */

const verificationTricherie = () => {
	let count = 0;
	edges.forEach(edge => {
		if (edge.color === "green") {
			count++;
		} 
	});
	if (count === 5) {
		validateEdges();
	} else if (count > 5) {

		swal({
			title: "Attention vous avez selectionné trop d'arretes !",
			text: "Cliquer hors de la fenêtre pour fermer",
			icon: "warning",
			buttons: ["Réessayer"],
		})
			.then((menu) => {
				if (menu) {
					window.location.href = "../../index.html";
				} else {
					resetEdgesColor();
				}
			});
	}else {
		validateEdges();
}};



// Validation des arêtes
const validateEdges = () => {
	if (edges[4].color === "green" && edges[10].color === "green" && edges[13].color === "green" && edges[17].color === "green" && edges[21].color === "green") {
		swal({
			title: "Bien joué !",
			text: "Voulez-vous rejouer ou passer à la suite ?",
			icon: "success",
			buttons: ["Rejouer", "Menu"],
		})
			.then((menu) => {
				if (menu) {
					window.location.href = "../../index.html";
				} else {
					resetEdgesColor();
				}
			});
	} else {
		swal({
			title: "Dommage !",
			text: "Voulez-vous réessayer ou passer à la suite ?",
			icon: "error",
			buttons: ["Réessayer", "Menu"],
		})
			.then((menu) => {
				if (menu) {
					window.location.href = "../../index.html";
				} else {
					resetEdgesColor();
				}
			});
	}
};

// Changement d'état des arêtes
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
			if (edge.color === "grey") {
				edge.color = "red";
			} else if (edge.color === "red") {
				edge.color = "green";
			} else if (edge.color === "green") {
				edge.color = "grey";
			}
			redrawGraph();
		}
	});
});

const checkImagesLoaded = () => {
	if (images.every(img => img.complete)) {
		k5();
	} else {
		images.forEach(img => img.addEventListener("load", () => {
			if (images.every(img => img.complete)) {
				k5();
			}
		}));
	}
};

checkImagesLoaded();
document.getElementById("recommencer").addEventListener("click", resetEdgesColor);
document.getElementById("valider").addEventListener("click", verificationTricherie);

export { drawTheImage, images};