let breeds = {};
let url = 'https://dog.ceo/api/breeds/image/random';
let breed = document.querySelector('#breed');
let imagecontainer = document.querySelector('button div');
let breedname = document.querySelector('button span');
let button = document.querySelector('button');

const findbreed = _ => {
  let name = breed.value;
  breedname.innerHTML = name;
  name = name.replace(' - ', '/').toLowerCase();
  url = `https://dog.ceo/api/breed/${name}/images/random`;
  getdog(); 
};

const seedbreedsform = _ => {
  let out = '';
  Object.keys(breeds).forEach(b => {
    out += `<option value="${ucfirst(b)}">${ucfirst(b)}</option>`;
    if (breeds[b].length > 0) {
      breeds[b].forEach(s => {
        out += `<option value="${ucfirst(b)} - ${ucfirst(s)}">${ucfirst(b)} - ${ucfirst(s)}</option>`;
      });
    }
  });
  document.querySelector('#allbreeds').innerHTML = out;
};

const ucfirst = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


const getbreeds = _ => {
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
      .then(data => {
        breeds = data.message;
        seedbreedsform();
  });
};

const getdog = _ => {
  button.classList.add('loading');
  fetch(url)
    .then(response => response.json())
      .then(data => {
        imagecontainer.style.backgroundImage = `url(${data.message})`;
        button.classList.remove('loading');
  });
};

breed.addEventListener('change', findbreed);
button.addEventListener('click', getdog);
getdog();
getbreeds();
