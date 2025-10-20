using System.Net.Mail;
using Darkwolf.Shared.Infrastructure.Models;

namespace Darkwolf.Shared.Infrastructure.Interface;

public interface IDarkwolfEmailService
{
    Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string toEmail,
        string subject, string body);
    Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string toEmail,
        string subject, string body, Attachment attachment);
    Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string toEmail,
        string subject, string body, Attachment[] attachments);
    Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string[] toEmails,
        string subject, string body);
    Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string[] toEmails,
        string subject, string body, Attachment attachment);
    Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string[] toEmails,
        string subject, string body, Attachment[] attachments);
    Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string[] toEmails,
        string subject, string body, string[] ccs, string[] bccs, Attachment[] attachments);

    // with display name parameter

    Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string displayName, string toEmail,
        string subject, string body);
    Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string displayName, string toEmail,
        string subject, string body, Attachment attachment); 
    Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string displayName, string toEmail,
        string subject, string body, Attachment[] attachments);
    Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string displayName, string[] toEmails,
        string subject, string body);
    Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string displayName, string[] toEmails,
        string subject, string body, Attachment attachment);
    Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string displayName, string[] toEmails,
        string subject, string body, Attachment[] attachments);
    Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string displayName, string[] toEmails,
        string subject, string body, string[] ccs, string[] bccs, Attachment[] attachments);
}
