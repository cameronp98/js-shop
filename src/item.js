class Item {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  render() {
    const element = document.createElement('li');
    element.classList.add('box');
    element.innerHTML = `
      <p class="title is-4">${this.name}</p>
      <blockquote>${this.description}</blockquote>
      <hr>
      <a class="button is-success add-item-button" data-id="${this.id}">
          <span class="icon is-small">
              <i class="fas fa-shopping-basket fa-sm"></i>
          </span>
          <span>Add to basket</span>
      </a>`;
    return element;
  }
}

export default Item;
