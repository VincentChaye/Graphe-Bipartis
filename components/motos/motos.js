import { tripartie, resetEdgesColor, edges, redrawGraph } from "../../public/js/tripartie.js";

const graphe = document.querySelector('#graphe');
const ctx = graphe.getContext('2d');

const img1 = new Image();
img1.src = "/public/img/andre.png";
const img2 = new Image();
img2.src = "/public/img/bernard.png";
const img3 = new Image();
img3.src = "/public/img/claude.png";
const img4 = new Image();
img4.src = "/public/img/casqueAndre.png";
const img5 = new Image();
img5.src = "/public/img/casqueBernard.png";
const img6 = new Image();
img6.src = "/public/img/casqueClaude.png";
const img7 = new Image();
img7.src = "/public/img/motoClaude.png";
const img8 = new Image();
img8.src = "/public/img/motoBernard.png";
const img9 = new Image();
img9.src = "/public/img/motoAndre.png";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9	];

// Intégration des images
const drawTheImage = () => {
	const positions = [
		{ x: 225, y: 0 },
		{ x: 375, y: 0 },
		{ x: 525, y: 0 },
		{ x: 0, y: 325 },
		{ x: 50, y: 450 },
		{ x: 100, y: 575 },
		{ x: 725, y: 325 },
		{ x: 690, y: 450 },
		{ x: 640, y: 575 },
	];

	images.forEach((img, index) => {
		if (img.complete) {
			ctx.drawImage(img, positions[index].x, positions[index].y, 80, 100);
		} else {
			img.addEventListener("load", () => {
				ctx.drawImage(img, positions[index].x, positions[index].y, 80, 100);
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
	if (count === 9) {
		validateEdges();
	} else if (count > 9) {

		swal({
			title: "Attention vous avez selectionné trop d'arêtes !",
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
	if (edges[2].color === "green" && edges[3].color === "green" && edges[7].color === "green" && edges[10].color === "green" && edges[12].color === "green" && edges[17].color === "green" && edges[18].color === "green" && edges[23].color === "green" && edges[25].color === "green") {
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
	
	}else {
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
		if (Math.abs(distanceToStart + distanceToEnd - edgeLength) < 0.1) {
			if (edge.color === "grey") {
				edge.color = "green";
			} else if (edge.color === "red") {
				edge.color = "grey";
			} else if (edge.color === "green") {
				edge.color = "red";
			}
			redrawGraph();
		}
	});
});

const checkImagesLoaded = () => {
	if (images.every(img => img.complete)) {
		tripartie();
	} else {
		images.forEach(img => img.addEventListener("load", () => {
			if (images.every(img => img.complete)) {
				tripartie();
			}
		}));
	}
};


const retourMenu = () => {
	swal({
		title:"Voulez-vous retourner au Menu ?",
		icon: "warning",
		buttons: ["Non", "Oui"],
	})
	.then((menu) => {
		if (menu) {
			window.location.href = "../../index.html";
		} else {
		}
	});
};


checkImagesLoaded();
document.getElementById("recommencer").addEventListener("click", resetEdgesColor);
document.getElementById("valider").addEventListener("click", verificationTricherie);
document.getElementById("menu").addEventListener("click", retourMenu);
console.log(edges);

export {  drawTheImage,  images};
