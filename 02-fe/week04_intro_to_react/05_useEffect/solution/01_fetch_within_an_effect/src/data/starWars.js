const getPeople = async (url, abortCont) => {
  const res = await fetch(url, {
    signal: abortCont.signal
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  const data = await res.json();
  return data;
};

export { getPeople };
