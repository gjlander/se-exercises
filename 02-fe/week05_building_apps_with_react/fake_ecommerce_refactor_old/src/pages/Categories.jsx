import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsInCategory } from '../lib/fakeStore';
import ItemCard from '../components/ItemCard';

const Categories = () => {
    const { category } = useParams();
    const [catProd, setCatProd] = useState([]);
    useEffect(() => {
        getProductsInCategory(category)
            .then((array) => setCatProd(array))
            .catch((err) => console.error(err));
    }, [category]);
    return (
        <div>
            <h1 className='text-6xl text-center mb-8'>{category}</h1>
            <div className='flex flex-wrap justify-center gap-8'>
                {catProd.map((product) => (
                    // <Link to={`store/${product.id}`} key={product.id}>
                    <div key={product.id} className='w-96 h-[500px]'>
                        <ItemCard product={product} />
                    </div>
                    // </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
