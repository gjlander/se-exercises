using JournalApp.Services;
using JournalApp.Storage;
using JournalApp.Tests.Mocks;

public class JournalServiceTests
{
  [Fact]
  public async Task AddEntryASync_TrimsAndSaves()
  {
    IJournalStore fakeStore = new FakeJournalStore();
    var service = new JournalService(fakeStore);
    var entry = await service.AddEntryAsync("    hello   ");
    Assert.Equal("hello", entry.Content);
  }

  [Fact]
  public async Task AddEntrySync_RejectsEmpty()
  {
    IJournalStore fakeStore = new FakeJournalStore();
    var service = new JournalService(fakeStore);

    await Assert.ThrowsAsync<ArgumentException>(async () => await service.AddEntryAsync("   "));
  }
  [Fact]
  public async Task AddEntrySync_AcceptsCustomTimestamp()
  {
    IJournalStore fakeStore = new FakeJournalStore();
    var service = new JournalService(fakeStore);
    var timestamp = new DateTimeOffset(2025, 11, 3, 12, 10, 30, new TimeSpan(1, 0, 0));
    var entry = await service.AddEntryAsync("test", timestamp);
    Assert.Equal(timestamp, entry.Timestamp);
  }

  [Fact]
  public async Task SearchAsync_CaseInsensitiveContains()
  {
    IJournalStore fakeStore = new FakeJournalStore();
    var service = new JournalService(fakeStore);
    List<string> testEntries = ["day",
    "Day" ,
    "dAy" ,
    "daY" ,
    "DAY" ,
    "something else"
    ];

    foreach (var test in testEntries)
    {
      await service.AddEntryAsync(test);
    }

    var searchResults = await service.SearchAsync("day");
    Assert.Equal(5, searchResults.Count);
    foreach (var result in searchResults)
    {

      Assert.Contains("day", result.Content.ToLower());
      Assert.DoesNotContain("something", result.Content.ToLower());
    }

  }
}