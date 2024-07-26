
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


    items.forEach(item => item.style.display = 'block');


    itemSelector.addEventListener('change', () => {
        const selectedValue = itemSelector.value;

        items.forEach(item => {
            console.log(item.id);
            if (selectedValue === item.id){
                item.style.display = 'block';
            
            }else if (selectedValue === 'all'){
                item.style.display = 'block';
            
            }else{
                item.style.display = 'none';
            } 
        });

});
});




