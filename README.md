# Bartender Recipe Book
🥃 Utilizies https://www.thecocktaildb.com/api.php to search for drinks by name or ingredient as well as display random drinks.

<p align="center">
<img src="https://github.com/kristenlynne/kristenlynne/blob/main/projects/cocktaildb.gif">
</p>

🍾 **Link to live site:** https://bartenderrecipebook.netlify.app/

🍉 **Link to repo:** https://github.com/kristenlynne/cocktail-api

## How It's Made:

**Tech used:** HTML, CSS, JavaScript.



🍹 Search for drinks by name or ingredient.

🍋 Click on random button to show a random drink.

🍸 Fully responsive design that works on any size screen.


## Optimizations:

Sometimes when you search an ingredient that is also included in a drink's name, it will display the drink two times. Some drink names have words that are not all capitalized. 

## Lessons Learned:

I learned how to iterate through API data and target specific properties. I wanted to be able to search by ingredient and not just the drink name. When you search by drink name and input tequila for example, it would only show drinks that had tequila in the drink name and not all the drinks that are made with tequila. When searching by ingredient, the API doesn't return data for the instructions or list of ingredients/measurements. So I had to search by ingredient, get the ID and then use the ID to search by ID in order to display the information I wanted. I did this by using promises.
