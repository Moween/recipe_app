"use strict";
// Vegetables
const vegetables = [
  'carrot', 'broccoli', 'asparagus', 'cauliflower', 'corn',
  'cucumber', 'green pepper', 'lettuce', 'mushrooms', 'onion', 'potato', 'pumpkin',
  'red pepper', 'tomato', 'beetroot', 'brussel sprouts', 'peas',
  'zucchini', 'radish', 'sweet potato', 'artichoke', 'leek', 'cabbage', 'celery',
];

const spicesRecipe = [
  'chili', 'garlic', 'basil', 'coriander', 'parsley', 'dill',
  'rosemary', 'oregano', 'cinnamon', 'saffron', 'curry',
];

const peasRecipe = ['green bean', 'bean', 'chickpea', 'lentil'];

const fruitsRecipe = [
  'apple', 'apricot', 'avocado', 'banana', 'blackberry',
  'blackcurrant', 'blueberry', 'boysenberry',
  'cherry', 'coconut', 'fig', 'grape', 'grapefruit', 'kiwifruit', 'lemon', 'lime',
  'lychee', 'mandarin', 'mango', 'melon',
  'nectarine', 'orange', 'papaya', 'passion fruit', 'peach', 'pear', 'pineapple',
  'plum', 'pomegranate', 'quince', 'raspberry', 'strawberry', 'watermelon',
];

const confectioneries = ['pudding', 'donuts', 'hamburger', 'pie', 'cake', 'chips', 'pizza', 'popcorn'];

const dessertRecipe = [
  'lasagna', 'poke', 'chocolate', 'croissant', 'arepas',
  'bunny chow', 'pierogi', 'rendang', 'ice cream',
];

const meals = [
  'bbq', 'sausage', 'tacos', 'kebab', 'poutine', 'fries', 'masala', 'paella',
  'som tam', 'toast', 'marzipan', 'tofu', 'ketchup', 'hummus', 'chili', 'maple syrup',
  'parma ham', 'fajitas', 'champ', 'salad', 'pasta',
];

const protein = [
  'sushi', 'pepperoni', 'duck', 'salami', 'beef', 'goat', 'lamb', 'bacon', 'chicken',
  'turkey', 'pork', 'fish', 'crab', 'ham', 'ribs', 'lobster', 'steak', 'seafood',
];

const recipeArr = [
  ...vegetables, ...spicesRecipe, ...confectioneries,
  ...protein, ...meals, ...dessertRecipe, ...peasRecipe, ...fruitsRecipe,
];

const form = document.querySelector('.search');
const recipeList = document.querySelector('.results');
const recipe = document.querySelector('.recipe');
let resultArr = '';

// Create Loader Object
class Loader {
  constructor() {
    this.spinner = document.createElement('div'); 
    this.spinner.className = 'spinner';
    this.spinner.innerHTML = `<img src='src/images/spinner-2.gif' alt='loader'/>`; 
  }
}

const loading = (elemToAppendTo) =>{
  const pageLoader = new Loader();
  elemToAppendTo.append(pageLoader.spinner);
  const loader = document.querySelector('.spinner');
  // loader.classList = 'hidden';
}


// Fetch API
const fetchAPI = async (url) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    throw new Error('could not fetch data');
  }
};

// Recipes
const displaySearchData = (category) => {
  const li = document.createElement('li');
  li.className = 'preview';
  li.setAttribute('data-id', category.recipe_id);
  li.innerHTML += `
  <a class = 'preview__link preview__link--active'
    href=#${category.recipe_id}
  >  
    <figure class="preview__fig">
      <img src=${category.image_url} alt="Test" />
    </figure>
    <div class="preview__data">
      <h4 class="preview__title">${category.title}</h4>
      <p class="preview__publisher">${category.publisher}</p>
      <div class="preview__user-generated">
        <svg>
          <use href="src/img/icons.svg#icon-user"></use>
        </svg>
      </div>
    </div>
  </a>`;
  li.addEventListener('click', handleRecipePage);
  return li;
}

