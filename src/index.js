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
const basketEmptyNote = document.querySelector('#basket-empty-note');
const basketLink = document.querySelector('#basket-link');

// for each selected element, bind a click event which calls
// `callback` with the value of the element's `data-id` attribute
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
  // if the basket is empty, disable the purchase and clear buttons and show a note
  // otherwise enable them and hide the note
  // @TODO probably could be better
  if (basket.isEmpty()) {
    basketEmptyNote.classList.remove('is-hidden');
    basketPurchaseButton.setAttribute('disabled', 'disabled');
    basketClearButton.setAttribute('disabled', 'disabled');
  } else {
    basketEmptyNote.classList.add('is-hidden');
    basketPurchaseButton.removeAttribute('disabled');
    basketClearButton.removeAttribute('disabled');
  }
  // shake the basket link up and down to signify a change
  basketLink.animate([
    { transform: 'scale(0.9)' },
    { transform: 'scale(1.1)' },
  ],
  {
    duration: 200,
  });
}

// remove all items from the basket and render
function clearBasket() {
  basket.clear();
  renderBasket();
}

// render the basket for the first time
renderBasket();

function querySelectorBindClick(selectors, callback) {
  document.querySelector(selectors).addEventListener('click', callback);
}

// modal setup
const modalDiv = document.querySelector('#modal');

function showModal(content) {
  document.querySelector('html').classList.add('is-clipped');
  modalDiv.classList.add('is-active');
  modalDiv.innerHTML = content;
}

function hideModal() {
  document.querySelector('html').classList.remove('is-clipped');
  modalDiv.classList.remove('is-active');
  modalDiv.innerHTML = '';
}

function modalConfirm(message, callback) {
  showModal(`
    <div class="modal-background"></div>
    <div class="modal-content">
      <p class="is-large">${message}</p>
      <h1>
      <div class="buttons">
        <button id="modal-ok-button" class="button is-primary">Ok</button>
        <button id="modal-cancel-button" class="button">Cancel</button>
      </buttons>
      <button id="modal-close-button" class="modal-close is-large"></button>
    </div>`);

  // bind the close button
  querySelectorBindClick('#modal-close-button', () => {
    callback(false);
    hideModal();
  });

  // bind the ok button
  querySelectorBindClick('#modal-ok-button', () => {
    callback(true);
    hideModal();
  });

  // bind the cancel button
  querySelectorBindClick('#modal-cancel-button', () => {
    callback(false);
    hideModal();
  });
}

// bind the purchase button
basketPurchaseButton.addEventListener('click', () => {
  modalConfirm(
    `would you like to purchase ${basket.totalQuantity} items?`,
    (ok) => {
      if (ok) {
        console.log(`purchase ${basket}`);
        clearBasket();
      }
    },
  );
});

// bind the clear basket button
basketClearButton.addEventListener('click', () => {
  modalConfirm(
    `would you like to clear your ${basket.totalQuantity} items?`,
    (ok) => {
      if (ok) {
        clearBasket();
      }
    },
  );
});

// 'fetch' some items
function fetchItems() {
  return new ItemBank([
    new Item(1, 'Apple', 'The fruit. Keeps the doctor away.'),
    new Item(2, 'Shoes', 'For sale: Nike Air Max, never worn.'),
  ]);
}

// 'fetch' some items
const itemBank = fetchItems();

// render the items
function renderItems() {
  // render the items
  const itemsListElement = document.querySelector('.items-list');
  itemBank.items.forEach((item) => {
    itemsListElement.appendChild(item.render());
  });
}

// render the items for the first time
renderItems();

// add event listeners to the `.add-item-button`s created above
bindOnClickWithId('.add-item-button', (id) => {
  // parse the item's id from its 'data-item' property
  const item = itemBank.getById(id);
  // add it to the basket
  basket.add(item);
  // re-render the basket
  renderBasket();
});
