import { useParams } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import { getSingleProduct } from '../lib/fakeStore';
import { useState, useEffect } from 'react';
const Item = () => {
    const { id } = useParams();
    const [prod, setProd] = useState();
    useEffect(() => {
        getSingleProduct(id)
            .then((array) => setProd(array))
            .catch((err) => console.error(err));
    }, [id]);

    return (
        <div className='w-3/4 max-w-[600px] max-h-[600px] m-auto'>
            {prod && <ItemCard product={prod} />}
        </div>
    );
};

export default Item;
