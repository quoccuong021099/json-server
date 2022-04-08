const faker = require("faker");
const fs = require("fs");
// sets locale to vi
faker.locale = "vi";

const randomCategoryList = (n) => {
  if (n <= 0) return [];
  const categoryList = [];

  // loop and push category
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    categoryList.push(category);
  });
  return categoryList;
};

const randomProductList = (categoryList, n) => {
  if (n <= 0) return [];
  const productList = [];

  // random data
  for (const category of categoryList) {
    Array.from(new Array(n)).forEach(() => {
      const product = {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number.parseFloat(faker.commerce.price()),
        color: faker.commerce.color(),
        image: faker.image.imageUrl(400, 400),
        categoryId: category.id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      productList.push(product);
    });
  }

  return productList;
};

(() => {
  // Random data
  const categoryList = randomCategoryList(4);
  const productList = randomProductList(categoryList, 5);

  // prepare db object
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: "Dady",
    },
  };
  // write db object to db.json
  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("Generate data successfully");
  });
})();
