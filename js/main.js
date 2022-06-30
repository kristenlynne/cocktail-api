class Drink {
  constructor(name, image, ingredients, glass, instructions) {
    this.name = name;
    this.image = image;
    this.ingredients = ingredients;
    this.glass = glass;
    this.instructions = instructions;
  }
  displayDrinks() {
    document.querySelector('#drinks').innerHTML += `<h2 class="name">${this.name}</h2>`
    document.querySelector('#drinks').innerHTML += `<img src="${this.image}" alt="${this.name}">`
    document.querySelector('#drinks').innerHTML += `<h3>Ingredients:</h3>`
    document.querySelector('#drinks').innerHTML += `<ul class="ingredients">${this.ingredients}</ul>`
    document.querySelector('#drinks').innerHTML += `<p>Serve in a: ${this.glass}</p>`
    document.querySelector('#drinks').innerHTML += `<h3>Instructions:</h3>`
    document.querySelector('#drinks').innerHTML += `<p class="instructions">${this.instructions}</p>`
  }
}

document.querySelector('button').addEventListener('click' , getDrink)

async function getDrink(){
  const drink = document.querySelector('input').value
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`
  let drinksList = [];

  try {
    const res = await fetch(url);
    const data = await res.json();
      console.log(data);
    
      function getIngredients(drink) {
        let listOfIndgredients = ''
        for (let i = 1; i < 16; i++) {
            const ingredient = `strIngredient${i}`;
            const measure = `strMeasure${i}`
            if (drink[ingredient]) {
                const strMeasure = drink[measure] || "";
                listOfIndgredients += `<li class="ingredient">${strMeasure} ${drink[ingredient]}</li>`;
            }
        }
        return listOfIndgredients;
      }

    for (let i = 0; i < data.drinks.length; i++) {
      let ingredients = getIngredients(data.drinks[i])
      let drink = new Drink(data.drinks[i].strDrink, data.drinks[i].strDrinkThumb, ingredients, data.drinks[i].strGlass, data.drinks[i].strInstructions)
      drinksList.push(drink);
      drink.displayDrinks();
    }
  }
  catch (err) {
    console.log(`Error: ${err}`)
  }
}
