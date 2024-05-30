const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;


app.get('/categories/:categoryname/products', async (req, res) => {
  try {
    const { categoryname } = req.params;
    const { n, page = 1, sort } = req.query;

    const products = await retrieveProducts(categoryname, n, page, sort);

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/categories/:categoryname/products/:productid', async (req, res) => {
  try {
    const { categoryname, productid } = req.params;


    const product = await retrieveProductDetails(categoryname, productid);

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function retrieveProducts(categoryname, n, page, sort) {
 
  const response1 = await axios.get(`http://20.244.56.144/test/products?category=${categoryname}&n=${n}&page=${page}&sort=${sort}`);
  const response2 = await axios.get(`http://20.244.56.144/test/products?category=${categoryname}&n=${n}&page=${page}&sort=${sort}`);

  const products = [...response1.data.products, ...response2.data.products];

  if (sort) {
    products.sort((a, b) => {

    });
  }

  const paginatedProducts = products.slice((page - 1) * n, page * n);
  const productsWithId = paginatedProducts.map(product => ({
    ...product,
    id: uuidv4()
  }));

  return productsWithId;
}
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
