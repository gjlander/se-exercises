import { useOutletContext } from 'react-router';
import { calcCartCost, formatPrice } from '../../utils';
import { TableRow } from '..';

const CartTable = () => {
  const { cart } = useOutletContext();
  const cartCost = formatPrice(calcCartCost(cart));
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
          {cart.map(prod => (
            <TableRow key={prod.id} product={prod} />
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th>Total cost: {cartCost}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CartTable;
