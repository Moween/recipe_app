/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/***/ (() => {

eval("// Vegetables\nconst vegetables = [\n  'carrot', 'broccoli', 'asparagus', 'cauliflower', 'corn',\n  'cucumber', 'green pepper', 'lettuce', 'mushrooms', 'onion', 'potato', 'pumpkin',\n  'red pepper', 'tomato', 'beetroot', 'brussel sprouts', 'peas',\n  'zucchini', 'radish', 'sweet potato', 'artichoke', 'leek', 'cabbage', 'celery',\n];\n\nconst spicesRecipe = [\n  'chili', 'garlic', 'basil', 'coriander', 'parsley', 'dill',\n  'rosemary', 'oregano', 'cinnamon', 'saffron', 'curry',\n];\n\nconst peasRecipe = ['green bean', 'bean', 'chickpea', 'lentil'];\n\nconst fruitsRecipe = [\n  'apple', 'apricot', 'avocado', 'banana', 'blackberry',\n  'blackcurrant', 'blueberry', 'boysenberry',\n  'cherry', 'coconut', 'fig', 'grape', 'grapefruit', 'kiwifruit', 'lemon', 'lime',\n  'lychee', 'mandarin', 'mango', 'melon',\n  'nectarine', 'orange', 'papaya', 'passion fruit', 'peach', 'pear', 'pineapple',\n  'plum', 'pomegranate', 'quince', 'raspberry', 'strawberry', 'watermelon',\n];\n\nconst confectioneries = ['pudding', 'donuts', 'hamburger', 'pie', 'cake', 'chips', 'pizza', 'popcorn'];\n\nconst dessertRecipe = [\n  'lasagna', 'poke', 'chocolate', 'croissant', 'arepas',\n  'bunny chow', 'pierogi', 'rendang', 'ice cream',\n];\n\nconst meals = [\n  'bbq', 'sausage', 'tacos', 'kebab', 'poutine', 'fries', 'masala', 'paella',\n  'som tam', 'toast', 'marzipan', 'tofu', 'ketchup', 'hummus', 'chili', 'maple syrup',\n  'parma ham', 'fajitas', 'champ', 'salad', 'pasta',\n];\n\nconst protein = [\n  'sushi', 'pepperoni', 'duck', 'salami', 'beef', 'goat', 'lamb', 'bacon', 'chicken',\n  'turkey', 'pork', 'fish', 'crab', 'ham', 'ribs', 'lobster', 'steak', 'seafood',\n];\n\nconst recipeArr = [\n  ...vegetables, ...spicesRecipe, ...confectioneries,\n  ...protein, ...meals, ...dessertRecipe, ...peasRecipe, ...fruitsRecipe,\n];\n\nconst form = document.querySelector('.search');\nconst recipeList = document.querySelector('.results');\nconst recipe = document.querySelector('.recipe');\nlet resultArr;\nlet recipeObj;\nlet favorites = localStorage.getItem('favorites');\nif (favorites) {\n  favorites = JSON.parse(favorites);\n} else {\n  favorites = [];\n  localStorage.setItem('favorites', JSON.stringify([]));\n}\n\nconst searchRandomRecipe = () => {\n  const searchQuery = recipeArr[Math.floor(Math.random() * recipeArr.length)];\n  fetchAPI(`https://forkify-api.herokuapp.com/api/search?q=${searchQuery}`)\n    .then((results) => {\n      const resultsArr = [...results.recipes];\n      const recipeId = resultsArr[Math.floor(Math.random() * resultsArr.length)].recipe_id;\n      displayRandomRecipe(recipeId);\n    })\n    .catch((err) => {\n      const errMsg = error(err.message);\n      recipe.append(errMsg);\n    });\n};\n\n// Display recipes on the homepage\nconst displayRandomRecipe = (recipeId) => {\n  loading(recipe);\n  fetchAPI(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`)\n    .then((result) => {\n      recipeObj = result.recipe;\n      recipe.innerHTML = '';\n      // render recipePage to the DOM\n      createHeading();\n      recipe.append(getExtraRecipeDetail(recipeObj));\n    })\n    .catch((err) => {\n      const errMsg = error(err.message);\n      recipe.append(errMsg);\n    });\n};\n\nconst createHeading = () => {\n  const h2 = document.createElement('div');\n  h2.className = 'h02';\n  h2.textContent = 'Recipe of the Moment';\n  h2.style.color = 'lightsalmon';\n  recipe.append(h2);\n  return h2;\n};\n\n// Create Loader Object\nclass Loader {\n  constructor() {\n    this.spinner = document.createElement('div');\n    this.spinner.className = 'spinner';\n    this.spinner.innerHTML = '<img src=\\'src/images/spinner.gif\\' alt=\\'loader\\'/>';\n  }\n}\n\nconst loading = (elemToAppendTo) => {\n  const pageLoader = new Loader();\n  elemToAppendTo.append(pageLoader.spinner);\n  const loader = document.querySelector('.spinner');\n};\n\n// Fetch API\nconst fetchAPI = async (url) => {\n  try {\n    const response = await fetch(url);\n    return response.json();\n  } catch (error) {\n    throw new Error(error.message);\n  }\n};\n\n// Recipes\nconst getRecipeData = (recipe) => {\n  const li = document.createElement('li');\n  li.className = 'preview';\n  li.setAttribute('data-id', recipe.recipe_id);\n  li.innerHTML += `\n  <a class = 'preview__link preview__link--active'\n    href=#${recipe.recipe_id}\n  >  \n    <figure class=\"preview__fig\">\n      <img src=${recipe.image_url} alt=\"Test\" />\n    </figure>\n    <div class=\"preview__data\">\n      <h4 class=\"preview__title\">${recipe.title}</h4>\n      <p class=\"preview__publisher\">${recipe.publisher}</p>\n      <div class=\"preview__user-generated\">\n        <svg>\n          <use href=\"src/img/icons.svg#icon-user\"></use>\n        </svg>\n      </div>\n    </div>\n  </a>`;\n  li.addEventListener('click', handleRecipePage);\n  return li;\n};\n\nconst error = (message) => {\n  const errorWrap = document.createElement('div');\n  errorWrap.className = 'error';\n  const p = document.createElement('p');\n  p.innerHTML = '<i class=\"fas fa-exclamation-triangle\"></i>';\n  p.innerHTML += message;\n  errorWrap.append(p);\n  return errorWrap;\n};\n\n// validate search\nconst validateSearchQuery = (recipe) => recipeArr.includes(recipe);\n\n// Search recipe\nconst handleSearchRecipe = (e) => {\n  e.preventDefault();\n  recipeList.innerHTML = '';\n  recipe.innerHTML = '';\n  document.querySelector('.pagination').style.display = 'none';\n  let searchQuery = document.getElementById('search').value;\n  searchQuery = searchQuery.toLowerCase();\n  loading(recipeList);\n  if (!validateSearchQuery(searchQuery)) {\n    const errMsg = error('No recipes found for your query. Please try again!');\n    recipe.append(errMsg);\n  } else {\n    fetchAPI(`https://forkify-api.herokuapp.com/api/search?q=${searchQuery}`)\n      .then((results) => {\n        // results is an object with a recipe key in it\n        resultArr = [];\n        resultArr.push(...results.recipes);\n        paginate(resultArr);\n      })\n      .catch((err) => {\n        recipe.innerHTML = '';\n        const errMsg = error(err.message);\n        recipe.append(errMsg);\n      });\n  }\n};\n\n// Button class\nclass CreateButtons {\n  constructor() {\n    this.prevButton = document.createElement('button');\n    this.prevButton.classList = 'btn--inline pagination__btn--prev';\n    this.prevButton.innerHTML = `\n    <i class=\"fas fa-caret-left\"></i>\n    <span>Prev</span>`;\n\n    this.nextButton = document.createElement('button');\n    this.nextButton.classList = 'btn--inline pagination__btn--next';\n    this.nextButton.innerHTML = `\n    <span>Next</span>\n    <i class=\"fas fa-caret-right\"></i>`;\n    document.querySelector('.pagination').append(this.prevButton);\n    document.querySelector('.pagination').append(this.nextButton);\n  }\n}\n\n// Variables in use in the Paginate Function.\nlet currentPage = 1;\nconst numberOfElementsToDisplay = 10;\nconst numPages = () => Math.ceil(resultArr.length / numberOfElementsToDisplay);\n\n// Pagination\nconst paginate = () => {\n  document.querySelector('.pagination').style.display = 'block';\n  document.querySelector('.pagination').innerHTML = '';\n  // Create buttons\n  const paginateButtons = new CreateButtons();\n  const { prevButton, nextButton } = paginateButtons;\n\n  document.querySelector('.pagination__btn--prev').addEventListener('click', prevPage);\n  document.querySelector('.pagination__btn--next').addEventListener('click', nextPage);\n  changePage(1);\n};\n\n// Show Prev Page\nconst prevPage = () => {\n  if (currentPage > 1) {\n    currentPage -= 1;\n    changePage(currentPage);\n  }\n};\n\n// Show Next Page\nconst nextPage = () => {\n  if (currentPage < numPages()) {\n    currentPage += 1;\n    changePage(currentPage);\n  }\n};\n\nconst changePage = (page) => {\n  const nextBtn = document.querySelector('.pagination__btn--next');\n  const prevBtn = document.querySelector('.pagination__btn--prev');\n\n  // Validate Page\n  if (page < 1) {\n    page = 1;\n  }\n\n  if (page > numPages()) {\n    page = numPages();\n  }\n\n  recipeList.innerHTML = '';\n\n  const newArr = resultArr.map((recipe) => {\n    const recipes = getRecipeData(recipe);\n    return recipes;\n  });\n\n  for (let i = (page - 1) * numberOfElementsToDisplay;\n    i < (page * numberOfElementsToDisplay) && i < newArr.length; i += 1) {\n    recipeList.appendChild(newArr[i]);\n  }\n\n  if (page === 1) {\n    prevBtn.style.visibility = 'hidden';\n  } else {\n    prevBtn.style.visibility = 'visible';\n  }\n  if (page === numPages()) {\n    nextBtn.style.visibility = 'hidden';\n  } else {\n    nextBtn.style.visibility = 'visible';\n  }\n};\n\n// fetch recipe details\nconst handleRecipePage = (e) => {\n  e.stopPropagation();\n  e.preventDefault();\n  const recipeId = e.currentTarget.dataset.id;\n  recipe.innerHTML = '';\n  // call fetchAPI with recipeId\n  loading(recipe);\n  fetchAPI(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`)\n    .then((result) => {\n      recipeObj = result.recipe;\n      recipe.innerHTML = '';\n      // render recipePage to the DOM\n      recipe.append(getExtraRecipeDetail(recipeObj));\n    })\n    .catch((err) => {\n      const errMsg = error(err.message);\n      recipe.append(errMsg);\n    });\n};\n\n// Display extra recipe details\nconst getExtraRecipeDetail = (recipe) => {\n  const card = document.createElement('div');\n  const figElement = document.createElement('figure');\n  figElement.className = 'recipe__fig';\n  figElement.innerHTML = `\n    <img src=${recipe.image_url} alt=\"${recipe.title}\" class=\"recipe__img\" />\n    <h1 class=\"recipe__title\">\n      <span>${recipe.title}</span>\n    </h1>`;\n  const recipeDetails = document.createElement('div');\n  recipeDetails.className = 'recipe__details';\n  recipeDetails.innerHTML = `\n    <div class=\"recipe__info\">\n      <svg class=\"recipe__info-icon\">\n        <use href=\"src/images/stopwatch-solid.svg#icon-clock\"></use>\n      </svg>\n      <span class=\"recipe__info-data recipe__info-data--minutes\">45</span>\n      <span class=\"recipe__info-text\">minutes</span>\n    </div>`;\n  const divElem1 = document.createElement('div');\n  divElem1.className = 'recipe__info';\n  divElem1.innerHTML = `\n    <svg class=\"recipe__info-icon\">\n      <use href=\"src/images/user-friends-solid.svg#icon-users\"></use>\n    </svg>\n    <span class=\"recipe__info-data recipe__info-data--people\">4</span>\n    <span class=\"recipe__info-text\">servings</span>\n    <div class=\"recipe__info-buttons\"> \n      <button class=\"btn--tiny btn--increase-servings\" id=\"minus-btn\">\n        <svg>\n          <use href=\"src/images/minus-solid.svg#icon-minus-circle\"></use>\n        </svg> \n      </button>\n      <button class=\"btn--tiny btn--increase-servings\" id=\"plus-btn\">\n        <svg>\n          <use href=\"src/images/plus-solid.svg#icon-plus-circle\"></use>\n        </svg>\n      </button>\n    </div>`;\n\n  const divElem2 = document.createElement('div');\n  divElem2.className = 'recipe__user-generated';\n  divElem2.innerHTML = `\n    <svg>\n      <use href=\"src/img/heart.svg#icon-user\"></use>\n    </svg>`;\n\n  const btn = document.createElement('button');\n  btn.type = 'button';\n  btn.className = 'btn--round';\n  const faIcon = document.createElement('i');\n  faIcon.className = 'fas fa-heart';\n  const fav = favorites.some((elem) => elem.image_url === recipe.image_url);\n  if (fav) {\n    faIcon.style.color = 'red';\n    btn.onclick = handleRemoveFavorite;\n  } else {\n    faIcon.style.color = 'white';\n    btn.onclick = handleAddFavorite;\n  }\n  btn.appendChild(faIcon);\n  recipeDetails.append(divElem1, divElem2, btn);\n  card.append(figElement, recipeDetails,\n    createRecipeIngredientsElem(recipe),\n    recipeDirectionsElement(recipe));\n  const btnTiny = divElem1.querySelectorAll('.recipe__info-buttons .btn--tiny');\n  for (let i = 0; i < btnTiny.length; i += 1) {\n    btnTiny[i].addEventListener('click', (e) => {\n      handleServings(e);\n    });\n  }\n  return card;\n};\n\nconst createRecipeIngredientsElem = (recipe) => {\n  const ingredientsArr = recipe.ingredients;\n  const divElem = document.createElement('div');\n  divElem.className = 'recipe__ingredients';\n  const h2Elem = document.createElement('h2');\n  h2Elem.className = 'heading--2';\n  h2Elem.textContent = 'Recipe ingredients';\n  const ulElem = document.createElement('ul');\n  ulElem.className = 'recipe__ingredient-list';\n  for (const ingredient of ingredientsArr) {\n    const li = document.createElement('li');\n    li.className = 'recipe__ingredient';\n    li.innerHTML += `\n      <svg class=\"recipe__icon\">\n        <use href=\"src/images/check-circle.svg#icon-check\"></use>\n      </svg>          \n      <div class=\"recipe__description\">\n      ${ingredient}\n      </div>`;\n    ulElem.append(li);\n  }\n  divElem.append(h2Elem, ulElem);\n  return divElem;\n};\n\nconst recipeDirectionsElement = (recipe) => {\n  const recipeDirElem = document.createElement('div');\n  recipeDirElem.className = 'recipe__directions';\n  recipeDirElem.innerHTML += `\n    <h2 class=\"heading--2\">How to cook it</h2>\n    <p class=\"recipe__directions-text\">\n    This recipe was carefully designed and tested by\n    <span class=\"recipe__publisher\">${recipe.publisher}</span>. Please check out\n    directions at their website.\n    </p>\n    <a\n    class=\"btn--small recipe__btn\"\n    href=\"http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/\"\n    target=\"_blank\"\n    >\n      <span>Directions</span>\n      <svg class=\"search__icon\">\n      <use href=\"src/images/caret-right.svg#icon-arrow-right\"></use>\n      </svg>\n    </a>`;\n  return recipeDirElem;\n};\n\nconst toggleFav = (e) => {\n  e.currentTarget.onclick = (e.currentTarget.onclick === handleRemoveFavorite\n    ? handleAddFavorite : handleRemoveFavorite);\n  e.target.style.color = (e.target.style.color === 'red' ? 'white' : 'red');\n};\n\n// Handle Favorite Events\n// Add to Favourite\nconst handleAddFavorite = (e) => {\n  e.preventDefault();\n  // create an arr\n  let favs = localStorage.getItem('favorites');\n  favs = JSON.parse(favs);\n  // push the particular recipe (object) to the arr\n  favs.push(recipeObj);\n  // save arr to localStorage;\n  favorites = [...favs];\n  localStorage.setItem('favorites', JSON.stringify(favs));\n  toggleFav(e);\n  appendFavorites();\n};\n\n// Append favorite to DOM\nconst appendFavorites = () => {\n  document.querySelector('.bookmarks__list').innerHTML = '';\n  const favMsg = document.querySelector('.message');\n  if (!favorites.length) {\n    favMsg.style.display = 'block';\n  } else {\n    favMsg.style.display = 'none';\n  }\n  favorites.forEach((recipe) => {\n    // create and render favorites here!!!\n    document.querySelector('.bookmarks__list').appendChild(getRecipeData(recipe));\n  });\n};\n\n// Delete Favorite\nconst handleRemoveFavorite = (e) => {\n  e.preventDefault();\n  let favs = localStorage.getItem('favorites');\n  // Find object to delete;\n  favs = JSON.parse(favs);\n  // Remove a single item (recipeObj) from favorite arr\n  favs = favs.filter((elem) => elem.image_url !== recipeObj.image_url);\n  // Update global favorites arr\n  favorites = [...favs];\n  // Reset local Storage after delete\n  localStorage.setItem('favorites', JSON.stringify(favs));\n  toggleFav(e);\n  appendFavorites();\n};\n\n// Handle Servings\nconst handleServings = (e) => {\n  let value = document.querySelector('.recipe__info .recipe__info-data--people').textContent;\n  value = Number(value);\n  if (e.currentTarget.id === 'plus-btn') {\n    value += 1;\n    document.querySelector('.recipe__info .recipe__info-data--people')\n      .textContent = value;\n  } else if (e.currentTarget.id === 'minus-btn') {\n    if (value !== 1) {\n      value -= 1;\n      document.querySelector('.recipe__info .recipe__info-data--people')\n        .textContent = value;\n      // return;\n    }\n  }\n};\n\n// EventListeners\nwindow.addEventListener('load', searchRandomRecipe);\nwindow.addEventListener('load', appendFavorites);\nform.addEventListener('submit', handleSearchRecipe);\n\n\n//# sourceURL=webpack://recipe_app/./src/js/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/script.js"]();
/******/ 	
/******/ })()
;