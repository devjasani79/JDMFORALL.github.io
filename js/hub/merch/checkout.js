document.addEventListener("DOMContentLoaded", () => {
    const grandTotalElement = document.getElementById("grand-total");
    const orderItemsContainer = document.getElementById("order-items");

    // Fetch the cart data (mocked for now)
    const cart = getCartData();

    let grandTotal = 0;

    // Populate the order summary
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;

        const orderItem = document.createElement("div");
        orderItem.classList.add("order-item");
        orderItem.innerHTML = `
            <p>${item.name} (x${item.quantity})</p>
            <p>$${itemTotal.toFixed(2)}</p>
        `;
        orderItemsContainer.appendChild(orderItem);
    });

    grandTotalElement.textContent = grandTotal.toFixed(2);

    // Pay Now Button Event
    document.getElementById("pay-now").addEventListener("click", () => {
        // Collect billing details
        const form = document.getElementById("billing-form");
        const formData = new FormData(form);
        const userDetails = {};

        for (const [key, value] of formData.entries()) {
            userDetails[key] = value.trim();
        }

        // Validate the form
        if (
            !userDetails["first-name"] ||
            !userDetails["last-name"] ||
            !userDetails["address-line-1"] ||
            !userDetails["pin-code"] ||
            !userDetails["phone-number"] ||
            !userDetails["email"]
        ) {
            alert("Please fill out all required fields.");
            return;
        }

        // Mock sending data to payment portal
        alert(`Proceeding to payment with a total of $${grandTotal.toFixed(2)}`);
        window.location.href = "payment.html"; // Placeholder URL for the payment portal
    });
});

// Mock fetching cart data
function getCartData() {
    return [
        { id: 1, name: "JDM T-Shirt", quantity: 2, price: 25.0 },
        { id: 2, name: "JDM Keychain", quantity: 1, price: 10.0 },
        { id: 3, name: "JDM Hoodie", quantity: 1, price: 40.0 }
    ];
}
