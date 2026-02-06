import { useState, useEffect } from 'react';
import CatList from '../components/CatList';
import ProdCard from '../components/ProdCard';

import { getProducts } from '../data/fakeStore';
const Home = () => {
    const [products, setProducts] = useState([]);
    // console.log(products);
    useEffect(() => {
        (async () => {
            try {
                const allProds = await getProducts();

                setProducts(allProds);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);
    return (
        <div className='px-6'>
            <CatList />
            <section className='p-4 grid grid-cols-[repeat(auto-fill,minmax(24rem,1fr))]  gap-6 justify-center'>
                {products.map((prod) => (
                    <ProdCard key={prod.id} product={prod} />
                ))}
            </section>
        </div>
    );
};

export default Home;
