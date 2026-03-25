namespace Services;

using Models;
public interface IProductInventoryService
{
  void Add(Product product);
  void Add(IEnumerable<Product> products);
  bool Remove(Guid id);

  Product? GetById(Guid id);
}