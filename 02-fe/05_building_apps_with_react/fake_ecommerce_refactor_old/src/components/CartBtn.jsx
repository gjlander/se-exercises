import { useOutletContext } from 'react-router-dom';
import { addToCart, removeFromCart } from '../utils/cartUtils';

const CartBtn = ({ product }) => {
    const { cart, setCart } = useOutletContext();
    const itemInCart = cart.find((item) => product.id === item.id);

    if (!itemInCart)
        return (
            <button
                onClick={() => setCart((prev) => addToCart(prev, product))}
                className='btn btn-primary'
            >
                Add to cart
            </button>
        );

    return (
        <div className='flex gap-2 items-center'>
            <button
                onClick={() => setCart((prev) => removeFromCart(prev, product))}
                className='btn btn-primary'
            >
                -
            </button>
            <p>{itemInCart.count}</p>
            <button
                onClick={() => setCart((prev) => addToCart(prev, product))}
                className='btn btn-primary'
            >
                +
            </button>
        </div>
    );
};

export default CartBtn;
