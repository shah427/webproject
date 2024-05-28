document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const homeId = urlParams.get('id');

    fetch(`http://localhost:5000/api/homes/${homeId}`)
        .then(response => response.json())
        .then(home => {
            const homeDetails = document.getElementById('home-details');
            homeDetails.innerHTML = `
                <div class="home-card">
                    <img src="${home.image_url}" alt="${home.title}">
                    <h3>${home.title}</h3>
                    <p>Rooms: ${home.rooms}</p>
                    <p>Kitchen: ${home.kitchen}</p>
                    <p>Bathrooms: ${home.bathrooms}</p>
                    <p>Price: ${home.price}</p>
                    <p>${home.description}</p>
                </div>
            `;
        })
        .catch(error => console.error('Error fetching home details:', error));
});
