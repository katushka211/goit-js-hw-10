export const fetchCountries = name =>
  fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages
`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      if (response.status === 404) {
        throw new Error('Not found');
      }
      return response.json();
    })
    .catch(error => {
      return [];
    });
