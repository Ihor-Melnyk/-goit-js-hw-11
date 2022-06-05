export { fetchImages };

import axios from "axios";
import Notiflix from 'notiflix';

const KEY = '27751925-222e133f055774cf8425d9703';
const URL = 'https://pixabay.com/api/';

const optionSearch = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=';

async function fetchImages({ query, page }) {
    let search;
    try {
        return search = await axios.get(`${URL}?key=${KEY}&q=${query}&${optionSearch}${page}`)
    } catch {
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.', {timeout: 2500,})
    }
}