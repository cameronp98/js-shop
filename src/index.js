/* eslint-disable no-console */
import './styles.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@fortawesome/fontawesome-free/js/all';
import Basket from './basket';
import Item from './item';
import ItemBank from './itemBank';

// create a basket and its DOM element
const basket = new Basket();

const basketItemsElement = document.querySelector('#basket-items');

// render every every item in the basket
function renderBasket() {
  basketItemsElement.innerHTML = '';
  basket.items.forEach((entry) => {
    basketItemsElement.appendChild(entry[1].render());
  });
}

// render the basket for the first time
renderBasket();

// 'fetch' some items to display and manage
const itemBank = new ItemBank([
  new Item(1, 'Nike AirJordan', 'Big Shoes, Nigga.'),
  new Item(2, 'Valentino White Leather Bag', 'Whwhwhwahahwhw'),
]);

// render the items
const itemsListElement = document.querySelector('.items-list');
itemBank.items.forEach((item) => {
  itemsListElement.appendChild(item.render());
});

// add event listeners to the `.add-item-button`s in each of the items we just rendered
const addItemButtons = document.querySelectorAll('.add-item-button');

if (addItemButtons) {
  // add 'click' event listener to all buttons
  addItemButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // parse the item's id from its 'data-item' property
      const id = Number.parseInt(button.dataset.id, 10);
      const item = itemBank.getById(id);
      // add it to the basket
      basket.addItem(item);
      // re-render the basket
      renderBasket();
    });
  });
}
