function submitForm() {
    const emailInput = document.querySelector('input[name="email"]');
    const email = emailInput.value;
    
    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
        alert(`Thank you for subscribing! We have received your email: ${email}`);
        
        // Clear the text field after successful submission
        emailInput.value = '';

        // You can now submit the email to the database here, e.g., via an API request.
    } else {
        alert('Please enter a valid email address.');
    }
}
