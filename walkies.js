let breeds = {};
let url = 'https://dog.ceo/api/breeds/image/random';
let breedsselector = document.querySelector('#breed');
let subselector = document.querySelector('#sub');
let subsection = document.querySelector('#subsection');
let breedname = document.querySelector('button span');
let button = document.querySelector('button');

const findbreed = _ => {
  let name = breedsselector.value;
  breedname.innerHTML = name;
  name = name.replace(' - ','/');
  url = `https://dog.ceo/api/breed/${name}/images/random`;
  getdog();
};

const seedbreedsform = _ => {
  let out = '';
  Object.keys(breeds).forEach(b => {
    out += `<option value="${b}">${b}</option>`;
    if(breeds[b].length > 0) {
      breeds[b].forEach(s => {
        out += `<option value="${b} - ${s}">${b} - ${s}</option>`;
      });
    }
  });
  document.querySelector('#allbreeds').innerHTML = out;
};

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
        document.querySelector('img').src = data.message;
        button.classList.remove('loading');
  });
};

breedsselector.addEventListener('change', findbreed);
button.addEventListener('click', getdog);
getdog();
getbreeds();
