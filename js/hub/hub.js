// Function to toggle the side tab (hamburger menu)
function toggleMenu() {
  const sideTab = document.getElementById('sideTab');
  sideTab.classList.toggle('active');
}

// Function to close the side tab after clicking a navigation link
function closeMenu() {
  const sideTab = document.getElementById('sideTab');
  sideTab.classList.remove('active');
}

// Scroll to section and close the menu when a link is clicked
document.querySelectorAll('.side-nav a').forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default behavior

    // Scroll to the section
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    window.scrollTo({
      top: targetSection.offsetTop - 50, // Adjust for fixed nav if needed
      behavior: 'smooth',
    });

    // Close the side tab
    closeMenu();
  });
});



function openOverlay(sectionId) {
  const overlay = document.querySelector(`#${sectionId}`);
  overlay.style.display = 'block'; // Display the overlay
}

// Close the overlay
function closeOverlay(sectionId) {
  const overlay = document.querySelector(`#${sectionId}`);
  overlay.style.display = 'none';
}

// ---------

/* JavaScript to add the class */
window.addEventListener('scroll', function () {
  document.querySelectorAll('.subsection').forEach(function (section) {
      if (section.getBoundingClientRect().top < window.innerHeight) {
          section.classList.add('visible');
      }
  });
});

