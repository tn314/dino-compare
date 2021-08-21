// Create Dino Constructor
class Dino {
  constructor(dino) {
    Object.assign(this, dino);
  }
}

// Create Dino Objects
let dinos = [];

fetch("./dino.json")
  .then(response => response.json())
  .then(json => {
    json.Dinos.forEach(dino => {
        dinos.push(new Dino(dino));
    });
  });

// Create Human Object
class Human {
  constructor({ name, feet, inches, weight, diet }) {
    this.name = name;
    this.feet = feet;
    this.inches = inches;
    this.weight = weight;
    this.diet = diet;
  }
}

let human;

// Use IIFE to get human data from form
function getFormValues() {
  let inputName = document.getElementById('name').value;
  let inputFeet = document.getElementById('feet').value;
  let inputInches = document.getElementById('inches').value;
  let inputWeight = document.getElementById('weight').value;    
  let inputDiet = document.getElementById('diet').value;
  
  return {
    name: inputName,
    feet: inputFeet,
    inches: inputInches,
    weight: inputWeight,
    diet: inputDiet
  }
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareWeight(dino, human) {
  let fact = dino.species + ' is more lighter than ' + human.name;
  if (dino.weight > human.weight) {
      fact = dino.species + ' is more heavier than ' + human.name;
  }

  return fact;
} 

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareHeight(dino, human) {
  let fact = dino.species + ' is more shorter than ' + human.name;
  if (dino.height > human.height) {
      fact = dino.species + ' is more taller than ' + human.name;
  }

  return fact;
} 

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareDiet(dino, human) {
  let fact = dino.species + ' is ' + dino.diet + ' and ' + human.name + ' is ' + human.diet;

  return fact;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }

  return array;
}

function prepareList(dinos, human) {
  let resultsArray = shuffle([...dinos]);
  let position = 4;
  resultsArray.splice(position, 0, human);
  return resultsArray;
}

function getItemTemplate(item) {
  let title = item instanceof Dino ? item.species : item.name;
  let imageName = item instanceof Dino ? item.species.toLowerCase() : 'human';
  let imagePath = `./images/${imageName}.png`;
  let facts = [
    item.fact,
    compareWeight(item, human),
    compareHeight(item, human),
    compareDiet(item, human)
  ];

  let randomFact = item instanceof Dino ? facts[Math.floor(Math.random()*facts.length)] : '';
  if (item.species === 'Pigeon') randomFact = 'All birds are dinosaurs.';

  return `<div class="grid-item">
    <h2>${title}</h2>
    <img src="${imagePath}" alt="${title}" />
    <p>${randomFact}</p>
  </div>`;
}

// Generate Tiles for each Dino in Array
function tilesTemplate(arr) {
  let items = '';

  arr.map(function(item) {
    let template = getItemTemplate(item);

    items += template;
  });

  return items;
}

// On button click, prepare and display infographic
let form = document.getElementById('dino-compare');
let formButton = document.getElementById('btn');
let grid = document.getElementById('grid');

formButton.addEventListener('click', function(event) {
  event.preventDefault();

  human = new Human(getFormValues());

  // Add tiles to DOM
  grid.innerHTML = tilesTemplate(prepareList(dinos, human));

  // Remove form from screen
  form.style.display = 'none';
});
