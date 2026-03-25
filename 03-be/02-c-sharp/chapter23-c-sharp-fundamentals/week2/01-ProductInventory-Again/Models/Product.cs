namespace Models;

public class Product
{
  public Guid Id { get; } = Guid.NewGuid();
  public string Name { get; set; } = string.Empty;
  public decimal Price { get; set; }

  public int Stock { get; set; }

}