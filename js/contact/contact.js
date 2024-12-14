document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Basic form validation (just an example)
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
  
    if (name && email && message) {
      alert("Your message has been sent successfully!");
      // Here you would typically send the data to the server or store it
      document.getElementById("contact-form").reset(); // Reset form after successful submission
    } else {
      alert("Please fill out all fields before submitting.");
    }
  });
  
  // Fetch FAQ data from FAQ.json
fetch('data/FAQ.json')
.then(response => response.json())
.then(faqData => renderFAQ(faqData))
.catch(error => console.error('Error loading FAQ data:', error));

// Function to render FAQ items
function renderFAQ(faqData) {
const faqContainer = document.querySelector('.faq-container');

faqData.forEach(item => {
  const faqItem = document.createElement('div');
  faqItem.classList.add('faq-item');

  const question = document.createElement('h3');
  question.textContent = item.question;
  faqItem.appendChild(question);

  const answer = document.createElement('p');
  answer.textContent = item.answer;
  faqItem.appendChild(answer);

  // Add click event to toggle the answer visibility
  question.addEventListener('click', () => {
    faqItem.classList.toggle('active');
  });

  faqContainer.appendChild(faqItem);
});
}
