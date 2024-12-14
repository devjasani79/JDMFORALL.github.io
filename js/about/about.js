// Fetch team data from JSON file
fetch("data/about.json")
  .then((response) => response.json())
  .then((teamData) => renderTeamCards(teamData))
  .catch((error) => console.error("Error loading team data:", error));

// Function to render team cards
function renderTeamCards(teamData) {
  const teamContainer = document.querySelector(".team-cards");

  teamData.forEach((member) => {
    const cardHTML = `
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="${member.image}" alt="${member.name}" loading="lazy">
          </div>
          <div class="flip-card-back">
            ${member.role}
          </div>
        </div>
        <div class="card-name">
          <h3>${member.name}</h3>
        </div>
      </div>
    `;
    teamContainer.innerHTML += cardHTML;
  });
}
