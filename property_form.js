document.getElementById('property-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const propertyData = {
        title: document.getElementById('title').value,
        rooms: document.getElementById('rooms').value,
        kitchen: document.getElementById('kitchen').value,
        bathrooms: document.getElementById('bathrooms').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value,
        image_url: document.getElementById('image_url').value
    };

    fetch('http://localhost:5000/api/homes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(propertyData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Property has been added successfully');
            window.location.href = 'index.html';
        } else {
            alert('Error adding property: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});
