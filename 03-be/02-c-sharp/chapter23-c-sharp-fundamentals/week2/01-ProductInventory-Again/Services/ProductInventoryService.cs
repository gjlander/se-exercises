namespace Services;

using Models;
public class ProductInventoryService : IProductInventoryService
{
  private readonly ICollection<Product> _products = [];
  public IReadOnlyCollection<Product> Products { get; }

  public ProductInventoryService()
  {
    Products = (IReadOnlyCollection<Product>)_products;
  }

  public void Add(Product product)
  {
    _products.Add(product);
  }

  public void Add(IEnumerable<Product> products)
  {
    foreach (var product in products)
    {
      _products.Add(product);
    }
  }

  public bool Remove(Guid id)
  {
    Product? toRemove = null;

    foreach (var prod in _products)
    {
      if (prod.Id == id)
      {
        toRemove = prod;
        break;
      }
    }
    return toRemove is not null && _products.Remove(toRemove);
  }

  public Product? GetById(Guid id)
  {
    Product? product = null;

    foreach (var prod in _products)
    {
      if (prod.Id == id)
      {
        product = prod;
        break;
      }
    }
    return product;
  }
}