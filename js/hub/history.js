document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch('data/history.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const historyData = await response.json();

    const cardsContainer = document.getElementById("history-cards");

    historyData.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('history-card');

      card.innerHTML = `
        <h2>${item.year}</h2>
        <img src="${item.images[0]}" alt="${item.event} Image">
        <p>${item.description}</p>
        <a href="${item.read_more_url}" target="_blank">Read More</a>
      `;

      cardsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching or parsing history data:", error);
  }
});
