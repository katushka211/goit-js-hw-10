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
  cleanHtml();
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
  return `<li class="list-item"><img src = "${item.flags.svg}" alt ="flag of ${item.name.official}" width = "30" height = "20">
    <p class="country-title">${item.name.official}</p>
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
  return `<div class="info-box"><img src ="${country.flags.svg}" alt = "${
    country.flags.alt
  }" width = "70" height = "40"><p class="info-box-title">${
    country.name.official
  }</p></div><p class="info-country"><span class="basic-country">Capital:</span>${
    country.capital
  }</p><p class="info-country"><span class="basic-country">Population:</span>${
    country.population
  }</p><p class="info-country"><span class="basic-country">Languages:</span>${Object.values(
    country.languages
  )}</p>`;
}

function generateContentInfo(items) {
  return items.map(item => createCountryInfo(item)).join('');
}

function insertContentInfo(item) {
  const result = generateContentInfo(item);
  countryInfo.insertAdjacentHTML('beforeend', result);
}

function cleanHtml() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
