import { drawTransformedEdge, drawTransformedCircle, quotientWidth } from "../../public/js/grapheCreation.js";

const graphe = document.querySelector('#graphe');
const ctx = graphe.getContext('2d');
let edgesTab = [];
let nodesData = {};

// Fonction de redessin du graphe
const redrawGraph = () => {
    ctx.clearRect(0, 0, graphe.width, graphe.height);
    // Si les données n'ont pas encore été chargées, on les récupère
    if(Object.keys(nodesData).length === 0) {
        fetch('./data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement du fichier JSON');
                }
                return response.json();
            })
            .then(data => {
                nodesData = data.graph.nodes;
                const edgesFromJSON = nodesData.edges;
                // Filtrer les clés numériques pour les nœuds
                const nodeKeys = Object.keys(nodesData).filter(key => !isNaN(Number(key)));
                // Dessiner les nœuds
                nodeKeys.forEach(key => {
                    const currentNode = nodesData[key];
                    let img = new Image();
                    // Veillez à bien retirer d'éventuels espaces superflus
                    img.src = "../../public/img/" + currentNode.metadata.decoration.image.trim();
                    drawTransformedCircle(currentNode.metadata.x, currentNode.metadata.y, "lightgrey");
                    img.onload = () => {
                        ctx.drawImage(
                            img,
                            currentNode.metadata.x * quotientWidth - currentNode.metadata.decoration.offsetX * quotientWidth,
                            currentNode.metadata.y * quotientWidth - currentNode.metadata.decoration.offsetY * quotientWidth,
                            110 * quotientWidth,
                            150 * quotientWidth
                        );
                    };
                });
                // Constituer le tableau des arêtes s'il est vide
                if(edgesTab.length === 0 && edgesFromJSON) {
                    edgesFromJSON.forEach(edge => {
                        const sourceNode = nodesData[edge.source];
                        const targetNode = nodesData[edge.target];
                        edgesTab.push({ 
                            x1: sourceNode.metadata.x, 
                            y1: sourceNode.metadata.y, 
                            x2: targetNode.metadata.x, 
                            y2: targetNode.metadata.y, 
                            color: "grey", 
                            largeur: 4, 
                            win: edge.directed // critère gagnant
                        });
                    });
                }
                // Dessiner les arêtes
                edgesTab.forEach(edge => {
                    drawTransformedEdge(edge.x1, edge.y1, edge.x2, edge.y2, edge.color, edge.largeur);
                });
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
    } else {
        // Redessiner en utilisant les données déjà chargées
        const nodeKeys = Object.keys(nodesData).filter(key => !isNaN(Number(key)));
        nodeKeys.forEach(key => {
            const currentNode = nodesData[key];
            let img = new Image();
            img.src = "../../public/img/" + currentNode.metadata.decoration.image.trim();
            drawTransformedCircle(currentNode.metadata.x, currentNode.metadata.y, "lightgrey");
            img.onload = () => {
                ctx.drawImage(
                    img,
                    currentNode.metadata.x * quotientWidth - currentNode.metadata.decoration.offsetX * quotientWidth,
                    currentNode.metadata.y * quotientWidth - currentNode.metadata.decoration.offsetY * quotientWidth,
                    110 * quotientWidth,
                    150 * quotientWidth
                );
            };
        });
        edgesTab.forEach(edge => {
            drawTransformedEdge(edge.x1, edge.y1, edge.x2, edge.y2, edge.color, edge.largeur);
        });
    }
};

// Réinitialiser les arêtes (bouton "Recommencer")
const resetEdgesColor = () => {
    edgesTab.forEach(edge => {
        edge.color = "grey";
        edge.largeur = 4;
    });
    redrawGraph();
};

// Validation du coup joué (bouton "Valider")
// Pour chaque arête, si elle doit être active (win === true), alors sa couleur doit être "green"
// et pour les autres, la couleur ne doit pas être "green"
const validateEdges = () => {
    // Pour chaque arête, si directed (win) est true, elle doit être verte
    const allCorrect = edgesTab.every(edge => {
        if (edge.win === true) {
            return edge.color === "green";
        } else {
            return edge.color !== "green";
        }
    });

    if (allCorrect) {
        swal({
            title: "Bien joué !",
            text: "Voulez-vous rejouer ou passer à la suite ?",
            icon: "success",
            buttons: ["Rejouer", "Menu"],
        })
        .then((menu) => {
            if (menu) {
                window.location.href = "../../index.html";
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


// Modification de l'état des arêtes au clic sur le canvas
graphe.addEventListener("click", (event) => {
    const rect = graphe.getBoundingClientRect();
    const clickX = (event.clientX - rect.left) / quotientWidth;
    const clickY = (event.clientY - rect.top) / quotientWidth;
    
    edgesTab.forEach(edge => {
        const { x1, y1, x2, y2 } = edge;
        const distanceToStart = Math.hypot(clickX - x1, clickY - y1);
        const distanceToEnd = Math.hypot(clickX - x2, clickY - y2);
        const edgeLength = Math.hypot(x2 - x1, y2 - y1);
        // Vérifier si le clic est suffisamment proche de l'arête
        if (Math.abs(distanceToStart + distanceToEnd - edgeLength) < 0.1) {
            if (edge.color === "grey") {
                edge.color = "green";
                edge.largeur = 6;
            } else if (edge.color === "green") {
                edge.color = "red";
                edge.largeur = 5;
            } else if (edge.color === "red") {
                edge.color = "grey";
                edge.largeur = 4;
            }
            redrawGraph();
        }
    });
});

// Gestion de la taille du canvas
const setCanvasSize = () => {
    graphe.width = window.innerWidth / 2;
    graphe.height = window.innerHeight / 1.1;
    redrawGraph();
};

setCanvasSize();
window.addEventListener("resize", setCanvasSize);

// Événements sur les boutons
document.getElementById("valider").addEventListener("click", validateEdges);
document.getElementById("recommencer").addEventListener("click", resetEdgesColor);
document.getElementById("menu").addEventListener("click", () => {
    window.location.href = "../../index.html";
});