const  error = (message) => {
  const errorWrap = document.createElement('div');
  errorWrap.className = 'error';
  const p = document.createElement('p');
  p.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
  p.innerHTML += message;
  errorWrap.append(p);
  return errorWrap
}


// validate search
const validateSearchQuery = (category) => recipeArr.includes(category);

// Search recipe
const handleSearchRecipe = (e) => {
  e.preventDefault();
  recipeList.innerHTML = '';
  recipe.innerHTML = '';
  document.querySelector('.pagination').style.display = 'none';
  let searchQuery = document.getElementById('search').value;
  searchQuery = searchQuery.toLowerCase();
  loading(recipeList);
  if (!validateSearchQuery(searchQuery)) {
    const errMsg = error('No recipes found for your query. Please try again!');
    recipe.append(errMsg);
  } else {
    fetchAPI(`https://forkify-api.herokuapp.com/api/search?q=${searchQuery}`)
    .then((results) => {
      resultArr = [];
      resultArr.push(...results.recipes);
      paginate(resultArr)
    })
    .catch((err) => {
      recipe.innerHTML = '';
      const errMsg = error(err.message);
      recipe.append(errMsg);
    });
  }  
}

// Button class
class CreatePaginateButtons {
  constructor() {
    this.prevButton = document.createElement('button');
    this.prevButton.classList = 'btn--inline pagination__btn--prev';
    this.prevButton.innerHTML = `
    <svg class="search__icon">
    <use href="src/img/icons.svg#icon-arrow-left"></use>
    </svg>
    <span>Prev</span>`;
    
    this.nextButton = document.createElement('button');
    this.nextButton.classList = 'btn--inline pagination__btn--next';
    this.nextButton.innerHTML = `
    <svg class="search__icon">
    <use href="src/img/icons.svg#icon-arrow-left"></use>
    </svg>
    <span>Next</span>`;
    document.querySelector('.pagination').append(this.prevButton);
    document.querySelector('.pagination').append(this.nextButton);
  }
}

// Variables in use in the Paginate Function.
let currentPage = 1;  
const numberOfElementsToDisplay = 10;
const numPages = () => Math.ceil(resultArr.length / numberOfElementsToDisplay);

// Pagination
const paginate = (arr) => {
  document.querySelector('.pagination').style.display = 'block';
  document.querySelector('.pagination').innerHTML = '';
  // Create buttons
  const paginateButtons = new CreatePaginateButtons();
  const { prevButton, nextButton } = paginateButtons; 
  
  document.querySelector('.pagination__btn--prev').addEventListener('click', prevPage);
  document.querySelector('.pagination__btn--next').addEventListener('click', nextPage);
  changePage(1);
};

// Show Prev Page
const prevPage = () => {
  if (currentPage > 1) {
    currentPage -= 1;
    changePage(currentPage);
  }
}

// Show Next Page
const nextPage = () => {
  if (currentPage < numPages()) {
    currentPage += 1;
    changePage(currentPage);
  }
}

const changePage = (page) => {
  const nextBtn = document.querySelector('.pagination__btn--next');
  const prevBtn = document.querySelector('.pagination__btn--prev');
  
  // Validate Page
  if (page < 1) {
    page = 1;
  }
  
  if (page > numPages()) {
    page = numPages();
  }
  
  recipeList.innerHTML = '';
  
  const newArr = resultArr.map(recipe => {
    const recipes = displaySearchData(recipe);
    return recipes;
  });
  
  
  for (let i = (page - 1) * numberOfElementsToDisplay;
  i < (page * numberOfElementsToDisplay) && i < newArr.length; i++) {
     recipeList.appendChild(newArr[i]);
    }
    
    if (page === 1) {
      prevBtn.style.visibility = 'hidden';
    } else {
      prevBtn.style.visibility = 'visible';
    }
    if (page === numPages()) {
      nextBtn.style.visibility = 'hidden';
    } else {
      nextBtn.style.visibility = 'visible';
    }
};

