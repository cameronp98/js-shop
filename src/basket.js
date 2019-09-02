import BasketItem from './basketItem';

class Basket {
  constructor() {
    this.items = new Map();
  }

  // add an item to the basket or increase its quantity by 1 if it's already in the basket
  add(item) {
    if (this.items.has(item.id)) {
      this.items.get(item.id).addOne();
    } else {
      this.items.set(item.id, new BasketItem(item));
    }
  }

  // delete the item if it exists and return true if did exist or false if it did not
  deleteOne(id) {
    if (this.items.has(id)) {
      const item = this.items.get(id);
      item.deleteOne();
      // remove the item from the basket if its quantity is 0
      if (item.quantity === 0) {
        this.items.delete(id);
      }
    }
  }

  // return the total number of items in the basket
  get totalQuantity() {
    let totalQuantity = 0;
    this.items.forEach((item) => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  }

  // determine if the basket contains any items or not
  isEmpty() {
    return !Number.isNaN(this.totalQuantity) && this.totalQuantity === 0;
  }

  // clear all items
  clear() {
    this.items = new Map();
    // eslint-disable-next-line no-console
    console.log('cleared the basket');
  }
}

export default Basket;
