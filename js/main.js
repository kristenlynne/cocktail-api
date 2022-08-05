/* To Do:
x create function to get random drink and display it on the DOM
x create function to be able to search by ingredient name
x create error message to display in dom when there's an invalid search
x style the CSS
- try to see if you can stop duplicate drinks from showing up (Pink Gin, Gin Daisy, Gin Sour, Gin Tonic, Gin Swizzle... appears to be when ingredient is also in a drink name)
- refractor
*/

/* -- Event Listeners -- */
document.addEventListener('DOMContentLoaded', getDrink); 
document.querySelector('.searchButton').addEventListener('click', getDrink);
document.querySelector('.randomButton').addEventListener('click', getRandomDrink);
/* refreshes homepage */
window.addEventListener("load", event => {
  document.querySelector('.homeButton').onclick = function() {
      location.reload(true);
  }
});

/* -- displays drinks in DOM that meet parameters from input -- */
async function getDrink() {
  const drink = document.querySelector('input').value;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`

  try {
    const res = await fetch(url);
    const data = await res.json();
      console.log(data);
      resetDOM()
      if (data.drinks == null) {
        console.log('invalid search')
        const section = document.createElement('section');
        section.classList.add('error')
        section.innerHTML = `<p>hmm... we don't know what that drink is. try another search.</p>`;
        document.querySelector('#cocktails').appendChild(section)
      } else {
          data.drinks.forEach(drink => {
            console.log(drink);
            addToDOM(drink)
        })
      }
  }
  catch (err) {
    console.log(`Error: ${err}`)
  }
}

/* -- displays random drink in DOM when click on button -- */
async function getRandomDrink(){
  const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`

  try {
    const res = await fetch(url);
    const data = await res.json();
      console.log(data);
      resetDOM();
      data.drinks.forEach(drink => {
        console.log(drink);
        addToDOM(drink)
      })
  }
  catch (err) {
    console.log(`Error: ${err}`);
  }
}

/* -- removes preloaded drinks from DOM -- */
function resetDOM() {
    const cocktails = document.getElementById('cocktails');

    while (cocktails.firstChild)
        cocktails.removeChild(cocktails.firstChild)
}

/* -- adds data from input to DOM and creates HTML elements --*/
function addToDOM(drink) {
    const section = document.createElement('section');
    section.classList.add('cocktail')

    section.innerHTML = `
        <div>
            <h2 class="cocktailName">${drink.strDrink}</h2>
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink} cocktail"/>
            <h3>Ingredients</h3>
            <ul id="ingredients">${getIngredients(drink)}</ul>
            <h3>Instructions</h3>
            <p>${drink.strInstructions}</p>
        </div> 
    `;
    
    document.querySelector('#cocktails').appendChild(section)
}

/* -- loops through ingredient and measurement data and creates li elements -- */
function getIngredients(drink) {
  let str = ''
  for (let i = 1; i < 16; i++) {
    const ingredient = `strIngredient${i}`;
    const measure = `strMeasure${i}`
      if (drink[ingredient]) {
        const strMeasure = drink[measure] || "";
          str += `<li class="ingredient">${strMeasure} ${drink[ingredient]}</li>`;
      }
  }
  return str;
}

document.querySelector('.searchButton').addEventListener('click', searchByIngredient);

function searchByIngredient(drink) {
  const ingredient = document.querySelector('input').value;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`

  fetch(url)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)

    data.drinks.forEach(element => {
      console.log(element.idDrink);
      let drink = element.idDrink
      searchByID(drink)
      resetDOM()
    })
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  })
}

function searchByID(drink) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink}`
  
  fetch(url)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    data.drinks.forEach(drink => {
      console.log(drink);
      addToDOM(drink)
    })
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  })
}