import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ProdCard from '../components/ProdCard';
import { getProductsByCategory } from '../data/fakeStore';
const Categories = () => {
    const { category } = useParams();
    const [prodsInCat, setProdsInCat] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const prods = await getProductsByCategory(category);

                setProdsInCat(prods);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [category]);
    return (
        <div className='px-6'>
            <h2 className='text-5xl'>Products in {category}</h2>
            <section className='p-4 grid grid-cols-[repeat(auto-fill,minmax(24rem,1fr))]  gap-6 justify-center'>
                {prodsInCat.map((prod) => (
                    <ProdCard key={prod.id} product={prod} />
                ))}
            </section>
        </div>
    );
};

export default Categories;
