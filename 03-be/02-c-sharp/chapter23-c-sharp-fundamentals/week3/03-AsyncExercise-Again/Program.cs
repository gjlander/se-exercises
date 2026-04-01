
using System.Diagnostics;

try
{
  var stopWatch = Stopwatch.StartNew();

  await SimulateDownloadAsync("first.md", 200);
  await SimulateDownloadAsync("second.md", 200);
  await SimulateDownloadAsync("fail.md", 200);

  Console.WriteLine($"Sequential elapsed: {stopWatch.ElapsedMilliseconds} ms\n");

  var tasks = new[] { SimulateDownloadAsync("first.md", 200), SimulateDownloadAsync("second.md", 200) };
  await Task.WhenAll(tasks);

  Console.WriteLine($"Parallel elapsed: {stopWatch.ElapsedMilliseconds} ms\n");

}
catch (Exception ex)
{
  Console.WriteLine($"Error: {ex.Message}");
}


static async Task SimulateDownloadAsync(string fileName, int ms)
{

  if (fileName.Contains("fail"))
    throw new Exception($"Failed to download {fileName}");

  Console.WriteLine($"Starting {fileName}...");
  await Task.Delay(ms);
  Console.WriteLine($"Finished {fileName}!");
}