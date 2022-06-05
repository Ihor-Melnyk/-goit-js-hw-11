import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import { fetchImages } from "./js/axios-api.js";
import { renderCard } from "./js/renderCard.js";
import './sass/main.scss';
import "simplelightbox/dist/simple-lightbox.min.css";
// import './sass/main.scss';

const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('[name=searchQuery]'),
    card: document.querySelector('.gallery'),
    btnMore: document.querySelector('.load-more'),
}

// refs.btnMore.Disabled = true;
let currentPage = 1;
let query = '';

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    const searchQuery = refs.input.value.trim();
    if (!searchQuery) return;
    
    currentPage = 1;
    query = searchQuery;
    fetchImages({query: searchQuery, page: currentPage})
        .then(response => {

            // if (response.data.hits.length<40) {
            //     refs.btnMore.style.display = none;
            // }

            

            refs.btnMore.style.display = 'flex'

            const totalHits = response.data.totalHits;
            if (totalHits === 0) { 
                return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.', {timeout: 2500,})
            }
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`, {timeout: 2500,});
            
            const markup = renderCard(response);
            refs.card.innerHTML = '';
            refs.card.innerHTML = markup;

            let gallery = new SimpleLightbox('.gallery a');

            refs.form.reset();
        })
        //.catch(Notiflix.Notify.failure('Ёлы-палы. Sorry, there are no images matching your search query. Please try again.'))
}


refs.btnMore.addEventListener('click', onClickBtn);
function onClickBtn(e) {
    currentPage += 1;
    fetchImages({ query, page: currentPage }).then(response => {
        const markup = renderCard(response);
        refs.card.innerHTML = '';
        refs.card.innerHTML = markup;
    });
}

