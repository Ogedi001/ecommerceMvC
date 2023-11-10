const fs = require("fs");
const path = require("path");

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   "Data",
//   "product.json"
// );

// module.exports = class Product {
//   constructor(title) {
//     this.title = title;
//   }

//   save() {
//     fs.readFile(p, (err, fileContent) => {
//       let products = [];
//       if (!err)
//         //if no error means, theres existing json string
//         //converting existing product data from json string to js object or array(whatever in the file)
//         //this allows for manipulation of the data in the file
//         products = JSON.parse(fileContent);

//       //pushing all object data to the products array using 'this'
//       products.push(this);
//       //writefile method is used in readfile method, to write to array, immediately after reading file
//       fs.writeFile(p, JSON.stringify(products), (err) => {
//         console.log(err);
//       });
//     });
//   }
// //   static fetchAll() {
// //       try {
// //         //read file synchronousely
// //           const fileContent = fs.readFileSync(p, "utf8");
// //           //return data as js so that it can't be manipulated as array of objects
// //       return JSON.parse(fileContent);
// //     } catch (error) {
// //       return [];
// //     }
//     //   }

//     //fetchAll reads file and perform a fuction when done reading
//     static fetchAll(callback) {
//         fs.readFile(p, (errr, fileContent) => {
//             if (errr) {
//                 callback([])
//             }
//             callback(JSON.parse(fileContent))
//         })
//     }
// };

//********************** */
//code refactoring to avoid reusing of code
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

//read through file and return all array of products in file
const getProductFromFile = (callback) => {
  fs.readFile(p, (errr, fileContent) => {
    if (errr) {
      callback([]);
    }
    callback(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;

    //adding an Id to constructor
    //this.id = Math.random().toString();
  }

  save() {
    //adding an Id before saving
    this.id = Math.random().toString();
    getProductFromFile((products) => {
      //pushing all object data to the products array using 'this'
      products.push(this);
      //writefile method is used in readfile method, to write to array, immediately after reading file
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  //fetchAll reads file and perform a fuction when done reading
  static fetchAll(cb) {
    getProductFromFile(cb);
  }

  //static method that return a product that matches the id, after reading all product.
  static findById(id,callback) {
  getProductFromFile(products => {
    const product = products.find(product => product.id === id)
    callback(product)
  })
  }
};


