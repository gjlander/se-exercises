// const addToCart = (product) => {
//     const currCart = JSON.parse(localStorage.getItem('cart')) || [];
//     const updatedCart = [...currCart, product];
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
// };

// adding count
const addToCart = (product) => {
    const currCart = JSON.parse(localStorage.getItem('cart')) || [];
    const isInCart = cart.some((prod) => item.id === prod.id);
    let updatedCart = [];

    if (isInCart) {
        updatedCart = currCart.map((item) =>
            item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
    } else {
        const newItem = { ...product, count: 1 };
        updatedCart = [...currCart, newItem];
    }
    localStorage.setItem('cart', JSON.stringify(updatedCart));
};
export { addToCart };
