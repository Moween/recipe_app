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

// Recipe Class
class DisplayRecipe {
  constructor(category) {
    this.li = document.createElement('li');
    this.li.className = 'preview';
    const a = document.createElement('a');
    a.classList = 'preview__link preview__link--active';
    a.setAttribute('href', `https://forkify-api.herokuapp.com/api/get?rId=${category.recipe_id}`);
    a.setAttribute('data-id', category.recipe_id);
    a.addEventListener('click', handleRecipePage);
    a.innerHTML = `
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
        </div>`;
    this.li.appendChild(a);
  }
}

class Error {
  constructor(message) {
    this.errorWrap = document.createElement('div');
    this.errorWrap.className = 'error';
    const p = document.createElement('p');
    p.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
    p.innerHTML += message;
    this.errorWrap.append(p);
  }
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

// validate search
const validateSearchQuery = (category) => recipeArr.includes(category);

// Search recipe
const handleSearchRecipe = (e) => {
  e.preventDefault();
  let searchQuery = document.getElementById('search').value;
  searchQuery = searchQuery.toLowerCase();
  if (!validateSearchQuery(searchQuery)) {
    const errMsg = new Error('No recipes found for your query. Please try again!');
    card.append(errMsg.errorWrap);
  } else {
    fetchAPI(`https://forkify-api.herokuapp.com/api/search?q=${searchQuery}`)
      .then((results) => {
        resultArr = [];
        resultArr.push(...results.recipes);
        resultArr.forEach((recipe) => {
          const thisRecipe = new DisplayRecipe(recipe);
          recipeList.appendChild(thisRecipe.li);
        });
      })
      .catch((err) => {
        // console.log(err.message);
      });
  }
};

