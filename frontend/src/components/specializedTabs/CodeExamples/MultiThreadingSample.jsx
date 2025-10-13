import React from 'react';

const MultiThreadingSample = () =>
    `public async Task ProcessItemsAsync(List<Item> items)
{
  var options = new ParallelOptions 
  { 
    MaxDegreeOfParallelism = Environment.ProcessorCount 
  };
  
  await Parallel.ForEachAsync(items, options, async (item, ct) =>
  {
    await ProcessItemAsync(item, ct);
  });
}

// Thread-safe collection
private readonly ConcurrentBag<Result> _results = new();

public void AddResult(Result result)
{
  _results.Add(result);
}`;

export default MultiThreadingSample;
