class BasketItem {
  constructor(item) {
    this.item = item;
    this.quantity = 1;
  }

  addOne() {
    this.quantity += 1;
  }

  render() {
    const element = document.createElement('li');
    element.classList.add('navbar-item');
    element.innerHTML = `
      <li class="navbar-item basket-item">
        <p>${this.item.name}</p>
        <a href="#delete" class="button is-small is-danger">
        <span class="icon is-small">
          <i class="fas fa-minus-square"></i>
          </span>
        </a>
      </li>`;
    return element;
  }
}

export default BasketItem;
