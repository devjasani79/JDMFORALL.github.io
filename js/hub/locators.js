// Function to open the locator overlay
function openLocatorOverlay() {
    document.getElementById('locator-overlay').style.display = 'flex';
}

// Function to close the locator overlay
function closeLocatorOverlay() {
    document.getElementById('locator-overlay').style.display = 'none';
}

// Function to load data based on category
function loadCategoryData(category) {
    const locatorDataDiv = document.getElementById('locator-data');
    locatorDataDiv.innerHTML = ''; // Clear the previous content

    // Fetch the relevant JSON data
    fetch(`data/locators/${category}.json`)
        .then(response => response.json())
        .then(data => {
            // Populate the data dynamically
            data.forEach(location => {
                const entry = document.createElement('div');
                entry.classList.add('locator-entry');
                entry.innerHTML = `
                    <h3>${location.name}</h3>
                    <p><strong>Address:</strong> ${location.address}</p>
                    <p><strong>Contact:</strong> ${location.contact}</p>
                    <p><strong>Specialty:</strong> ${location.speciality}</p>
                `;
                locatorDataDiv.appendChild(entry);
            });
        })
        .catch(error => {
            console.log('Error loading data:', error);
            // Display a message if no data is found
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'No data available for this category.';
            locatorDataDiv.appendChild(errorMessage);
        });
}
