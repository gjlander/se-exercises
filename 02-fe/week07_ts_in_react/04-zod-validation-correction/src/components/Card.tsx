import type { Product } from '../types';

const Card = ({ product }: { product: Product }) => {
  return (
    <div className='card bg-base-100 w-96 shadow-sm'>
      <figure>
        <img src={product.thumbnail} alt='Shoes' />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{product.title}</h2>
        <span className='text-xl'>€ {product.price}</span>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary'>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
