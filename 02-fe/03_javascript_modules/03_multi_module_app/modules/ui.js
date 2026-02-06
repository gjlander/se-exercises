import { addToCart } from './storage.js';

const renderProdCard = (product, container) => {
    const card = document.createElement('div');
    card.setAttribute('id', product.id);
    card.className =
        'shadow-xl hover:shadow-2xl hover:cursor-pointer rounded-md m-auto flex flex-col bg-slate-800';

    const figure = document.createElement('figure');
    figure.className = 'rounded-t-md overflow-hidden w-full h-96';

    const img = document.createElement('img');
    img.className = 'w-full h-full';
    img.src = product.image;
    img.alt = product.title;
    figure.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.className =
        'flex flex-col p-6 pt-2 rounded-b-md bg-slate-800 h-44';

    const cardTitle = document.createElement('h2');
    cardTitle.className = 'text-2xl border-b-2 mb-4 border-b-gray-400';

    cardTitle.textContent = product.title;
    cardBody.appendChild(cardTitle);

    const price = document.createElement('p');
    price.textContent = '$' + product.price.toFixed(2);
    cardBody.appendChild(price);

    const cardActions = document.createElement('div');
    cardActions.className = 'flex justify-end items-baseline gap-4 mb-4 mr-4';
    const addBtn = document.createElement('button');
    addBtn.className =
        'bg-purple-500 hover:bg-purple-700 p-2 rounded-lg font-bold text-white';

    addBtn.textContent = 'Add to cart';
    addBtn.addEventListener('click', () => {
        addToCart(product);
    });
    cardActions.appendChild(addBtn);

    // card.textContent = product.title;
    card.appendChild(figure);
    card.appendChild(cardBody);
    card.appendChild(cardActions);

    container.appendChild(card);
};

export { renderProdCard };
