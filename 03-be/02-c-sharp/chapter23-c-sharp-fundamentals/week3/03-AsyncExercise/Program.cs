using System.Diagnostics;
async Task<string> SimulateDownloadAsync(string fileName, int ms)
{

  if (fileName.Contains("fail", StringComparison.CurrentCultureIgnoreCase))
  {
    throw new InvalidOperationException($"Download failed for {fileName}");
  }

  Console.WriteLine($"Starting {fileName}...");
  await Task.Delay(ms);
  Console.WriteLine($"Finished {fileName}!");

  return $"Contents of {fileName}";

}

// Optional spinner that proves we aren't blocking the thread while awaiting
async Task SpinnerUntilCompleted(Task t)
{
  char[] frames = ['|', '/', '-', '\\'];
  var i = 0;
  while (!t.IsCompleted)
  {
    int currentFrame = i % frames.Length;
    Console.Write($"\rWorking {frames[currentFrame]}");
    await Task.Delay(100); // yields; caller thread is free between ticks
    i++;
  }
  Console.WriteLine("\rDone            ");
}

Console.WriteLine("== Sequential downloads ==");
var sw = Stopwatch.StartNew();
await SimulateDownloadAsync("fileA.txt", 1000);
await SimulateDownloadAsync("fileB.txt", 1200);
sw.Stop();
Console.WriteLine($"Sequential elapsed: {sw.ElapsedMilliseconds} ms\n");

Console.WriteLine("== Parallel downloads (Task.WhenAll) ==");
sw.Restart();
var t1 = SimulateDownloadAsync("fileC.txt", 1000);
var t2 = SimulateDownloadAsync("fileD.txt", 1200);
var results = await Task.WhenAll(t1, t2);
sw.Stop();
Console.WriteLine($"Parallel elapsed:  {sw.ElapsedMilliseconds} ms");
Console.WriteLine($"Results: [{string.Join(", ", results)}]\n");

Console.WriteLine("== Error handling with async/await ==");
try
{
  var bad = await SimulateDownloadAsync("fail_me.txt", 500);
  Console.WriteLine(bad); // won't reach here
}
catch (Exception ex)
{
  Console.WriteLine($"Caught error: {ex.Message}\n");
}

Console.WriteLine("== Non-blocking spinner while downloads run ==");
var longTask = Task.WhenAll(
    SimulateDownloadAsync("fileE.txt", 2000),
    SimulateDownloadAsync("fileF.txt", 2200)
);
var spin = SpinnerUntilCompleted(longTask);
await Task.WhenAll(longTask, spin);
Console.WriteLine("All done.");