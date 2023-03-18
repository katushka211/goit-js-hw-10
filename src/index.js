import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(event) {
  const searchCountry = event.target.value.trim();
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  if (searchCountry !== '') {
    fetchCountries(searchCountry).then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length >= 2 && data.length <= 10) {
        insertContent(data);
      } else if (data.length === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      } else if (data.length === 1) {
        insertContentInfo(data);
      }
    });
  }
}

function createCountryListItem(item) {
  return `<li><img src = "${item.flags.svg}" alt ="flag of ${item.name.official}" width = "120" height = "60">
    <p>${item.name.official}</p>
    </li>`;
}

function generateContent(items) {
  return items.map(item => createCountryListItem(item)).join('');
}

function insertContent(array) {
  const result = generateContent(array);
  countryList.insertAdjacentHTML('beforeend', result);
}

function createCountryInfo(country) {
  return `<img src ="${country.flags.svg}" alt = "${
    country.flags.alt
  }" width = "40" height = "20"><p>${country.name.official}</p><p>${
    country.capital
  }</p><p>${country.population}</p> <p>${Object.values(country.languages)}</p>`;
}

function generateContentInfo(items) {
  return items.map(item => createCountryInfo(item)).join('');
}

function insertContentInfo(item) {
  const result = generateContentInfo(item);
  countryInfo.insertAdjacentHTML('beforeend', result);
}
