import BasketItem from './basketItem';

class Basket {
  constructor() {
    this.items = new Map();
  }

  // add an item to the basket or increase its quantity by 1 if it's already in the basket
  addItem(item) {
    if (this.items.has(item.id)) {
      this.items.get(item.id).addOne();
    } else {
      this.items.set(item.id, new BasketItem(item));
    }
  }
}

export default Basket;
