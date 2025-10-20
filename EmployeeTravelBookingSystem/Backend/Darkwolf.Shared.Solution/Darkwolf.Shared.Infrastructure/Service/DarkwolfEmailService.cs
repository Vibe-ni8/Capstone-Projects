using System.Net;
using System.Net.Mail;
using Darkwolf.Shared.Infrastructure.Interface;
using Darkwolf.Shared.Infrastructure.Models;

namespace Darkwolf.Shared.Infrastructure.Service;

public class DarkwolfEmailService : IDarkwolfEmailService
{
    private readonly DarkwolfEmailConfig _emailConfig;

    public DarkwolfEmailService(DarkwolfEmailConfig emailConfig)
    {
        _emailConfig = emailConfig;
    }

    public async Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string toEmail,
        string subject, string body)
    {
        return await SendEmailAsync(fromEmail, [toEmail], subject, body, null!, null!, null!);
    }

    public async Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string toEmail,
        string subject, string body, Attachment attachment)
    {
        return await SendEmailAsync(fromEmail, [toEmail], subject, body, null!, null!, [attachment]);
    }

    public async Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string toEmail,
        string subject, string body, Attachment[] attachments)
    {
        return await SendEmailAsync(fromEmail, [toEmail], subject, body, null!, null!, attachments);
    }

    public async Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string[] toEmails,
        string subject, string body)
    {
        return await SendEmailAsync(fromEmail, toEmails, subject, body, null!, null!, null!);
    }

    public async Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string[] toEmails,
        string subject, string body, Attachment attachment)
    {
        return await SendEmailAsync(fromEmail, toEmails, subject, body, null!, null!, [attachment]);
    }

    public async Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string[] toEmails,
        string subject, string body, Attachment[] attachments)
    {
        return await SendEmailAsync(fromEmail, toEmails, subject, body, null!, null!, attachments);
    }

    public async Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string[] toEmails,
        string subject, string body, string[] ccs, string[] bccs, Attachment[] attachments)
    {
        return await SendEmailAsync(fromEmail, null!, toEmails, subject, body, ccs, bccs, attachments);
    }

    // with display name parameter

    public async Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string displayName, string toEmail,
        string subject, string body)
    {
        return await SendEmailAsync(fromEmail, displayName, [toEmail], subject, body, null!, null!, null!);
    }

    public async Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string displayName, string toEmail,
        string subject, string body, Attachment attachment)
    {
        return await SendEmailAsync(fromEmail, displayName, [toEmail], subject, body, null!, null!, [attachment]);
    }

    public async Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string displayName, string toEmail,
        string subject, string body, Attachment[] attachments)
    {
        return await SendEmailAsync(fromEmail, displayName, [toEmail], subject, body, null!, null!, attachments);
    }

    public async Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string displayName, string[] toEmails,
        string subject, string body)
    {
        return await SendEmailAsync(fromEmail, displayName, toEmails, subject, body, null!, null!, null!);
    }

    public async Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string displayName, string[] toEmails,
        string subject, string body, Attachment attachment)
    {
        return await SendEmailAsync(fromEmail, displayName, toEmails, subject, body, null!, null!, [attachment]);
    }

    public async Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string displayName, string[] toEmails,
        string subject, string body, Attachment[] attachments)
    {
        return await SendEmailAsync(fromEmail, displayName, toEmails, subject, body, null!, null!, attachments);
    }

    public async Task<DarkwolfEmailStatus> SendEmailAsync(string fromEmail, string displayName, string[] toEmails, 
        string subject, string body, string[] ccs, string[] bccs, Attachment[] attachments)
    {
        if (string.IsNullOrEmpty(fromEmail)) return new DarkwolfEmailStatus()
        { SendStatus = false, Message = "From email address not provided" };
        if (toEmails.Length == 0) return new DarkwolfEmailStatus()
        { SendStatus = false, Message = "Recipient email address not provided" };

        var smtpClient = new SmtpClient(_emailConfig.Client)
        {
            Port = 587,
            Credentials = new NetworkCredential(_emailConfig.Username, _emailConfig.Password),
            EnableSsl = true
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress(fromEmail, displayName),
            Subject = subject ?? string.Empty,
            Body = body ?? string.Empty,
            IsBodyHtml = false
        };
        foreach (var toEmail in toEmails)
            mailMessage.To.Add(toEmail);

        if (ccs != null)
            foreach (var cc in ccs)
                mailMessage.CC.Add(cc);
        if (bccs != null)
            foreach (var bcc in bccs)
                mailMessage.Bcc.Add(bcc);
        if (attachments != null)
            foreach (var attachment in attachments)
                mailMessage.Attachments.Add(attachment);

        await smtpClient.SendMailAsync(mailMessage);

        return new DarkwolfEmailStatus() 
        { SendStatus = true, Message = "Email sent successfully" };
    }
}
