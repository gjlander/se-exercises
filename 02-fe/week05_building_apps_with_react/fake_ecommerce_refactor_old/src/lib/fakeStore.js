const getAllProducts = async () => {
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};
const getProductsInCategory = async (category) => {
    try {
        const res = await fetch(
            `https://fakestoreapi.com/products/category/${category}`
        );
        const data = await res.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error(error);
    }
};

const getSingleProduct = async (id) => {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};
export { getAllProducts, getProductsInCategory, getSingleProduct };
