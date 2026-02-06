import CartTable from '../components/CartTable';
const Cart = () => {
    return (
        <div className='flex flex-col gap-4 px-6'>
            <h2 className='text-6xl'>Your cart</h2>
            <CartTable />
        </div>
    );
};

export default Cart;
