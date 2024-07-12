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
