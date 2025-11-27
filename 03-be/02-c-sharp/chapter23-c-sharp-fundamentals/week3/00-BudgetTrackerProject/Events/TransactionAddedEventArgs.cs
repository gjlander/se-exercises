using BudgetTracker.Models;

namespace BudgetTracker.Events;

public sealed class TransactionAddedEventArgs(Transaction transaction, DateTimeOffset timestamp) : EventArgs
{
  public Transaction Transaction { get; } = transaction;
  public DateTimeOffset Timestamp { get; } = timestamp;
}