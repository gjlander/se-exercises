import express from 'express';
import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } from './controllers/products.js';

const app = express();
const port = 3000;

app.use(express.json());

app.route('/products').get(getAllProducts).post(createProduct);

app.route('/products/:id').get(getProductById).put(updateProduct).delete(deleteProduct);

app.listen(port, () => console.log(`Server is running on port ${port}`));
