const breed = document.querySelector('#breed');
const imagecontainer = document.querySelector('button img');
const breedinfo = document.querySelector('h2');
const button = document.querySelector('button');
const datalist = document.querySelector('#allbreeds');
let url = 'https://dog.ceo/api/breeds/image/random';


const getbreeds = _ => {
  fetch('https://dog.ceo/api/breeds/list/all')
  .then(response => response.json())
  .then(data => {
    seedbreedsform(data.message);
  })
};

const ucfirst = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const seedbreedsform = breeds => {
  let out = '';
  Object.keys(breeds).forEach(b => {
    out += `<option value="${ucfirst(b)}"/>`;
    breeds[b].forEach(s => {
      out += `<option value="${ucfirst(b)} - ${ucfirst(s)}"/>`;
    });
  });
  datalist.innerHTML = out;
  breed.addEventListener('change', findbreed);
};

const findbreed = _ => {
  let name = breed.value;
  name = name.replace(' - ', '/').toLowerCase();
  url = `https://dog.ceo/api/breed/${name}/images/random`
  getdog(); 
};

imagecontainer.addEventListener('load', e => {
  button.classList.remove('loading');
});

const getdog = _ => {
  button.classList.remove('error');
  button.classList.add('loading');
  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      button.classList.remove('loading');
      button.classList.add('error');
    }
  })
  .then((data) => {
    imagecontainer.src = `${data.message}`;
    let bits = data.message.split('/');
    bits = bits[bits.length-2]
           .split('-')
           .map(b => ucfirst(b))
           .join(' - ');
    breedinfo.innerText = bits;
  })
};

button.addEventListener('click', getdog);

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
});
getdog();
getbreeds();