// fetch recipe details
const handleRecipePage = (e) => {
  e.stopPropagation();
  e.preventDefault();
  console.log(e.target);
  recipe.innerHTML = '';
  const recipeId = e.currentTarget.dataset.id;
  // call fetchAPI with recipeId
  loading(recipe);
  fetchAPI(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`)
  .then((results) => {
    console.log(results);
    for (const obj in results) {
      recipeDetail(results[obj]);
      // render recipePage to the DOM
      recipe.append(recipeDetail(results[obj]))
    }
  })
  .catch((err) => {
    // console.log(err.message);
  });
}

// Display extra recipe details
const recipeDetail = (recipe) => {
  const card = document.createElement('div');
  const figElement = document.createElement('figure');
  figElement.className = 'recipe__fig';
  figElement.innerHTML = `
    <img src=${recipe.image_url} alt="${recipe.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>`;
  const recipeDetails = document.createElement('div');
  recipeDetails.className = 'recipe__details';
  recipeDetails.innerHTML = `
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="src/img/icons.svg#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">45</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="src/img/icons.svg#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">4</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="src/img/icons.svg#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="src/img/icons.svg#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="src/img/icons.svg#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <i class="far fa-heart"></i>
    </button>`        
      // <svg class="">
      //   <use href="src/img/icons.svg#icon-bookmark-fill"></use>
      // </svg>
  card.append(figElement, recipeDetails, createRecipeIngredientsElem(recipe),
  recipeDirectionsElement(recipe));
  return card;  
}

const createRecipeIngredientsElem = (recipe) => {
  let qty = '';
  let unit = '';
  let mainIngredient = '';
  
  getIngredient(recipe.ingredients, qty, unit, mainIngredient);
  const recipeIngredients = document.createElement('div');
  recipeIngredients.className = 'recipe__ingredients';
  recipeIngredients.innerHTML  += `
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list"></ul>
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="src/img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${qty}</div>
          <div class="recipe__description">
            <span class="recipe__unit">${unit}</span>
            ${mainIngredient}
        </div>
      </li>`;
  return recipeIngredients;
}

const getIngredient = (ingreArr, qty, unit, mainIngredient) => 
{
  ingreArr.map(item => {
    console.log(item)  
  })
}


const recipeDirectionsElement = (recipe) =>
{
  const recipeDirElem = document.createElement('div');
  recipeDirElem.className = 'recipe__directions'
  recipeDirElem.innerHTML +=`
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </a>`;  
  return recipeDirElem;
}

const randomSearch = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

const showRandomRecipe = () => {
  let searchQuery = randomSearch(recipeArr);
  let resultsArr = '';  
  return fetchAPI(`https://forkify-api.herokuapp.com/api/search?q=${searchQuery}`)
  .then((results) => {
      resultsArr = [];
      resultsArr.push(...results.recipes);
      let recipeId = randomRecipeId(resultsArr);
      getRandomRecipeDetails(recipeId)
    })
    .catch((err) => {
      console.log(err.message);
    });
}

const randomRecipeId = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)].recipe_id;
}

const createHeadingForRandomRecipe = () =>
{
  const h2 = document.createElement('div');
  h2.className ='h02';
  h2.textContent = 'Recipe of the Day';
  recipe.append(h2);
  return h2;
}

// Display recipes on the homepage
const getRandomRecipeDetails = (recipeId) => {
  let i = 0;
  fetchAPI(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`)
  .then((results) => {
    for (const obj in results) {
      // create a new content by instantiating a new RecipeDetail class
      // render recipePage.card to the DOM
      createHeadingForRandomRecipe();
      recipe.append(recipeDetail(results[obj]))
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
}  

// Add to Favourite 
const addFavouriteRecipe = () => {
  document.querySelector('.btn--round').addEventListener('dbclick', 
  (e) => {
    e.preventDefault();
    const bookMarkedRecipe = localStorage.setItem('recipe', );   
  });
}

// EventListeners
window.addEventListener('load', showRandomRecipe);
form.addEventListener('submit', handleSearchRecipe);
