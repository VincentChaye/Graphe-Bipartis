import {alert1,alert2, alert3, closeAlert} from "../../public/js/alert.js";

const tutorial = () => {

	alert1('Bienvenue sur notre site de résolution de problèmes de graphes ! \n\n Pour commencer, cliquez sur le bouton "Commencer" pour afficher le graphe.', { top: '50%', left: '50%' }, { width: '500px', height: 'auto' });
	
	//document.getElementById('closeAlertButton').addEventListener('click', () => {
	//	closeAlert();
	//});

	//alert2('Bienvenue sur notre site de résolution de problèmes de graphes ! \n\n Pour commencer, cliquez sur le bouton "Commencer" pour afficher le graphe.', { top: '50%', left: '50%' }, { width: '500px', height: 'auto' });
};

export { tutorial };