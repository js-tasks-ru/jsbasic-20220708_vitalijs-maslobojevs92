export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) return;
 
    if (this.isEmpty()) {
      this.onProductUpdate(this.cartItems.push({product, count: 1}));
      return;
    }

    for (let item of this.cartItems) {
      if (item.product.id == product.id) {
        item.count++;
        this.onProductUpdate(item);
        return;
      }
    }

    this.onProductUpdate(this.cartItems.push({product, count: 1}));
  }

  updateProductCount(productId, amount) {
    this.cartItems = this.cartItems.filter((item) => {
      if (item.product.id == productId) {
        item.count += amount;
        this.onProductUpdate(item);

        if (item.count == 0) {
          return false;
        }
      }
      
      this.onProductUpdate(item);
      return true;
    });
  }

  isEmpty() {
    return this.cartItems.length > 0 ? false : true;
  }

  getTotalCount() {
    let totalCount = 0;

    for (let elem of this.cartItems) {
      totalCount += elem.count;
    }

    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;

    for (let elem of this.cartItems) {
      let totalProductPrice = elem.count * elem.product.price;
      totalPrice += totalProductPrice;
    }

    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

