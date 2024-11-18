document.addEventListener('DOMContentLoaded', () => {
    const resizeImages = () => {
        const images = document.querySelectorAll('.level img');
        images.forEach(image => {
            const size = window.innerWidth < 768 ? window.innerWidth / 8 : window.innerWidth / 8;
            image.style.width = size + 'px';
            image.style.height = size + 'px';
        });
    };


    resizeImages();

    window.addEventListener('resize', resizeImages);
});



document.addEventListener('DOMContentLoaded', () => {
    const itemSelector = document.getElementById('itemSelector');
    const items = document.querySelectorAll('.image-container');
    const bipartie = document.querySelectorAll('.bipartie');


    items.forEach(item => item.style.display = 'block');


    itemSelector.addEventListener('change', () => {
        const selectedValue = itemSelector.value;

        items.forEach(item => {
            console.log(item.id);
            if (selectedValue === item.id){
                item.style.display = 'block';
            
            }else if (selectedValue === 'all'){
                item.style.display = 'block';
            
            } else if (selectedValue === 'bipartie') {
                item.style.display = item.classList.contains('bipartie') ? 'block' : 'none';

            } else if (selectedValue === 'tripartie') {
                item.style.display = item.classList.contains('tripartie') ? 'block' : 'none';
            
            }else{
                item.style.display = 'none';
            } 
        });

});
});




let info = [0, 0, 0, 0, 0, 0];

for (let i = 0; i < info.length; i++) {
    const storedValue = localStorage.getItem(`info${i}`);
    if (storedValue === '1') {
        info[i] = 1;
    }
}

// fonction pour changer la valeur de l'index de info
function updateInfo(index, value) {
    if (index >= 0 && index < info.length) {
        info[index] = value;
        localStorage.setItem(`info${index}`, value.toString());
    }
}

/* Savoir si un niveau a deja été fait*/

info.forEach((value, index) => {
    if (value === 1){
        document.querySelectorAll(`.image-container:nth-of-type(${index+1}) p`).forEach(element => {
            element.style.display = 'flex';
            console.log(`info[${index}] = ${value}`);
        }); 
    

    }
    console.log(`info[${index}] = ${value}`);
});




updateInfo(1, 0);
export { updateInfo };