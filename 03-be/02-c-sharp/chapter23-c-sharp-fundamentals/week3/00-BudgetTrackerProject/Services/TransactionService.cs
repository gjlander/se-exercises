using BudgetTracker.Events;
using BudgetTracker.Models;


namespace BudgetTracker.Services;

public class TransactionService
{
  private readonly StorageService _store;
  public event EventHandler<TransactionAddedEventArgs>? TransactionAdded;

  public TransactionService(StorageService store) => _store = store;

  public async Task<Transaction> AddEntryAsync(TransactionType type, string description, decimal amount)
  {
    // if (string.IsNullOrWhiteSpace(content))
    //   throw new ArgumentException("Content cannot be empty.", nameof(content));

    var entry = new Transaction
    {
      Type = type,
      Description = description,
      Amount = amount
    };
    await _store.SaveAsync(entry);
    return entry;
  }

  // public Task<IReadOnlyList<Transaction>> SearchAsync(string keyword)
  // {
  //   keyword ??= string.Empty;
  //   return _store.QueryAsync(e =>
  //       string.IsNullOrWhiteSpace(keyword) ||
  //       e.Content.Contains(keyword, StringComparison.OrdinalIgnoreCase));
  // }

  public Task<bool> DeleteAsync(Guid id) => _store.DeleteAsync(id);

  protected virtual void OnBookAdded(TransactionAddedEventArgs e) => TransactionAdded?.Invoke(this, e);
}