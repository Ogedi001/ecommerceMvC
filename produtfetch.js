//const Product = require('../MvC/model/product')

//get all product array in file
// Product.fetchAll((productTitle) => {
//     const productArrayLength = productTitle.length
//     console.log(productArrayLength)
//     console.log(productTitle[0].title)
// })


const shoppingCart = [
  { id:1, name: "Item 1", price: 10.99, qty: 2 },
  {id:2, name: "Item 2", price: 5.99, qty: 1 },
  // ... other items
];

//reduce method reduce an array to a single value
//array.reduce(callbackfn(total, curValue, curIndex, array), initialValue);

const calculateTotal = (cart) => {
  // Check if the cart is empty
  if (cart.length === 0) {
    return 0;
  }

  return cart.reduce((total, item) => {
    console.log("initial total: " + total);
    return total + item.price * item.qty;
  }, 0);
};

const totalPrice = calculateTotal(shoppingCart);
console.log("Total Price:", totalPrice);



const addToCart = (cart, newItem) => {
  const existingItem = cart.find(item => item.id === newItem.id)
  if (existingItem) {
    let updatedCart = cart.map(item =>
      item.id ===newItem.id ? {...item, qty: item.qty +=newItem.qty }:item
    )
    const totalPrice = calculateTotal(updatedCart);
    console.log("Total Price:", totalPrice);
    return {totalPrice, updatedCart}
  }

  else {
    cart.push(newItem);
    const totalPrice = calculateTotal(cart);
    console.log("Total Price:", totalPrice);
    return {totalPrice, updatedCart:cart}
  }

}

const newItem = { id: 1, name: "Item A", price: 10, qty: 1 }; // Existing item with the same ID
const updatedCart = addToCart(shoppingCart, newItem);

console.log("Updated Cart:", updatedCart);
