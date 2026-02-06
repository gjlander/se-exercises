const messageContainer = document.querySelector('#message-container');

setTimeout(() => {
    const h2 = document.createElement('h2');
    h2.textContent = 'Special Offer: Get 20% off your next purchase!';
    h2.className =
        'bg-red-500 text-white p-4 rounded-lg shadow-lg max-w-md mx-auto';
    messageContainer.appendChild(h2);
}, 1000);
