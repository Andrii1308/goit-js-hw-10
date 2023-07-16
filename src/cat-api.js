import axios from 'axios';

import {
  onError,
  hideSpinner,
  showSpinner,
  createMarkupCats,
} from './index.js';

function serviceFetchBreeds() {
  const API_KEY =
    'live_hDd6PMmCZJSQQe3ToCHsSqCa0BwSSFHMXxORxwemFw6hpt3OKwj8SlP9HrdZu1ZQ';
  axios.defaults.headers.common['x-api-key'] = API_KEY;

  const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

  return axios.get(BASE_URL).then(response => {
    if (response.status !== 200) {
      throw new Error('Oops! Something went wrong! Try reloading the page!');
    }
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  const BASE_URL = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  showSpinner();

  return axios
    .get(BASE_URL)
    .then(response => response.data[0])
    .then(cat => {
      createMarkupCats(cat);
      hideSpinner();
    })
    .catch(onError)
    .finally(hideSpinner);
}

export { serviceFetchBreeds, fetchCatByBreed };
