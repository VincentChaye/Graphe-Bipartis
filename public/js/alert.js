const alert1 = (message, position = { top: '50%', left: '50%' }, size = { width: '500px', height: 'auto' }) => {
    const alertBox = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');

    // Permet de placer du HTML pour le titre et le texte
    alertMessage.innerHTML = message;
    alertBox.style.top = position.top;
    alertBox.style.left = position.left;
    alertBox.style.width = size.width;
    alertBox.style.height = size.height;
    alertBox.classList.remove('hidden');
}

let memory = 0;

const closeAlert = () => {
    document.getElementById('customAlert').classList.add('hidden');
}

const alert2 = () => {
    const alertBox = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');

    alertMessage.textContent = 'caca';
    alertBox.style.top = '10%';
    alertBox.style.left = '20%';
    alertBox.style.width = '500px';
    alertBox.style.height = 'auto';

    memory = 1;
}

const alert3 = () => {
    const alertBox = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');

    alertMessage.textContent = 'pipi';
    alertBox.style.top = '10%';
    alertBox.style.left = '80%';
    alertBox.style.width = '500px';
    alertBox.style.height = 'auto';     
    memory = 2;
}

const handleAlert = () => {
    if (memory === 0) {
        alert2();
    } else if (memory === 1) {
        alert3();
    } else if (memory === 2) {
        closeAlert();
    }
}
// Exemple d'utilisation avec un titre et un texte

const title = '<h2 style="font-family: Arial, sans-serif; font-weight: bold; font-size: 50px; margin-bottom: 10px;">Bienvenue</h2>';
const text = '<p style="font-family: Verdana, sans-serif; font-size: 20px; padding-top: 50px;  ">Nous allons ensemble apprendre à résoudre des problèmes logiques en utilisant des graphes !</p>';
const image = '<img src="../../public/img/mascotte.png" style="width: 250px; height: 275px; object-fit: cover; position: absolute; top: 0; left: 0; z-index: -1;">';
alert1(title + image + text, { top: '50%', left: '50%' }, { width: '800px', height: '500px' });

document.getElementById('closeAlertButton').addEventListener('click', handleAlert);
export { alert1, closeAlert };
