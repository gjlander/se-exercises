import CartBtn from './CartBtn';

const TableRow = ({ product }) => {
    const { image, title, description, count, price } = product;
    return (
        <tr>
            <td>
                <div className='flex items-center gap-3'>
                    <div className='avatar'>
                        <div className='mask mask-squircle h-12 w-12'>
                            <img src={image} alt={title} />
                        </div>
                    </div>
                    <div>
                        <div className='font-bold'>{title}</div>
                        <div className='text-sm opacity-50'>
                            Item Price: ${price.toFixed(2)}
                        </div>
                    </div>
                </div>
            </td>
            <td>{description}</td>
            <th>
                <CartBtn product={product} />
            </th>
            <td> ${(count * price).toFixed(2)}</td>
        </tr>
    );
};

export default TableRow;
