using System.Text.Json;
using BudgetTracker.Models;

namespace BudgetTracker.Services;

public sealed class StorageService
{
  private readonly string _path;
  private readonly JsonSerializerOptions _json = new()
  {
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    WriteIndented = true
  };

  public StorageService(string path)
  {
    _path = path ?? throw new ArgumentNullException(nameof(path));
    Directory.CreateDirectory(Path.GetDirectoryName(_path)!);
    if (!File.Exists(_path)) File.WriteAllText(_path, "[]");
  }

  public async Task SaveAsync(Transaction entry, CancellationToken ct = default)
  {
    var list = (await ReadAllAsync(ct)).ToList();
    list.Add(entry);
    await WriteAllAsync(list, ct);
  }

  public async Task<IReadOnlyList<Transaction>> QueryAsync(Func<Transaction, bool> predicate, CancellationToken ct = default)
  {
    var list = await ReadAllAsync(ct);
    return list.Where(predicate).ToList();
  }

  public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
  {
    var list = (await ReadAllAsync(ct)).ToList();
    var removed = list.RemoveAll(e => e.Id == id) > 0;
    if (removed)
      await WriteAllAsync(list, ct);
    return removed;
  }

  private async Task<IReadOnlyList<Transaction>> ReadAllAsync(CancellationToken ct)
  {
    using var fs = File.Open(_path, FileMode.Open, FileAccess.Read, FileShare.Read);
    return (await JsonSerializer.DeserializeAsync<List<Transaction>>(fs, _json, ct))
           ?? new List<Transaction>();
  }

  private async Task WriteAllAsync(List<Transaction> list, CancellationToken ct)
  {
    using var fs = File.Open(_path, FileMode.Create, FileAccess.Write, FileShare.None);
    await JsonSerializer.SerializeAsync(fs, list, _json, ct);
  }
}