import { useOutletContext } from 'react-router';
import { calcCartCost } from '../utils/cartUtils';
import TableRow from './TableRow';
const CartTable = () => {
    const { cart } = useOutletContext();
    const cartCost = calcCartCost(cart);
    return (
        <div className='overflow-x-auto border-2 rounded-lg'>
            <table className='table'>
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((prod) => (
                        <TableRow key={prod.id} product={prod} />
                    ))}
                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Total cost: {cartCost.toFixed(2)}€</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default CartTable;
