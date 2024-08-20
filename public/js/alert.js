import { tutorial } from './tutorial.js';

const showAlert = (message, position = { top: '30%', left: '50%' }, size = { width: '300px', height: 'auto' }) => {
    const alertBox = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');

    alertMessage.textContent = message;
    alertBox.style.top = position.top;
    alertBox.style.left = position.left;
    alertBox.style.width = size.width;
    alertBox.style.height = size.height;
    alertBox.classList.remove('hidden');
}

const closeAlert = () =>{
    document.getElementById('customAlert').classList.add('hidden');
}


const alert1 = (message, position = { top: '50%', left: '50%' }, size = { width: '500px', height: 'auto' }) => {
    const alertBox = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');

    alertMessage.textContent = message;
    alertBox.style.top = position.top;
    alertBox.style.left = position.left;
    alertBox.style.width = size.width;
    alertBox.style.height = size.height;
    alertBox.classList.remove('hidden');
}

const alert2 = (message, position = { top: '50%', left: '50%' }, size = { width: '500px', height: 'auto' }) => {
	const alertBox = document.getElementById('customAlert');
	const alertMessage = document.getElementById('alertMessage');

	alertMessage.textContent = message;
	alertBox.style.top = position.top;
	alertBox.style.left = position.left;
	alertBox.style.width = size.width;
	alertBox.style.height = size.height;
	alertBox.classList.remove('hidden');
}

const alert3 = (message, position = { top: '50%', left: '50%' }, size = { width: '500px', height: 'auto' }) => {
	const alertBox = document.getElementById('customAlert');
	const alertMessage = document.getElementById('alertMessage');

	alertMessage.textContent = message;
	alertBox.style.top = position.top;
	alertBox.style.left = position.left;
	alertBox.style.width = size.width;
	alertBox.style.height = size.height;
	alertBox.classList.remove('hidden');
}


// Exemple d'utilisation
//document.getElementById('valider').addEventListener('click', () => {
//    showAlert('Votre réponse a été enregistrée.');
//});

//document.getElementById('closeAlertButton').addEventListener('click', closeAlert);
tutorial();
export { alert1, closeAlert };