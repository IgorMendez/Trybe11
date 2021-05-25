// apiScript.js
const API_URL = 'https://icanhazdadjoke.com/';

const fetchJoke = () => {
  const myObject = {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  };

  fetch(API_URL, myObject)
  .then((r) => r.json())
  .then((r) => document.getElementById('jokeContainer').innerText = r.joke)
};

window.onload = () => fetchJoke();