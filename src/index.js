import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import { fetchImages } from "./js/axios-api.js";
import { renderCard } from "./js/renderCard.js";
import './sass/main.scss';
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('[name=searchQuery]'),
    card: document.querySelector('.gallery'),
    btnMore: document.querySelector('.load-more'),
}

let currentPage = 1;
let query = '';

refs.form.addEventListener('submit', onSubmit);
let gallery = new SimpleLightbox('.gallery a');

function onSubmit(e) {
    e.preventDefault();

    const searchQuery = refs.input.value.trim();
    if (!searchQuery) return;
    
    currentPage = 1;
    query = searchQuery;
    refs.card.innerHTML = '';

    fetchImages({query: searchQuery, page: currentPage})
        .then(response => {
            // let gallery = new SimpleLightbox('.gallery a');
            const totalHits = response.data.totalHits;
            if (totalHits === 0) { 
                refs.form.reset();
                refs.btnMore.style.display = 'none';
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.', { timeout: 2500 });
                return;
            }
            
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`, {timeout: 2500});
            
            const markup = renderCard(response);
            refs.card.innerHTML = markup;
            
            gallery.refresh();
            
            refs.form.reset();
            
            if (response.data.hits.length < 40) {
                refs.btnMore.style.display = 'none';
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.", { timeout: 3500 });
                // refs.form.reset();
            } else {
                refs.btnMore.style.display = 'flex';
            }
        })
        .catch(error=>Notiflix.Notify.failure('DANGER!!!', { timeout: 10000 }))
}


refs.btnMore.addEventListener('click', onClickBtn);
function onClickBtn(e) {
    currentPage += 1;
    fetchImages({ query, page: currentPage })
    .then(response => {
        const markup = renderCard(response);
        refs.card.insertAdjacentHTML('beforeend', markup);
        gallery.refresh();
        if (response.data.hits.length < 40) {
                refs.btnMore.style.display = 'none';
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.", { timeout: 3500 });

            } else {
                refs.btnMore.style.display = 'flex';
            }
    });
}

