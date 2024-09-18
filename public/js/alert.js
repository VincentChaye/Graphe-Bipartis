let alertStep = 1;


const alert0 = (message, position = { top: '50%', left: '50%' }, size = { width: '500px', height: 'auto' }) => {
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

const alert2 = (message, position = { top: '50%', left: '50%' }, size = { width: '500px', height: 'auto' }) => {
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


const handleNextAlert = () => {
    if (alertStep === 1) {
        const title = '<h2 style="font-family: Arial, sans-serif; font-weight: bold; font-size: 50px; margin-bottom: 10px;">Bienvenue</h2>';
        const text = '<p style="font-family: Verdana, sans-serif; font-size: 20px; padding-top: 50px;  ">Nous allons ensemble apprendre à résoudre des problèmes logiques en utilisant des graphes !</p>';
        alert1(title  + text, { top: '50%', left: '50%' }, { width: '800px', height: '500px' }); 
        localStorage.setItem('Tutorial1', 'true');
    } else if (alertStep === 2) {
        const title2 = '<h2 style="font-family: Arial, sans-serif; font-weight: bold; font-size: 40px; margin-bottom: 10px;">Étape 2</h2>';
        const text2 = '<p style="font-family: Verdana, sans-serif; font-size: 18px;">Ceci est la deuxième alerte.</p>';
        alert1(title2 + text2);
    } else if (alertStep === 3) {
        const title3 = '<h2 style="font-family: Arial, sans-serif; font-weight: bold; font-size: 40px; margin-bottom: 10px;">Étape 3</h2>';
        const text3 = '<p style="font-family: Verdana, sans-serif; font-size: 18px;">Ceci est la dernière alerte.</p>';
        alert2(title3 + text3);
    } else {
        console.log("Toutes les alertes sont terminées");
        alertStep = 0; 
}   }



// Exemple d'utilisation avec un titre et un texte

//if ( localStorage.getItem('Tutorial1') === null ) {
//    const title = '<h2 style="font-family: Arial, sans-serif; font-weight: bold; font-size: 50px; margin-bottom: 10px;">Bienvenue</h2>';
//    const text = '<p style="font-family: Verdana, sans-serif; font-size: 20px; padding-top: 50px;  ">Nous allons ensemble apprendre à résoudre des problèmes logiques en utilisant des graphes !</p>';
//    alert1(title  + text, { top: '50%', left: '50%' }, { width: '800px', height: '500px' }); 
//    localStorage.setItem('Tutorial1', 'true');
//}




const closeAlert = () => {
    document.getElementById('customAlert').classList.add('hidden');
    alertStep++;
    handleNextAlert();
    localStorage.clear();
}

handleNextAlert();
document.getElementById('closeAlertButton').addEventListener('click', closeAlert); 
export { alert1, closeAlert };  