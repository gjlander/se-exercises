const form = document.querySelector('form');
const ul = document.querySelector('ul');
const reloadBtn = document.querySelector('#reload');

const getQuotes = () => {
    return JSON.parse(localStorage.getItem('quotes')) || [];
};

const renderStorage = () => {
    const quotes = getQuotes();
    quotes.forEach((q) => {
        const newLi = document.createElement('li');
        newLi.textContent = q;
        ul.appendChild(newLi);
    });
};
renderStorage();

form.addEventListener('submit', (e) => {
    const quotes = getQuotes();
    e.preventDefault();
    const userInput = document.querySelector('#userInput');
    if (!userInput.value) return alert('Cannot submit an empty quote!');

    // quotes.unshift(userInput.value);
    const updatedQuotes = [userInput.value, ...quotes];

    localStorage.setItem('quotes', JSON.stringify(updatedQuotes));

    const newLi = document.createElement('li');
    newLi.textContent = userInput.value;

    ul.insertBefore(newLi, ul.firstChild);
    form.reset();
});

reloadBtn.addEventListener('click', () => {
    window.location.reload();
});
