// Show the login form modal
function showLoginForm() {
    const loginModal = document.getElementById("loginModal");
    if (loginModal) {
        loginModal.style.display = "flex";
    }
}

// Close the login form modal
function closeLoginForm() {
    const loginModal = document.getElementById("loginModal");
    if (loginModal) {
        loginModal.style.display = "none";
    }
}

// Close the modal when clicking outside the modal content
window.addEventListener("click", (event) => {
    const loginModal = document.getElementById("loginModal");
    if (event.target === loginModal) {
        loginModal.style.display = "none";
    }
});

// Handle form submission
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent the default form submission

            // Form validation and eligibility checks
            const age = parseInt(document.getElementById("age").value);
            const nationality = document.getElementById("nationality").value;
            const education = document.getElementById("education").value;
            const aadharCard = document.getElementById("aadhar").files[0];
            const photo = document.getElementById("photo").files[0];

            let errorMessage = "";

            // Eligibility criteria
            if (age < 21) {
                errorMessage = "You must be at least 21 years old to join.";
            }else if (!aadharCard) {
                errorMessage = "Please upload your Aadhar card.";
            } else if (!photo) {
                errorMessage = "Please upload a photo of yourself.";
            }

            // Display eligibility message
            if (errorMessage) {
                alert(errorMessage);
            } else {
                alert("Thank you for filling out the form. Our team will review your eligibility and respond soon.");
                loginForm.reset(); // Reset the form fields
                closeLoginForm(); // Close the modal
            }
        });
    }
});
