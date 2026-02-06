import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { getCategories } from '../../data';

const CatList = () => {
  const [cats, setCats] = useState([]);
  // console.log(cats);
  useEffect(() => {
    (async () => {
      try {
        const allCats = await getCategories();

        setCats(allCats);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <div className='flex flex-wrap gap-4'>
      {cats.map(cat => (
        <Link key={cat} to={`/categories/${cat}`}>
          <button className='btn btn-primary btn-outline'>{cat}</button>
        </Link>
      ))}
    </div>
  );
};

export default CatList;
