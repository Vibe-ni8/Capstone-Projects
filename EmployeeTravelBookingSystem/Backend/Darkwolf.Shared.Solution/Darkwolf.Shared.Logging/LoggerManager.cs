using Darkwolf.Shared.Logging.Interface;
using Microsoft.Extensions.Logging;

namespace Darkwolf.Shared.Logging;

public class LoggerManager<T> : ILoggerManager<T> where T : class
{
    private readonly ILogger<T> _logger;

    public LoggerManager(ILogger<T> logger)
    {
        _logger = logger;
    }

    public void LogInfo(string message, params object?[] args) => _logger.LogInformation(message, args);

    public void LogWarn(string message, params object?[] args) => _logger.LogWarning(message, args);

    public void LogDebug(string message, params object?[] args) => _logger.LogDebug(message, args);

    public void LogError(string message, params object?[] args) => _logger.LogError(message, args);
}