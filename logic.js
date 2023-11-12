//const Product = require('../MvC/model/product')

//get all product array in file
// Product.fetchAll((productTitle) => {
//     const productArrayLength = productTitle.length
//     console.log(productArrayLength)
//     console.log(productTitle[0].title)
// })


const shoppingCart = [
  { id:1, name: "Item 1", price: 10.99, qty: 4 },
  {id:2, name: "Item 2", price: 5.99, qty: 2 },
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



const incrementOrAddToCart = (cart, newItem) => {
  const existingItem = cart.find((item) => item.id === newItem.id);

  if (existingItem) {
    existingItem.qty++;
    let updatedCart = cart.map((item) =>
      item.id === newItem.id ? { ...item, qty: existingItem.qty } : item
    );
    const totalPrice = calculateTotal(updatedCart);
    console.log("Total Price:", totalPrice);
    return { totalPrice, updatedCart };
  } else {
    cart.push(newItem);
    const totalPrice = calculateTotal(cart);
    console.log("Total Price:", totalPrice);
    return { totalPrice, updatedCart: cart };
  }
};

const newItem = { id: 1, name: "Item 1", price: 10.99 }; // Existing item with the same ID
const updatedCart = incrementOrAddToCart(shoppingCart, newItem);



console.log("Updated Cart:", updatedCart);



console.log('remove from cart logic start here')

const decrementOrRemoveFromCart = (cart, itemToRemove) => {
  //checking if the item to remove exist
  const existingItem = cart.find((item) => itemToRemove.id === item.id);

  if (existingItem) {
    // Decrement the quantity of the item to remove
    existingItem.qty--;

    // If the quantity is zero or negative, remove it from the cart
    if (itemToRemove.qty <= 0) {
      const updatedCart = cart.filter((item) => item.id !== itemToRemove.id);

      const totalPrice = calculateTotal(updatedCart);
      console.log("Total Price:", totalPrice);
      return { totalPrice, updatedCart };
    }

    console.log(existingItem);
    // Update the cart with the modified item
    const updatedCart = cart.map((item) =>
      item.id === itemToRemove.id ? { ...item, qty: existingItem.qty } : item
    );

    const totalPrice = calculateTotal(updatedCart);
    console.log("Total Price:", totalPrice);
    return { totalPrice, updatedCart };
  }
  return cart; // Return the original cart if the item was not found
};





const itemToRemove = { id: 1, name: "Item 1", price: 10.99 };


const updatedCart1 = decrementOrRemoveFromCart(shoppingCart, itemToRemove);
 console.log(updatedCart1);