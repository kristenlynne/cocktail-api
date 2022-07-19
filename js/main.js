/* To Do:
- create function to get random drink and display it on the DOM
- display random drinks in a carousel
- create function to be able to search by ingredient name
- create error message to display in dom when there's an invalid search
- style the CSS
*/

document.addEventListener('DOMContentLoaded', getDrink); 
document.querySelector('button').addEventListener('click', getDrink) 
document.querySelector('.randomButton').addEventListener('click', getRandomDrink)

/* -- displays drinks in DOM that meet parameters from input -- */
async function getDrink() {
  const drink = document.querySelector('input').value;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`

  try {
    const res = await fetch(url);
    const data = await res.json();
      console.log(data);
      resetDOM()
      data.drinks.forEach(drink => {
        console.log(drink);
        addToDOM(drink)
      })
  }
  catch (err) {
    console.log(`Error: ${err}`)
  }
}

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

function resetDOM() {
    const cocktails = document.getElementById('cocktails');

    while (cocktails.firstChild)
        cocktails.removeChild(cocktails.firstChild)
}

function addToDOM(drink) {
    const section = document.createElement('section');
    section.classList.add('cocktail')

    section.innerHTML = `
        <div>
            <h2 class="cocktail-name">${drink.strDrink}</h2>
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink} cocktail"/>
            <h3>Ingredients</h3>
            <ul id="ingredients">${getIngredients(drink)}</ul>
            <h3>Instructions</h3>
            <p>${drink.strInstructions} Serve drink in a ${drink.strGlass.toLowerCase()}.</p>
        </div> 
    `;
    
    document.querySelector('#cocktails').appendChild(section)
}

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