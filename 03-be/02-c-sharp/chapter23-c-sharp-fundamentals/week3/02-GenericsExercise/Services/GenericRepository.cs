using GenericsExercise.Models;

namespace GenericsExercise.Services;

public class GenericRepository<T> where T : class, IIdentifiable
{
  private readonly Dictionary<int, T> _store = [];
  public void Add(T item)
  {
    _store[item.Id] = item;
    Console.WriteLine($"Saved entity of type {typeof(T).Name} with Id {item.Id}");
  }
  public T? GetById(int id)
  {
    _store.TryGetValue(id, out T? item);
    return item;
  }

  public bool Update(T item) // replace existing by Id
  {
    if (_store.ContainsKey(item.Id)) return false;
    _store[item.Id] = item;
    return true;
  }

  public bool Delete(int id)
  {
    bool found = _store.TryGetValue(id, out T? _);

    if (!found) return false;

    _store.Remove(id);

    return true;
  }
  public IEnumerable<T> GetAll() => _store.Values;
}