const addToCart = (cart, item) => {
    const isInCart = cart.some((prod) => item.id === prod.id);
    let updatedCart = [];
    if (isInCart) {
        updatedCart = cart.map((prod) =>
            prod.id === item.id ? { ...prod, count: prod.count + 1 } : prod
        );
    } else {
        const cartItem = { ...item, count: 1 };
        updatedCart = [...cart, cartItem];
    }
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return updatedCart;
};

const removeFromCart = (cart, item) => {
    const itemInCart = cart.find((prod) => item.id === prod.id);
    let updatedCart = [];
    if (itemInCart.count === 1) {
        updatedCart = cart.filter((prod) => prod.id !== item.id);
    } else {
        updatedCart = cart.map((prod) =>
            prod.id === item.id ? { ...prod, count: prod.count - 1 } : prod
        );
    }
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return updatedCart;
};

export { addToCart, removeFromCart };
