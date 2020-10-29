let breeds = {};
let url = 'https://dog.ceo/api/breeds/image/random';
let breed = document.querySelector('#breed');
let imagecontainer = document.querySelector('button img');
let breedname = document.querySelector('button span');
let breedinfo = document.querySelector('.breedinfo');
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
    out += `<option value="${ucfirst(b)}"/>`;
    if (breeds[b].length > 0) {
      breeds[b].forEach(s => {
        out += `<option value="${ucfirst(b)} - ${ucfirst(s)}"/>`;
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
  })
};

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
    breedinfo.innerText = getname(data.message);
    imagecontainer.onload = function(){
        button.classList.remove('loading');
    }
  })
};

const getname = msg => {
  let name = ''
  if (url.indexOf('breeds') !== -1) {
    name = msg.match(/breeds\/(.*)\//)[1];
    let bits = name.split('-');
    bits.forEach((b,i) => {
      bits[i] = ucfirst(b);
    });
    name = bits.reverse().join(' ');
  }
  return name;
};

breed.addEventListener('change', findbreed);
document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
});
button.addEventListener('click', getdog);
getdog();
getbreeds();