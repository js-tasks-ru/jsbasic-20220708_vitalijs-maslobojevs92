export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }
  
  addProduct(product) {
    if (!product) return;

    let item = { product, count: 1 };

    for (let item of this.cartItems) {
      if (item.product.id == product.id) {
        item.count++;
        this.onProductUpdate(item);

        return;
      }
    }

    this.cartItems.push(item);
    this.onProductUpdate(item);
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((item, index) => {
      if (item.product.id == productId) {
        item.count += amount;

        if (item.count == 0) {
          this.cartItems.splice(index, 1);
        }
        
        this.onProductUpdate(item);
      }
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

