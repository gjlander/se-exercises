const checkInCart = (cart, product) =>
	cart?.find((item) => product.id === item.id);

const calcCartCost = (cart) => {
	// return cart.reduce((acc, item) => acc + item.price * item.count, 0);
	let totalCost = 0;
	cart.forEach((item) => (totalCost += item.count * item.price));
	return totalCost;
};

const calcCartCount = (cart) => {
	let totalCount = 0;
	// return cart.reduce((acc, item) => acc + item.count, 0);
	cart.forEach((item) => (totalCount += item.count));
	return totalCount;
};

const addToCart = (cart, product) => {
	const prodInCart = checkInCart(cart, product);
	let updatedCart = [];

	if (!prodInCart) {
		const newItem = { ...product, count: 1 };
		updatedCart = [...cart, newItem];
	} else {
		//find item and increase the count
		updatedCart = cart.map((item) =>
			item.id === product.id ? { ...item, count: item.count + 1 } : item
		);
	}
	localStorage.setItem('cart', JSON.stringify(updatedCart));
	return updatedCart;
};

const removeFromCart = (cart, product) => {
	const prodInCart = checkInCart(cart, product);
	let updatedCart = [];

	if (prodInCart.count === 1) {
		updatedCart = cart.filter((item) => product.id !== item.id);
	} else {
		//find item and decrease the count
		updatedCart = cart.map((item) =>
			item.id === product.id ? { ...item, count: item.count - 1 } : item
		);
	}
	localStorage.setItem('cart', JSON.stringify(updatedCart));
	return updatedCart;
};

const formatPrice = (price) =>
	new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
		price
	);

export {
	addToCart,
	calcCartCost,
	calcCartCount,
	checkInCart,
	removeFromCart,
	formatPrice
};
