const fetchProducts = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);
  const data = await res.json();
  // console.log(data);

  return data;
};

export { fetchProducts };
