document.addEventListener("DOMContentLoaded", () => {
    const alertBox = document.getElementById("custom-alert");
    const closeAlert = alertBox.querySelector(".close-alert");
    const membershipBtn = alertBox.querySelector(".membership-btn");

    // Show the alert box when "View More" is clicked
    document.querySelectorAll(".view-more").forEach((button) => {
        button.addEventListener("click", () => {
            alertBox.style.display = "flex";
        });
    });

    // Close the alert box
    closeAlert.addEventListener("click", () => {
        alertBox.style.display = "none";
    });

    // Redirect to membership section
    membershipBtn.addEventListener("click", () => {
        window.location.href = "membership.html"; // Adjust the link as needed
    });

    // Close alert when clicking outside the content
    alertBox.addEventListener("click", (e) => {
        if (e.target === alertBox) {
            alertBox.style.display = "none";
        }
    });
});

// ----------------------------------------------------------------------------------------------------------------------------------------------
// Fetch event data from the JSON file (can be adjusted based on server-side integration)
const fetchEventsData = async () => {
    try {
      const response = await fetch('data/events.json');
      const eventsData = await response.json();
      document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', async () => {
          const category = card.getAttribute('data-category');
          const events = eventsData[category];
  
          // Show the modal and set category name
          const modal = document.getElementById('event-modal');
          const modalTitle = modal.querySelector('.modal-title');
          modalTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
  
          // Populate mini cards
          const eventsContainer = document.getElementById('events-mini-cards');
          eventsContainer.innerHTML = '';
          events.forEach(event => {
            const miniCard = document.createElement('div');
            miniCard.classList.add('event-card');
            miniCard.innerHTML = `
              <h4>${event.name}</h4>
              <p><strong>Place:</strong> ${event.place}</p>
              <p>${event.desc}</p>
              <p class="event-date"><strong>Date:</strong> ${event.date}</p>
            `;
            eventsContainer.appendChild(miniCard);
          });
  
          // Show modal
          modal.style.display = 'flex';
        });
      });
    } catch (error) {
      console.error('Error fetching events data:', error);
    }
  };
  
  // Close the modal
  document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('event-modal').style.display = 'none';
  });
  
  // Initialize the events data on page load
  document.addEventListener('DOMContentLoaded', () => {
    fetchEventsData();
  });
  // ---------------------------------------------------------------------------------------------
  async function loadCultureActivities() {
    try {
        const response = await fetch('data/real-jdm-culture.json');
        const data = await response.json();

        const sliderWrapper = document.querySelector('.slider-wrapper');
        data.cultureActivities.forEach(activity => {
            const card = document.createElement('div');
            card.classList.add('culture-card');
            card.innerHTML = `
                <img src="images/${activity.logo}" alt="${activity.name}">
                <h3>${activity.name}</h3>
                <a href="${activity.link}" target="_blank">Visit Page</a>
            `;
            sliderWrapper.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading culture activities:', error);
    }
}

// Call the function to load the activities
loadCultureActivities();
