import { useOutletContext } from 'react-router';
import { addToCart, checkInCart, removeFromCart } from '../utils/cartUtils';
const CartBtns = ({ product }) => {
    const { cart, setCart } = useOutletContext();
    const prodInCart = checkInCart(cart, product);
    const handleAddToCart = () => {
        setCart((prev) => addToCart(prev, product));
    };
    const handleRemoveFromCart = () => {
        setCart((prev) => removeFromCart(prev, product));
    };
    return (
        <>
            {prodInCart ? (
                <div className='flex gap-2 items-baseline'>
                    <button
                        onClick={handleRemoveFromCart}
                        className='btn btn-primary'
                    >
                        -
                    </button>
                    <span>{prodInCart.count}</span>
                    <button
                        onClick={handleAddToCart}
                        className='btn btn-primary'
                    >
                        +
                    </button>
                </div>
            ) : (
                <button onClick={handleAddToCart} className='btn btn-primary'>
                    Add to cart
                </button>
            )}
        </>
    );
};

export default CartBtns;
