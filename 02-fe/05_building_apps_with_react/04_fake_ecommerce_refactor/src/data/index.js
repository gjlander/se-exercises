const getProducts = async () => {
	const res = await fetch('https://fakestoreapi.com/products');
	if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

	const data = await res.json();
	// console.log(data);

	return data;
};

const getProductsByCategory = async category => {
	const res = await fetch(
		`https://fakestoreapi.com/products/category/${category}`
	);
	if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

	const data = await res.json();

	const fixedImg = data.map(item => ({
		...item,
		image: item.image.replace('.jpg', 't.png')
	}));

	return fixedImg;
};

const getCategories = async () => {
	const res = await fetch('https://fakestoreapi.com/products/categories');
	if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

	const data = await res.json();
	// console.log(data);

	return data;
};

export { getProducts, getProductsByCategory, getCategories };
