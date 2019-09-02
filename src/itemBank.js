class ItemBank {
  constructor(items) {
    this.items = new Map();

    items.forEach((item) => this.items.set(item.id, item));
  }

  getById(id) {
    return this.items.get(id);
  }
}

export default ItemBank;
