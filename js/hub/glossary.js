const glossaryContainer = document.getElementById("glossaryList");
const searchInput = document.getElementById("searchInput");

// Fetch glossary data from JSON file
async function loadGlossary() {
  try {
    const response = await fetch("data/glossary.json");
    const data = await response.json();
    renderGlossary(data.glossary);
  } catch (error) {
    console.error("Error fetching glossary data:", error);
  }
}

// Render glossary terms
function renderGlossary(glossary) {
  glossaryContainer.innerHTML = glossary
    .map(
      (term, index) => `
      <li data-index="${index}">
        <span class="term-name">${term.name}</span>
        <p class="term-description">${term.description} <a href="${term.url}" class="more-info" target="_blank">Learn more...</a></p>
      </li>
    `
    )
    .join("");
}

// Toggle definition visibility on click (both term name and tab)
function toggleDefinition(event) {
  const clickedElement = event.target;

  // Check if the clicked element is either the term name or its container
  if (clickedElement.classList.contains("term-name") || clickedElement.closest("li")) {
    const listItem = clickedElement.closest("li");
    const description = listItem.querySelector(".term-description");
    description.classList.toggle("visible");
  }
}

// Filter glossary based on search
function filterGlossary() {
  const query = searchInput.value.toLowerCase();
  const terms = document.querySelectorAll("#glossaryList li");
  terms.forEach((term) => {
    const name = term.querySelector(".term-name").textContent.toLowerCase();
    const description = term.querySelector(".term-description").textContent.toLowerCase();
    term.style.display = name.includes(query) || description.includes(query) ? "" : "none";
  });
}

// Event Listeners
searchInput.addEventListener("input", filterGlossary);
glossaryContainer.addEventListener("click", toggleDefinition);

// Load the glossary on page load
loadGlossary();
