import { use, useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Instructions, SearchForm, SearchResults } from '../components';
import { searchProducts } from '../api';

const productsPromise = searchProducts();
const searchAction = async (prevState, formData) => {
  const category = formData.get('category');
  const minPrice = +formData.get('minPrice') || undefined;
  const maxPrice = +formData.get('maxPrice') || undefined;
  const query = formData.get('query');

  const { error, products } = await searchProducts({
    category,
    minPrice,
    maxPrice,
    query
  });
  return { error, products };
};

const Search = () => {
  const [state, formAction, isPending] = useActionState(searchAction, use(productsPromise));
  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);
  return (
    <div className='flex flex-col items-center'>
      <SearchForm formAction={formAction} isPending={isPending} />
      <SearchResults products={state.products} />
      <Instructions path='/search.md' />
    </div>
  );
};

export default Search;
