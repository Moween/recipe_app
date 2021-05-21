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
let resultArr;
let recipeObj;
let favorites = localStorage.getItem('favorites');
if(favorites) {
  favorites = JSON.parse(favorites);
}else {
  favorites = [];
  localStorage.setItem('favorites', JSON.stringify([]));
}

    
const searchRandomRecipe = () => {
  const searchQuery = recipeArr[Math.floor(Math.random() * recipeArr.length)];
  fetchAPI(`https://forkify-api.herokuapp.com/api/search?q=${searchQuery}`)
    .then((results) => {
        resultsArr = [...results.recipes];
        const recipeId = resultsArr[Math.floor(Math.random() * resultsArr.length)].recipe_id;
        displayRandomRecipe(recipeId);
      })
    .catch((err) => {
      const errMsg = error(err.message);
      recipe.append(errMsg);
    });
};

// Display recipes on the homepage
const displayRandomRecipe = (recipeId) => {
  loading(recipe);
  fetchAPI(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`)
    .then((result) => {
      recipeObj = result.recipe;
      recipe.innerHTML = '';
      // render recipePage to the DOM
      recipe.append(getExtraRecipeDetail(recipeObj));
    })
    .catch((err) => {
      const errMsg = error(err.message);
      recipe.append(errMsg);
    });
};

const createHeading = () => {
  const h2 = document.createElement('div');
  h2.className = 'h02';
  h2.textContent = 'Recipe of the Moment';
  h2.style.color = 'lightsalmon';
  recipe.append(h2);
  return h2;
};

// Create Loader Object
class Loader {
  constructor() {
    this.spinner = document.createElement('div');
    this.spinner.className = 'spinner';
    this.spinner.innerHTML = '<img src=\'src/images/spinner.gif\' alt=\'loader\'/>';
  }
}

const loading = (elemToAppendTo) => {
  const pageLoader = new Loader();
  elemToAppendTo.append(pageLoader.spinner);
  const loader = document.querySelector('.spinner');
};

// Fetch API
const fetchAPI = async (url) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Recipes
const getRecipeData = (recipe) => {
  const li = document.createElement('li');
  li.className = 'preview';
  li.setAttribute('data-id', recipe.recipe_id);
  li.innerHTML += `
  <a class = 'preview__link preview__link--active'
    href=#${recipe.recipe_id}
  >  
    <figure class="preview__fig">
      <img src=${recipe.image_url} alt="Test" />
    </figure>
    <div class="preview__data">
      <h4 class="preview__title">${recipe.title}</h4>
      <p class="preview__publisher">${recipe.publisher}</p>
      <div class="preview__user-generated">
        <svg>
          <use href="src/img/icons.svg#icon-user"></use>
        </svg>
      </div>
    </div>
  </a>`;
  li.addEventListener('click', handleRecipePage);
  return li;
};

const error = (message) => {
  const errorWrap = document.createElement('div');
  errorWrap.className = 'error';
  const p = document.createElement('p');
  p.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
  p.innerHTML += message;
  errorWrap.append(p);
  return errorWrap;
};

// validate search
const validateSearchQuery = (recipe) => recipeArr.includes(recipe);

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
        paginate(resultArr);
      })
      .catch((err) => {
        recipe.innerHTML = '';
        const errMsg = error(err.message);
        recipe.append(errMsg);
      });
  }
};

// Button class
class CreateButtons {
  constructor() {
    this.prevButton = document.createElement('button');
    this.prevButton.classList = 'btn--inline pagination__btn--prev';
    this.prevButton.innerHTML = `
    <i class="fas fa-caret-left"></i>
    <span>Prev</span>`;

    this.nextButton = document.createElement('button');
    this.nextButton.classList = 'btn--inline pagination__btn--next';
    this.nextButton.innerHTML = `
    <span>Next</span>
    <i class="fas fa-caret-right"></i>`;
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
  const paginateButtons = new CreateButtons();
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
};

// Show Next Page
const nextPage = () => {
  if (currentPage < numPages()) {
    currentPage += 1;
    changePage(currentPage);
  }
};

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

  const newArr = resultArr.map((recipe) => {
    const recipes = getRecipeData(recipe);
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
  const recipeId = e.currentTarget.dataset.id;
  recipe.innerHTML = '';
  // call fetchAPI with recipeId
  loading(recipe);
  fetchAPI(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`)
  .then((result) => {
      recipeObj = result.recipe;
      recipe.innerHTML = '';
      // render recipePage to the DOM
      recipe.append(getExtraRecipeDetail(recipeObj));      
    })
    .catch((err) => {
      const errMsg = error(err.message);
      recipe.append(errMsg);
    });
};

