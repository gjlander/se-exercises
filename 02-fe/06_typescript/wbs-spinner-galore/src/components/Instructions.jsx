import { useEffect, useState } from 'react';
import { MarkdownHooks } from 'react-markdown';
import rehypeStarryNight from 'rehype-starry-night';

const Instructions = ({ path }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [markdownText, setMarkdownText] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const getMDContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(path, {
          signal: abortController.signal
        });
        if (!res.ok) throw new Error('Something went wrong. Contact your instructor');
        setMarkdownText(await res.text());
      } catch (e) {
        if (e.name === 'AbortError') return;
        setError('Failed to get instructions. Contact your instructor');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    getMDContent();

    return () => abortController.abort();
  }, [path]);

  if (loading)
    return (
      <div className='flex justify-center items-center gap-2 py-10'>
        <span className='loading loading-spinner loading-lg'></span>
        <span>Loading Instructions...</span>
      </div>
    );

  if (error)
    return (
      <div className='alert alert-error shadow-lg'>
        <span>{error}</span>
      </div>
    );

  return (
    <div className='instructions-container'>
      <MarkdownHooks rehypePlugins={[rehypeStarryNight]}>{markdownText}</MarkdownHooks>
    </div>
  );
};

export default Instructions;
