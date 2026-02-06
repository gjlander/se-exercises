import { useOutletContext } from 'react-router-dom';
import TableRow from '../components/TableRow';

const Cart = () => {
    const { cart } = useOutletContext();
    const totalCost = cart.reduce(
        (acc, item) => acc + item.price * item.count,
        0
    );
    const cartCount = cart.reduce((acc, item) => acc + item.count, 0);
    return (
        <div className='overflow-x-auto p-4'>
            <table className='table table-zebra'>
                {/* head */}
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Item Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((product) => (
                        <TableRow key={product.id} product={product} />
                    ))}
                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Total items: {cartCount}</th>
                        <th>Total cost: ${totalCost.toFixed(2)}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default Cart;
