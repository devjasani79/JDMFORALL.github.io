async function loadCarouselImages() {
    try {
        const response = await fetch('./data/carouselImages.json');
        const images = await response.json();

        const sideView = document.querySelector('.side_view');
        const mainView = document.getElementById('main');

        // Set the main view to the first image
        mainView.src = images[0].src;

        // Create side view thumbnails
        images.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            if (index === 0) img.classList.add('active'); // Mark the first image as active
            img.addEventListener('click', () => {
                mainView.src = image.src;
                document.querySelectorAll('.side_view img').forEach(img => img.classList.remove('active'));
                img.classList.add('active');
            });
            sideView.appendChild(img);
        });
    } catch (error) {
        console.error('Error loading carousel images:', error);
    }
}

loadCarouselImages();
