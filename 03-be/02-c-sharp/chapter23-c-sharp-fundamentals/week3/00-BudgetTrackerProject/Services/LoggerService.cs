using BudgetTracker.Events;

namespace BudgetTracker.Services;

public class LoggerService
{
  public void Subscribe(TransactionService transaction)
  {
    transaction.TransactionAdded += OnTransactionAdded;
  }

  public void OnTransactionAdded(object? sender, TransactionAddedEventArgs e)
    => Console.WriteLine($"[Log] ");
}