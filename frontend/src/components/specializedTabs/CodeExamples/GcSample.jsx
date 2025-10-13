import React from 'react';

const GcSample = () =>
    `public class DatabaseConnection : IDisposable
{
  private SqlConnection _connection;
  private bool _disposed = false;

  public void Dispose()
  {
    Dispose(true);
    GC.SuppressFinalize(this);
  }

  protected virtual void Dispose(bool disposing)
  {
    if (!_disposed)
    {
      if (disposing)
      {
        _connection?.Close();
        _connection?.Dispose();
      }
      _disposed = true;
    }
  }
}
// Usage: using var conn = new DatabaseConnection();`;

export default GcSample;
