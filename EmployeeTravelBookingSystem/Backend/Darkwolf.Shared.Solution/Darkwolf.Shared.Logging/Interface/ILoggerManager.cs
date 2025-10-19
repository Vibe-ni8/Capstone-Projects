namespace Darkwolf.Shared.Logging.Interface;

public interface ILoggerManager<T> where T : class
{
    void LogInfo(string message, params object?[] args);
    void LogWarn(string message, params object?[] args);
    void LogDebug(string message, params object?[] args);
    void LogError(string message, params object?[] args);
}
