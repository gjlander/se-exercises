import { /*Link,*/ useOutletContext } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
const Home = () => {
    const { products } = useOutletContext();

    return (
        <div>
            <div className='flex flex-wrap justify-center gap-8'>
                {products.map((product) => (
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

export default Home;
