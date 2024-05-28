document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/api/homes')
        .then(response => response.json())
        .then(homes => {
            console.log('Fetched homes:', homes);
            const homesSection = document.querySelector('.homes-section .swiper-wrapper');

            homes.forEach(home => {
                const homeCard = document.createElement('div');
                homeCard.className = 'swiper-slide';

                homeCard.innerHTML = `
                    <a href="home_details.html?id=${home._id}">
                        <div class="home-card">
                            <img src="${home.image_url}" alt="${home.title}">
                            <h3>${home.title}</h3>
                            <p>${home.description}</p>
                            <p>${home.price}</p>
                        </div>
                    </a>
                `;

                homesSection.appendChild(homeCard);
            });

            // Initialize Swiper
            new Swiper('.swiper-container', {
                slidesPerView: 20,
                spaceBetween: -350,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 1,
                    },
                    1200: {
                        slidesPerView: 2,
                    },
                    1200: {
                        slidesPerView: 3,
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching homes:', error));
});
