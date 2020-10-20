let breeds = {};
let url = 'https://dog.ceo/api/breeds/image/random';
let breedsselector = document.querySelector('#breed');
let subselector = document.querySelector('#sub');
let subsection = document.querySelector('#subsection');
let breedname = document.querySelector('button span');
let button = document.querySelector('button');

const findbreed = _ => {
  let name = breedsselector.value;
  if (breeds[breedsselector.value].length < 2) {
    subselector.innerHTML = '';
    subsection.classList.add('hidden');
  } else {
    subsection.classList.remove('hidden');
    name += ' (all)';
    seedsub(breeds[breedsselector.value]);
  }
  url = `https://dog.ceo/api/breed/${breedsselector.value}/images/random`;
  breedname.innerHTML = name;
  getdog();
};

const seedsub = members => {
  let out = '<option value="all">all</option>';
  members.forEach(m => {
    out += `<option value="${m}">${m}</option>`;
  });
  subselector.innerHTML = out;
};

const seedbreedsform = _ => {
  let out = '';
  Object.keys(breeds).forEach(b => {
    out += `<option value="${b}">${b}</option>`;
  });
  document.querySelector('#breed').innerHTML = out;
};

const findsub = _ => {
  breedname.innerHTML = `${subselector.value} ${breedsselector.value}`;
  url = `https://dog.ceo/api/breed/${breedsselector.value}/${subselector.value}/images/random`;
  getdog();

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
subselector.addEventListener('change', findsub);
button.addEventListener('click', getdog);
getdog();
getbreeds();
