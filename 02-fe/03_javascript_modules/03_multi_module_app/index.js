import { fetchProducts } from './modules/network.js';
import { renderProdCard } from './modules/ui.js';

const productsContainer = document.querySelector('#products-container');

const renderProducts = async () => {
  try {
    const allProducts = await fetchProducts();

    allProducts?.forEach(prod => renderProdCard(prod, productsContainer));
  } catch (error) {
    console.error(error);
  }
};

renderProducts();
