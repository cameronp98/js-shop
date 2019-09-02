class BasketItem {
  constructor(item) {
    this.inner = item;
    this.quantity = 1;
  }

  // increment quantity by one
  addOne() {
    this.quantity += 1;
  }

  // decrement quantity if > 0, return true if decremented or false otherwise
  deleteOne() {
    if (this.quantity > 0) {
      this.quantity -= 1;
      return true;
    }
    return false;
  }

  // render an item as a <li class="navbar-item basket-item">
  render() {
    const element = document.createElement('li');
    element.classList.add('navbar-item');
    element.innerHTML = `
      <li class="navbar-item basket-item">
        <p>${this.inner.name} x${this.quantity}</p>
        <button class="button basket-delete-one-button is-small is-danger" data-id="${this.inner.id}">
          <span class="icon is-small">
            <i class="fas fa-minus-square"></i>
          </span>
        </button>
      </li>`;
    return element;
  }
}

export default BasketItem;
