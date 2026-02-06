const favCont = document.querySelector('#fav-container');

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const favs = JSON.parse(localStorage.getItem('favorites')) || [];
console.log(favCont);

const updateNotes = (id, newNotes) => {
    const updatedFavs = favs.map((fav) =>
        fav.id !== id ? fav : { ...fav, notes: newNotes }
    );
    localStorage.setItem('favorites', JSON.stringify(updatedFavs));
};

const renderFavs = () => {
    if (!favs.length) {
        favCont.innerHTML = `<h2 class="text-4xl">It looks like you don't have any favorites yet...</h2>`;
        return;
    }

    favs.forEach((movie) => {
        const { id, poster_path, original_title, notes } = movie;
        const card = document.createElement('div');
        card.className =
            'transition ease-in-out delay-150 shadow-xl hover:shadow-2xl h-[44rem] hover:cursor-pointer rounded-lg';

        const figure = document.createElement('figure');
        figure.className = 'rounded-t-lg overflow-hidden h-96';
        const img = document.createElement('img');
        img.className = 'w-full h-full';
        img.src = IMG_URL + poster_path;
        img.alt = original_title;
        figure.appendChild(img);

        const cardBody = document.createElement('div');
        cardBody.className =
            'flex flex-col px-4 py-2 items-start rounded-b-lg bg-slate-100 dark:bg-slate-800 min-h-80';
        const title = document.createElement('h2');
        title.className = 'text-4xl w-full border-b-2 mb-4 border-b-gray-400';
        title.textContent = original_title;

        const notesH3 = document.createElement('h3');
        notesH3.textContent = 'My notes:';
        notesH3.className = 'text-2xl';

        const notesForm = document.createElement('form');
        notesForm.className = 'w-full';
        const updateBtn = document.createElement('button');
        updateBtn.textContent = 'Update notes';
        updateBtn.className = 'py-2 px-4 bg-green-500 rounded-lg';
        updateBtn.type = 'submit';

        const notesText = document.createElement('textarea');
        notesText.className = 'bg-slate-400 p-2 mt-2 rounded-lg w-full';
        notesText.defaultValue = notes;
        notesForm.appendChild(notesText);
        notesForm.appendChild(updateBtn);

        notesForm.onsubmit = (e) => {
            e.preventDefault();
            updateNotes(id, notesText.value);
        };

        cardBody.appendChild(title);
        cardBody.appendChild(notesH3);
        cardBody.appendChild(notesForm);

        card.appendChild(figure);
        card.appendChild(cardBody);

        favCont.appendChild(card);
    });
};

renderFavs();
