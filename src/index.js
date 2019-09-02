/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
import './styles.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@fortawesome/fontawesome-free/js/all';
import Basket from './basket';
import Item from './item';
import ItemBank from './itemBank';

// create a basket and its DOM element
// @TODO save the basket between visits using `localStorage` or however it's called
const basket = new Basket();

// select basket ui elements
const basketItemsElement = document.querySelector('#basket-items');
const basketQuantityElement = document.querySelector('#basket-quantity');
const basketPurchaseButton = document.querySelector('#basket-purchase-button');
const basketClearButton = document.querySelector('#basket-clear-button');

// call `.forEach()` on the results of a call to `document.querySelectorAll()`
function bindOnClickWithId(selectors, callback) {
  const elements = document.querySelectorAll(selectors);
  if (elements) {
    elements.forEach((button) => {
      button.addEventListener('click', () => {
        const id = Number.parseInt(button.dataset.id, 10);
        callback(id);
      });
    });
  }
}

// render the whole basket (quantity, items, buttons etc.)
function renderBasket() {
  // clear the existing basket
  basketItemsElement.innerHTML = '';
  // render the items
  basket.items.forEach((basketItem) => {
    basketItemsElement.appendChild(basketItem.render());
  });
  // bind event listeners to the `.basket-delete-one-button`s created above
  bindOnClickWithId('.basket-delete-one-button', (id) => {
    basket.deleteOne(id);
    renderBasket();
  });
  // update the basket quantity
  basketQuantityElement.textContent = basket.totalQuantity.toString();
  // if the basket is empty, disable the purchase and clear buttons
  // otherwise enable them
  if (basket.isEmpty()) {
    basketPurchaseButton.setAttribute('disabled', 'disabled');
    basketClearButton.setAttribute('disabled', 'disabled');
  } else {
    basketPurchaseButton.removeAttribute('disabled');
    basketClearButton.removeAttribute('disabled');
  }
}

// remove all items from the basket and render
function clearBasket() {
  basket.clear();
  renderBasket();
}

// render the basket for the first time
renderBasket();

// bind the purchase button
basketPurchaseButton.addEventListener('click', () => {
  if (confirm(`would you like to purchase ${basket.totalQuantity} items?`)) {
    console.log(basket);
    clearBasket();
  }
});

// bint the clear basket button
basketClearButton.addEventListener('click', () => {
  if (confirm('would you like to clear the basket?')) {
    clearBasket();
  }
});

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

// add event listeners to the `.add-item-button`s created above
bindOnClickWithId('.add-item-button', (id) => {
  // parse the item's id from its 'data-item' property
  const item = itemBank.getById(id);
  // add it to the basket
  basket.add(item);
  // re-render the basket
  renderBasket();
});
