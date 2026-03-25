using Models;
using Services;
string choice = "";
var productService = new ProductInventoryService();

while (choice != "7")
{
  Console.WriteLine();
  Console.WriteLine("Inventory Menu");
  Console.WriteLine("1) Add Product");
  Console.WriteLine("2) Add Products in bulk");
  Console.WriteLine("3) List all products");
  Console.WriteLine("4) Get product by Id");
  Console.WriteLine("5) Remove Product");
  Console.WriteLine("6) Get product by name");
  Console.WriteLine("7) Exit");

  choice = ReadNonEmpty("Choose an option (1-7): ").ToLower();

  switch (choice)
  {
    case "1":
      var name = ReadNonEmpty("Product name: ");
      var price = ReadDecimal("Price: ");
      var stock = ReadInt("Stock: ");

      var newProduct = new Product
      {
        Name = name,
        Price = price,
        Stock = stock
      };

      productService.Add(newProduct);

      Console.WriteLine($"Product Added with values:\nId: {newProduct.Id}\n\tName: {newProduct.Name}\n\tPrice: {newProduct.Price}\n\tStock: {newProduct.Stock}");
      break;
    case "2":
      var numberToAdd = ReadInt("Number of products to add: ");
      var newProducts = new List<Product>();
      for (int i = 0; i < numberToAdd; i++)
      {
        var prodName = ReadNonEmpty("Product name: ");
        var prodPrice = ReadDecimal("Price: ");
        var prodStock = ReadInt("Stock: ");

        var prodToAdd = new Product
        {
          Name = prodName,
          Price = prodPrice,
          Stock = prodStock
        };
        newProducts.Add(prodToAdd);
      }
      productService.Add(newProducts);
      break;
    case "3":
      foreach (var prod in productService.Products)
      {
        Console.WriteLine($"Id: {prod.Id}\n\tName: {prod.Name}\n\tPrice: {prod.Price}\n\tStock: {prod.Stock}\n\n");
      }
      break;
    case "4":
      var prodId = ReadGuid("Product Id:");
      var foundProd = productService.GetById(prodId);

      if (foundProd is null)
      {
        Console.WriteLine("Product not found");
      }
      else
      {
        Console.WriteLine($"Id: {foundProd.Id}\n\tName: {foundProd.Name}\n\tPrice: {foundProd.Price}\n\tStock: {foundProd.Stock}");
      }
      break;
    case "5":
      var prodIdToRemove = ReadGuid("Product Id: ");
      var removed = productService.Remove(prodIdToRemove);

      if (!removed)
      {
        Console.WriteLine("Product not found");
      }
      else
      {
        Console.WriteLine("Removed.");
      }
      break;
    case "6":
      Console.WriteLine("WIP. Come back soon!");
      break;

    case "7":
      Console.WriteLine("Goodbye!");
      break;
    default:
      Console.WriteLine("Invalid option. Please choose 1-7.");
      break;
  }
}

string ReadNonEmpty(string prompt = "")
{
  while (true)
  {
    Console.Write(prompt);
    string? input = Console.ReadLine();

    if (!string.IsNullOrWhiteSpace(input))
      return input.Trim();

    Console.WriteLine("Please enter a non-empty value.");
  }
}

decimal ReadDecimal(string prompt = "")
{
  while (true)
  {
    Console.Write(prompt);
    string? input = Console.ReadLine();

    if (decimal.TryParse(input, out decimal n))
      return n;

    Console.WriteLine("Please enter a valid decimal.");
  }
}
int ReadInt(string prompt = "")
{
  while (true)
  {
    Console.Write(prompt);
    string? input = Console.ReadLine();

    if (int.TryParse(input, out int n))
      return n;

    Console.WriteLine("Please enter a valid integer.");
  }
}
Guid ReadGuid(string prompt = "")
{
  while (true)
  {
    Console.Write(prompt);
    string? input = Console.ReadLine();

    if (Guid.TryParse(input, out Guid n))
      return n;

    Console.WriteLine("Please enter a valid Guid.");
  }
}