// Display extra recipe details
const getExtraRecipeDetail = (recipe) => {
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
        <use href="src/images/stopwatch-solid.svg#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">45</span>
      <span class="recipe__info-text">minutes</span>
    </div>`;
  const divElem1 = document.createElement('div');
  divElem1.className = "recipe__info";
  divElem1.innerHTML = `
    <svg class="recipe__info-icon">
      <use href="src/images/user-friends-solid.svg#icon-users"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--people">4</span>
    <span class="recipe__info-text">servings</span>
    <div class="recipe__info-buttons"> 
      <button class="btn--tiny btn--increase-servings">
        <svg>
          <use href="src/images/minus-solid.svg#icon-minus-circle"></use>
        </svg> 
      </button>
      <button class="btn--tiny btn--increase-servings" id="plus-btn">
        <svg>
          <use href="src/images/plus-solid.svg#icon-plus-circle"></use>
        </svg>
      </button>
    </div>`

  const divElem2 =  document.createElement('div');
  divElem2.className =  "recipe__user-generated";
  divElem2.innerHTML = `
    <svg>
      <use href="src/img/heart.svg#icon-user"></use>
    </svg>`;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn--round';  
  btn.innerHTML = `<i class="fas fa-heart"></i>`;
  const fav = favorites.some(elem => elem.image_url === recipe.image_url);
  if(fav) {
    btn.onclick = handleRemoveFavorite;
    btn.style.color = 'red';
  }else {
    btn.onclick = handleAddFavorite;
    btn.style.color = 'white';
  }  
  recipeDetails.append(divElem1, divElem2, btn);
  card.append(figElement, recipeDetails, createRecipeIngredientsElem(recipe),
  recipeDirectionsElement(recipe));
  return card;
};


const createRecipeIngredientsElem = (recipe) => {
  const ingredientsArr = recipe.ingredients
  const divElem = document.createElement('div');
  divElem.className = 'recipe__ingredients';
  const h2Elem = document.createElement('h2');
  h2Elem.className = 'heading--2';
  h2Elem.textContent = 'Recipe ingredients';
  const ulElem = document.createElement('ul')
  ulElem.className = 'recipe__ingredient-list'
  for(const ingredient of ingredientsArr) {
    const li = document.createElement('li');
    li.className = 'recipe__ingredient'
    li.innerHTML += `
    <svg class="recipe__icon">
      <use href="src/images/check-circle.svg#icon-check"></use>
      </svg>          
    <div class="recipe__description">
    ${ingredient}
    </div>`;
    ulElem.append(li)
  }
  divElem.append(h2Elem, ulElem);
  return divElem;
};

const recipeDirectionsElement = (recipe) => {
  const recipeDirElem = document.createElement('div');
  recipeDirElem.className = 'recipe__directions';
  recipeDirElem.innerHTML += `
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
      <use href="src/images/caret-right.svg#icon-arrow-right"></use>
      </svg>
    </a>`;
  return recipeDirElem;
};


// Handle Favorite Events
// Add to Favourite
const handleAddFavorite = (e) => {
  e.preventDefault(); 
  // create an arr
  let favs = localStorage.getItem('favorites');
  favs = JSON.parse(favs);
  // push the particular recipe (object) to the arr
  favs.push(recipeObj);
  // save arr to localStorage; 
  favorites = [...favs];
  localStorage.setItem('favorites', JSON.stringify(favs));
  e.target.onclick = handleRemoveFavorite;
  e.target.style.color = 'red';
  appendFavorites();
};

const appendFavorites = () => {  
  document.querySelector('.bookmarks__list').innerHTML = '';
  const favMsg = document.querySelector('.message');
  if(!favorites.length) {
    favMsg.style.display = 'block';
  }else {
    favMsg.style.display = 'none';
  }
  favorites.forEach(recipe => {
    // create and render favorites here!!!
    document.querySelector('.bookmarks__list').appendChild(getRecipeData(recipe));    
  });
}

const handleRemoveFavorite = (e) => {
  e.preventDefault();
  let favs = localStorage.getItem('favorites');
  // Find object to delete;
  favs = JSON.parse(favs);
  // Remove a single item (recipeObj) from favorite arr 
  favs = favs.filter(elem => elem.image_url !== recipeObj.image_url);
  // Update global favorites arr 
  favorites = [...favs];
  // Reset local Storage after delete
  localStorage.setItem('favorites', JSON.stringify(favs));
  e.target.onclick = handleAddFavorite;
  e.target.style.color = 'white';
  appendFavorites();
  handleAddFavorite();
}


// EventListeners
window.addEventListener('load', searchRandomRecipe);
window.addEventListener('load', appendFavorites);
form.addEventListener('submit', handleSearchRecipe);
